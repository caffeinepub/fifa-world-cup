import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BanknoteIcon,
  ChevronRight,
  LogOut,
  Shield,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Page } from "../App";
import { useIsAdmin, useUserProfile } from "../hooks/useQueries";

interface AccountPageProps {
  onNavigate: (page: Page) => void;
  onLogout?: () => void;
}

export default function AccountPage({
  onNavigate,
  onLogout,
}: AccountPageProps) {
  const storedPhone = localStorage.getItem("pb_phone");
  const { data: profile, isLoading } = useUserProfile();
  const { data: isAdmin } = useIsAdmin();

  // Move URL param check inside the component to be React-safe
  const [hasAdminUrl, setHasAdminUrl] = useState(
    () => sessionStorage.getItem("adminAccess") === "1",
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "Aliraza5234") {
      sessionStorage.setItem("adminAccess", "1");
      setHasAdminUrl(true);
    }
  }, []);

  const shortUid = storedPhone ? storedPhone.slice(-8) : "--------";

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
                {profile?.username ?? storedPhone ?? "User"}
              </h2>
              <span className="bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                VIP 1
              </span>
            </div>
            <p className="text-white/70 text-xs mt-0.5">UID: {shortUid}</p>
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
            value={`₹${(profile?.walletBalance ?? 0).toFixed(0)}`}
            icon={<Wallet className="w-4 h-4" />}
          />
          <StatCard
            label="Recharge"
            value={`₹${(profile?.totalRecharged ?? 0).toFixed(0)}`}
            icon={<BanknoteIcon className="w-4 h-4" />}
          />
          <StatCard
            label="Income"
            value={`₹${(profile?.totalEarned ?? 0).toFixed(0)}`}
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

        <footer className="text-center pt-2 text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="text-primary underline"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </footer>
      </div>
    </div>
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
