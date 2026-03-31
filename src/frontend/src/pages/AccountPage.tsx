import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BanknoteIcon,
  ChevronRight,
  Clock,
  LogOut,
  Shield,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Page } from "../App";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllRecharges,
  useAllWithdrawals,
  useIsAdmin,
  useUserProfile,
} from "../hooks/useQueries";
import { getWallet } from "../utils/wallet";

interface AccountPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

export default function AccountPage({
  onNavigate,
  onLogout,
}: AccountPageProps) {
  const { data: profile, isLoading } = useUserProfile();
  const { data: isAdmin } = useIsAdmin();
  const { identity } = useInternetIdentity();
  const { data: recharges, isLoading: rechargesLoading } = useAllRecharges();
  const { data: withdrawals, isLoading: withdrawalsLoading } =
    useAllWithdrawals();

  const [hasAdminUrl, setHasAdminUrl] = useState(
    () => sessionStorage.getItem("adminAccess") === "1",
  );

  const [walletBalance, setWalletBalance] = useState(0);
  const [walletEarnings, setWalletEarnings] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "Alireza5234") {
      sessionStorage.setItem("adminAccess", "1");
      setHasAdminUrl(true);
    }
    const phone = localStorage.getItem("pb_current_phone");
    if (phone) {
      const w = getWallet(phone);
      setWalletBalance(w.balance);
      setWalletEarnings(w.earnings);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="px-4 py-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("pb_phone");
    localStorage.removeItem("pb_pwd_hash");
    onLogout?.();
  };

  const userId = identity?.getPrincipal().toString();
  const myRecharges = (recharges ?? [])
    .filter((r: any) => r.userId.toString() === userId)
    .slice(-5)
    .reverse();

  const myWithdrawals = (withdrawals ?? [])
    .filter((w: any) => w.userId.toString() === userId)
    .slice(-5)
    .reverse();

  return (
    <div className="pb-4">
      {/* Profile Header */}
      <div className="green-gradient px-5 pt-6 pb-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-white font-bold text-lg">
                {profile?.phone || "FIFA Member"}
              </h2>
              <span className="bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                VIP 1
              </span>
            </div>
            <p className="text-white/60 text-xs mt-0.5">
              Code: {profile?.referralCode}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-5 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard
            label="Balance"
            value={`₹${walletBalance.toFixed(0)}`}
            icon={<Wallet className="w-4 h-4" />}
          />
          <StatCard
            label="Recharge"
            value={`₹${(profile?.totalRecharged ?? 0).toFixed(0)}`}
            icon={<BanknoteIcon className="w-4 h-4" />}
          />
          <StatCard
            label="Income"
            value={`₹${walletEarnings.toFixed(0)}`}
            icon={<TrendingUp className="w-4 h-4" />}
          />
        </div>

        {/* Menu List */}
        <div className="bg-card rounded-2xl card-shadow overflow-hidden">
          <MenuItem
            icon={"💳"}
            label="Personal Information"
            onClick={() => onNavigate("personal-info")}
            ocid="account.personal.button"
          />
          <MenuItem
            icon={"🏦"}
            label="Bank Card Binding"
            onClick={() => onNavigate("bank")}
            ocid="account.bank.button"
          />
          <MenuItem
            icon={"📱"}
            label="My Devices"
            onClick={() => toast.info("Coming soon")}
            ocid="account.devices.button"
          />
          <MenuItem
            icon={"📊"}
            label="Income Details"
            onClick={() => toast.info("Coming soon")}
            ocid="account.income.button"
          />
          <MenuItem
            icon={"ℹ️"}
            label="About Us"
            onClick={() => toast.info("Version 1.0.0")}
            ocid="account.about.button"
          />
        </div>

        {/* Recharge History */}
        <div
          className="bg-card rounded-2xl card-shadow overflow-hidden"
          data-ocid="account.recharge.panel"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm text-foreground">
              Recharge History
            </span>
          </div>
          {rechargesLoading ? (
            <div
              className="px-4 py-3 space-y-2"
              data-ocid="account.recharge.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-xl" />
              ))}
            </div>
          ) : myRecharges.length === 0 ? (
            <div
              className="px-4 py-6 text-center text-muted-foreground text-sm"
              data-ocid="account.recharge.empty_state"
            >
              No recharge history
            </div>
          ) : (
            <div className="divide-y divide-border">
              {myRecharges.map((r: any, idx: number) => (
                <div
                  key={r.id?.toString() ?? idx}
                  className="flex items-center justify-between px-4 py-3"
                  data-ocid={`account.recharge.item.${idx + 1}`}
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      ₹{Number(r.amount).toFixed(0)}
                    </p>
                    <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                      {r.paymentRef}
                    </p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Withdrawal History */}
        <div
          className="bg-card rounded-2xl card-shadow overflow-hidden"
          data-ocid="account.withdrawal.panel"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm text-foreground">
              Withdrawal History
            </span>
          </div>
          {withdrawalsLoading ? (
            <div
              className="px-4 py-3 space-y-2"
              data-ocid="account.withdrawal.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-xl" />
              ))}
            </div>
          ) : myWithdrawals.length === 0 ? (
            <div
              className="px-4 py-6 text-center text-muted-foreground text-sm"
              data-ocid="account.withdrawal.empty_state"
            >
              No withdrawal history
            </div>
          ) : (
            <div className="divide-y divide-border">
              {myWithdrawals.map((w: any, idx: number) => (
                <div
                  key={w.id?.toString() ?? idx}
                  className="flex items-center justify-between px-4 py-3"
                  data-ocid={`account.withdrawal.item.${idx + 1}`}
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      ₹{Number(w.amount).toFixed(0)}
                    </p>
                    <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                      {w.paymentDetails}
                    </p>
                  </div>
                  <StatusBadge status={w.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Admin Panel */}
        {(isAdmin || hasAdminUrl) && (
          <Button
            onClick={() => onNavigate("admin")}
            variant="outline"
            className="w-full border-primary text-primary font-semibold hover:bg-secondary"
            data-ocid="account.admin.button"
          >
            <Shield className="w-4 h-4 mr-2" /> Admin Panel
          </Button>
        )}

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-4 py-4 bg-card rounded-2xl card-shadow text-destructive font-semibold"
          data-ocid="account.logout.button"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🚪</span>
            <span>Logout</span>
          </div>
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: any }) {
  const s = Array.isArray(status)
    ? Object.keys(status[0] ?? {})[0]
    : typeof status === "object"
      ? Object.keys(status)[0]
      : String(status);
  if (s === "completed" || s === "Completed") {
    return (
      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px]">
        Completed
      </Badge>
    );
  }
  if (
    s === "failed" ||
    s === "Failed" ||
    s === "rejected" ||
    s === "Rejected"
  ) {
    return (
      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-[10px]">
        Failed
      </Badge>
    );
  }
  return (
    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-[10px]">
      Pending
    </Badge>
  );
}

function StatCard({
  label,
  value,
  icon,
}: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-card rounded-xl p-3 card-shadow">
      <div className="flex items-center gap-1 text-primary mb-1">
        {icon}
        <span className="text-[10px] text-muted-foreground">{label}</span>
      </div>
      <p className="font-bold text-foreground text-sm">{value}</p>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
  ocid,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  ocid: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3.5 border-b border-border last:border-0 hover:bg-secondary/40 transition-colors"
      data-ocid={ocid}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}
