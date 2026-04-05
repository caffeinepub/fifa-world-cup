import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Check,
  IndianRupee,
  Plus,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  type LocalRecharge,
  type LocalUser,
  type LocalWithdrawal,
  approveRechargeLocal,
  approveWithdrawalLocal,
  deleteUser,
  getAllLocalUsers,
  getAllRecharges,
  getAllWithdrawals,
  rejectRechargeLocal,
  rejectWithdrawalLocal,
  updateUserBalance,
} from "../utils/adminStore";

interface AdminPageProps {
  onBack: () => void;
}

type RechargeFilter = "all" | "pending" | "completed" | "failed";
type WithdrawalFilter = "all" | "pending" | "approved" | "rejected";

function formatTime(ts: number): string {
  return new Date(ts).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage({ onBack }: AdminPageProps) {
  const [recharges, setRecharges] = useState<LocalRecharge[]>(() =>
    [...getAllRecharges()].sort((a, b) => b.timestamp - a.timestamp),
  );
  const [withdrawals, setWithdrawals] = useState<LocalWithdrawal[]>(() =>
    [...getAllWithdrawals()].sort((a, b) => b.timestamp - a.timestamp),
  );
  const [users, setUsers] = useState<LocalUser[]>(() => getAllLocalUsers());
  const [rechargeFilter, setRechargeFilter] = useState<RechargeFilter>("all");
  const [withdrawalFilter, setWithdrawalFilter] =
    useState<WithdrawalFilter>("all");

  // Edit balance dialog
  const [editUser, setEditUser] = useState<LocalUser | null>(null);
  const [editBalance, setEditBalance] = useState("");

  const reload = () => {
    setRecharges(
      [...getAllRecharges()].sort((a, b) => b.timestamp - a.timestamp),
    );
    setWithdrawals(
      [...getAllWithdrawals()].sort((a, b) => b.timestamp - a.timestamp),
    );
    setUsers(getAllLocalUsers());
  };

  const pendingRecharges = recharges.filter((r) => r.status === "pending");
  const pendingWithdrawals = withdrawals.filter((w) => w.status === "pending");

  const filteredRecharges = recharges.filter((r) =>
    rechargeFilter === "all" ? true : r.status === rechargeFilter,
  );
  const filteredWithdrawals = withdrawals.filter((w) =>
    withdrawalFilter === "all" ? true : w.status === withdrawalFilter,
  );

  const totalApproved = recharges
    .filter((r) => r.status === "completed")
    .reduce((s, r) => s + r.amount, 0);
  const totalPaidOut = withdrawals
    .filter((w) => w.status === "approved")
    .reduce((s, w) => s + w.amount, 0);

  const handleApproveRecharge = (id: string) => {
    approveRechargeLocal(id);
    toast.success("Recharge approved!");
    reload();
  };

  const handleRejectRecharge = (id: string) => {
    if (!window.confirm("Reject this recharge?")) return;
    rejectRechargeLocal(id);
    toast.success("Recharge rejected.");
    reload();
  };

  const handleApproveWithdrawal = (id: string) => {
    approveWithdrawalLocal(id);
    toast.success("Withdrawal approved!");
    reload();
  };

  const handleRejectWithdrawal = (id: string) => {
    if (!window.confirm("Reject this withdrawal? Amount will be refunded."))
      return;
    rejectWithdrawalLocal(id);
    toast.success("Withdrawal rejected. Amount refunded.");
    reload();
  };

  const handleSaveBalance = () => {
    if (!editUser) return;
    const val = Number.parseFloat(editBalance);
    if (Number.isNaN(val) || val < 0) {
      toast.error("Enter a valid balance");
      return;
    }
    updateUserBalance(editUser.phone, val);
    toast.success("Balance updated!");
    setEditUser(null);
    reload();
  };

  const handleDeleteUser = (phone: string) => {
    if (!window.confirm(`Delete user ${phone}? This cannot be undone.`)) return;
    deleteUser(phone);
    toast.success("User deleted.");
    reload();
  };

  const filterBtn = (active: boolean) =>
    `px-3 py-1 rounded-full text-xs font-medium transition-colors ${
      active
        ? "bg-primary text-white"
        : "bg-muted text-muted-foreground hover:bg-muted/80"
    }`;

  const rechargeBadge = (status: string) => {
    if (status === "completed")
      return (
        <Badge className="bg-green-100 text-green-700 border-0 text-[10px]">
          Completed
        </Badge>
      );
    if (status === "failed")
      return (
        <Badge className="bg-red-100 text-red-700 border-0 text-[10px]">
          Failed
        </Badge>
      );
    return (
      <Badge className="bg-yellow-100 text-yellow-700 border-0 text-[10px]">
        Pending
      </Badge>
    );
  };

  const withdrawalBadge = (status: string) => {
    if (status === "approved")
      return (
        <Badge className="bg-green-100 text-green-700 border-0 text-[10px]">
          Approved
        </Badge>
      );
    if (status === "rejected")
      return (
        <Badge className="bg-red-100 text-red-700 border-0 text-[10px]">
          Rejected
        </Badge>
      );
    return (
      <Badge className="bg-yellow-100 text-yellow-700 border-0 text-[10px]">
        Pending
      </Badge>
    );
  };

  return (
    <div className="pb-4">
      <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          data-ocid="admin.back.button"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-semibold text-foreground">Admin Panel</h2>
        <Badge className="bg-secondary text-primary border-0 ml-auto">
          Admin
        </Badge>
      </div>

      <div className="px-4 mt-4">
        <Tabs defaultValue="recharges">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="recharges" data-ocid="admin.recharges.tab">
              Recharges
              {pendingRecharges.length > 0 && (
                <span className="ml-1 text-destructive">
                  ({pendingRecharges.length})
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="withdrawals" data-ocid="admin.withdrawals.tab">
              Withdraw
              {pendingWithdrawals.length > 0 && (
                <span className="ml-1 text-destructive">
                  ({pendingWithdrawals.length})
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="users" data-ocid="admin.users.tab">
              Users
            </TabsTrigger>
          </TabsList>

          {/* Recharges Tab */}
          <TabsContent value="recharges">
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-card rounded-xl p-3 card-shadow text-center">
                <p className="text-lg font-bold text-primary">
                  {recharges.length}
                </p>
                <p className="text-[10px] text-muted-foreground">Total</p>
              </div>
              <div className="bg-card rounded-xl p-3 card-shadow text-center">
                <p className="text-lg font-bold text-yellow-600">
                  {pendingRecharges.length}
                </p>
                <p className="text-[10px] text-muted-foreground">Pending</p>
              </div>
              <div className="bg-card rounded-xl p-3 card-shadow text-center">
                <p className="text-lg font-bold text-blue-600">
                  ₹{totalApproved.toFixed(0)}
                </p>
                <p className="text-[10px] text-muted-foreground">Approved</p>
              </div>
            </div>

            <div className="flex gap-2 mb-3 flex-wrap">
              {(
                ["all", "pending", "completed", "failed"] as RechargeFilter[]
              ).map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={() => setRechargeFilter(f)}
                  className={filterBtn(rechargeFilter === f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {filteredRecharges.length === 0 ? (
              <p
                className="text-center text-muted-foreground py-8"
                data-ocid="admin.recharges.empty_state"
              >
                No recharges found
              </p>
            ) : (
              <div className="space-y-2">
                {filteredRecharges.map((r, i) => (
                  <div
                    key={r.id}
                    className="bg-card rounded-xl p-3 card-shadow"
                    data-ocid={`admin.recharges.item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-base text-foreground">
                              ₹{r.amount.toFixed(2)}
                            </p>
                            {rechargeBadge(r.status)}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Ref:{" "}
                            <span className="font-medium text-foreground">
                              {r.paymentRef}
                            </span>
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Phone: {r.phone}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {formatTime(r.timestamp)}
                          </p>
                        </div>
                      </div>
                      {r.status === "pending" && (
                        <div className="flex flex-col gap-1 shrink-0">
                          <Button
                            size="sm"
                            onClick={() => handleApproveRecharge(r.id)}
                            className="bg-green-600 hover:bg-green-700 text-white border-0 h-7 text-xs px-2"
                            data-ocid={`admin.recharges.approve.button.${i + 1}`}
                          >
                            <Check className="w-3 h-3 mr-1" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectRecharge(r.id)}
                            className="h-7 text-xs px-2"
                            data-ocid={`admin.recharges.delete.button.${i + 1}`}
                          >
                            <X className="w-3 h-3 mr-1" /> Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Withdrawals Tab */}
          <TabsContent value="withdrawals">
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-card rounded-xl p-3 card-shadow text-center">
                <p className="text-lg font-bold text-primary">
                  {withdrawals.length}
                </p>
                <p className="text-[10px] text-muted-foreground">Total</p>
              </div>
              <div className="bg-card rounded-xl p-3 card-shadow text-center">
                <p className="text-lg font-bold text-yellow-600">
                  {pendingWithdrawals.length}
                </p>
                <p className="text-[10px] text-muted-foreground">Pending</p>
              </div>
              <div className="bg-card rounded-xl p-3 card-shadow text-center">
                <p className="text-lg font-bold text-blue-600">
                  ₹{totalPaidOut.toFixed(0)}
                </p>
                <p className="text-[10px] text-muted-foreground">Paid Out</p>
              </div>
            </div>

            <div className="flex gap-2 mb-3 flex-wrap">
              {(
                ["all", "pending", "approved", "rejected"] as WithdrawalFilter[]
              ).map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={() => setWithdrawalFilter(f)}
                  className={filterBtn(withdrawalFilter === f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {filteredWithdrawals.length === 0 ? (
              <p
                className="text-center text-muted-foreground py-8"
                data-ocid="admin.withdrawals.empty_state"
              >
                No withdrawals found
              </p>
            ) : (
              <div className="space-y-2">
                {filteredWithdrawals.map((w, i) => (
                  <div
                    key={w.id}
                    className="bg-card rounded-xl p-3 card-shadow"
                    data-ocid={`admin.withdrawals.item.${i + 1}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <TrendingDown className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-base text-foreground">
                              ₹{w.amount.toFixed(2)}
                            </p>
                            {withdrawalBadge(w.status)}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 max-w-[200px] break-words">
                            {w.paymentDetails}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Phone: {w.phone}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {formatTime(w.timestamp)}
                          </p>
                        </div>
                      </div>
                      {w.status === "pending" && (
                        <div className="flex flex-col gap-1 shrink-0">
                          <Button
                            size="sm"
                            onClick={() => handleApproveWithdrawal(w.id)}
                            className="bg-green-600 hover:bg-green-700 text-white border-0 h-7 text-xs px-2"
                            data-ocid={`admin.withdrawals.approve.button.${i + 1}`}
                          >
                            <Check className="w-3 h-3 mr-1" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectWithdrawal(w.id)}
                            className="h-7 text-xs px-2"
                            data-ocid={`admin.withdrawals.delete.button.${i + 1}`}
                          >
                            <X className="w-3 h-3 mr-1" /> Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            {users.length === 0 ? (
              <p
                className="text-center text-muted-foreground py-8"
                data-ocid="admin.users.empty_state"
              >
                No users
              </p>
            ) : (
              <div className="space-y-2">
                {users.map((user, i) => (
                  <div
                    key={user.phone}
                    className="bg-card rounded-xl p-3 card-shadow"
                    data-ocid={`admin.users.item.${i + 1}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">{user.phone}</p>
                        <p className="text-xs text-muted-foreground">
                          Code: {user.referral || "—"}
                        </p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                        <p className="text-xs text-primary font-semibold">
                          ₹{user.balance.toFixed(2)}
                        </p>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 text-[10px] px-2"
                            onClick={() => {
                              setEditUser(user);
                              setEditBalance(user.balance.toFixed(2));
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-6 text-[10px] px-2"
                            onClick={() => handleDeleteUser(user.phone)}
                          >
                            Del
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Balance Dialog */}
      <Dialog
        open={!!editUser}
        onOpenChange={(o) => {
          if (!o) setEditUser(null);
        }}
      >
        <DialogContent className="max-w-[340px] rounded-2xl mx-auto">
          <DialogHeader>
            <DialogTitle>Edit Balance</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              User: {editUser?.phone}
            </p>
            <div>
              <Label>New Balance (₹)</Label>
              <Input
                type="number"
                value={editBalance}
                onChange={(e) => setEditBalance(e.target.value)}
                className="mt-1"
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setEditUser(null)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary text-white"
                onClick={handleSaveBalance}
              >
                <IndianRupee className="w-4 h-4 mr-1" /> Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
