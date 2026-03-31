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
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Check,
  IndianRupee,
  Loader2,
  Plus,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { RechargeStatus, WithdrawalStatus } from "../backend";
import type { InvestmentPlan } from "../backend";
import {
  useAddOrUpdatePlan,
  useAllPlans,
  useAllRecharges,
  useAllUsers,
  useAllWithdrawals,
  useApproveRecharge,
  useApproveWithdrawal,
  useRejectRecharge,
  useRejectWithdrawal,
} from "../hooks/useQueries";

interface AdminPageProps {
  onBack: () => void;
}

const EMPTY_PLAN: InvestmentPlan = {
  id: BigInt(0),
  name: "",
  description: "",
  price: 0,
  dailyReturn: 0,
  durationDays: BigInt(30),
  active: true,
};

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function truncateUserId(id: { toString(): string }): string {
  const s = id.toString();
  return s.length > 12 ? `${s.slice(0, 12)}...` : s;
}

type RechargeFilter = "all" | "pending" | "completed" | "failed";
type WithdrawalFilter = "all" | "pending" | "approved" | "rejected";

export default function AdminPage({ onBack }: AdminPageProps) {
  const { data: plans, isLoading: plansLoading } = useAllPlans();
  const { data: recharges, isLoading: rechargesLoading } = useAllRecharges();
  const { data: withdrawals, isLoading: withdrawalsLoading } =
    useAllWithdrawals();
  const { data: users, isLoading: usersLoading } = useAllUsers();

  const approveRecharge = useApproveRecharge();
  const rejectRecharge = useRejectRecharge();
  const approveWithdrawal = useApproveWithdrawal();
  const rejectWithdrawal = useRejectWithdrawal();
  const addPlan = useAddOrUpdatePlan();

  const [planDialog, setPlanDialog] = useState(false);
  const [planForm, setPlanForm] = useState<InvestmentPlan>(EMPTY_PLAN);
  const [rechargeFilter, setRechargeFilter] = useState<RechargeFilter>("all");
  const [withdrawalFilter, setWithdrawalFilter] =
    useState<WithdrawalFilter>("all");

  const allRechargesSorted = [...(recharges ?? [])].sort((a, b) =>
    Number(b.id - a.id),
  );
  const allWithdrawalsSorted = [...(withdrawals ?? [])].sort((a, b) =>
    Number(b.id - a.id),
  );

  const pendingRecharges = allRechargesSorted.filter(
    (r) => r.status === RechargeStatus.pending,
  );
  const pendingWithdrawals = allWithdrawalsSorted.filter(
    (w) => w.status === WithdrawalStatus.pending,
  );

  const filteredRecharges = allRechargesSorted.filter((r) => {
    if (rechargeFilter === "all") return true;
    return r.status === rechargeFilter;
  });

  const filteredWithdrawals = allWithdrawalsSorted.filter((w) => {
    if (withdrawalFilter === "all") return true;
    return w.status === withdrawalFilter;
  });

  const totalApprovedAmount = allRechargesSorted
    .filter((r) => r.status === RechargeStatus.completed)
    .reduce((sum, r) => sum + r.amount, 0);

  const totalPaidOut = allWithdrawalsSorted
    .filter((w) => w.status === WithdrawalStatus.approved)
    .reduce((sum, w) => sum + w.amount, 0);

  const handleApproveRecharge = async (id: bigint) => {
    try {
      await approveRecharge.mutateAsync(id);
      toast.success("Recharge approved!");
    } catch {
      toast.error("Failed to approve recharge.");
    }
  };

  const handleRejectRecharge = async (id: bigint) => {
    if (!window.confirm("Reject this recharge? This cannot be undone.")) return;
    try {
      await rejectRecharge.mutateAsync(id);
      toast.success("Recharge rejected.");
    } catch {
      toast.error("Failed to reject recharge.");
    }
  };

  const handleApproveWithdrawal = async (id: bigint) => {
    try {
      await approveWithdrawal.mutateAsync(id);
      toast.success("Withdrawal approved!");
    } catch {
      toast.error("Failed to approve withdrawal.");
    }
  };

  const handleRejectWithdrawal = async (id: bigint) => {
    if (
      !window.confirm(
        "Reject this withdrawal? The amount will be refunded to user.",
      )
    )
      return;
    try {
      await rejectWithdrawal.mutateAsync(id);
      toast.success("Withdrawal rejected. Amount refunded.");
    } catch {
      toast.error("Failed to reject withdrawal.");
    }
  };

  const handleSavePlan = async () => {
    if (!planForm.name.trim()) {
      toast.error("Plan name required");
      return;
    }
    if (planForm.price <= 0) {
      toast.error("Valid price required");
      return;
    }
    try {
      await addPlan.mutateAsync(planForm);
      toast.success("Plan saved!");
      setPlanDialog(false);
      setPlanForm(EMPTY_PLAN);
    } catch {
      toast.error("Failed to save plan.");
    }
  };

  const rechargeStatusBadge = (status: string) => {
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

  const withdrawalStatusBadge = (status: string) => {
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

  const filterBtn = (active: boolean) =>
    `px-3 py-1 rounded-full text-xs font-medium transition-colors ${
      active
        ? "bg-primary text-white"
        : "bg-muted text-muted-foreground hover:bg-muted/80"
    }`;

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
        <Tabs defaultValue="plans">
          <TabsList className="grid grid-cols-4 w-full mb-4">
            <TabsTrigger value="plans" data-ocid="admin.plans.tab">
              Plans
            </TabsTrigger>
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

          {/* Plans Tab */}
          <TabsContent value="plans">
            <div className="flex justify-end mb-3">
              <Button
                onClick={() => {
                  setPlanForm(EMPTY_PLAN);
                  setPlanDialog(true);
                }}
                className="green-gradient text-white border-0 font-semibold"
                data-ocid="admin.plan.add.button"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Plan
              </Button>
            </div>
            {plansLoading ? (
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            ) : plans?.length === 0 ? (
              <p
                className="text-center text-muted-foreground py-8"
                data-ocid="admin.plans.empty_state"
              >
                No plans yet
              </p>
            ) : (
              <div className="space-y-2">
                {plans?.map((plan, i) => (
                  <div
                    key={plan.id.toString()}
                    className="bg-card rounded-xl p-3 card-shadow flex items-center justify-between"
                    data-ocid={`admin.plans.item.${i + 1}`}
                  >
                    <div>
                      <p className="font-semibold text-sm">{plan.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ₹{plan.price} · {plan.dailyReturn}%/day ·{" "}
                        {plan.durationDays.toString()}d
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          plan.active
                            ? "bg-green-100 text-green-700 border-0"
                            : "bg-gray-800 text-gray-400 border-0"
                        }
                      >
                        {plan.active ? "Active" : "Inactive"}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setPlanForm(plan);
                          setPlanDialog(true);
                        }}
                        data-ocid={`admin.plans.edit.button.${i + 1}`}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Recharges Tab */}
          <TabsContent value="recharges">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-card rounded-xl p-3 card-shadow text-center">
                <p className="text-lg font-bold text-primary">
                  {allRechargesSorted.length}
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
                  ₹{totalApprovedAmount.toFixed(0)}
                </p>
                <p className="text-[10px] text-muted-foreground">Approved</p>
              </div>
            </div>

            {/* Filter Buttons */}
            <div
              className="flex gap-2 mb-3 flex-wrap"
              data-ocid="admin.recharges.filter.tab"
            >
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

            {rechargesLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-xl" />
                ))}
              </div>
            ) : filteredRecharges.length === 0 ? (
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
                    key={r.id.toString()}
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
                            {rechargeStatusBadge(r.status)}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Ref:{" "}
                            <span className="font-medium text-foreground">
                              {r.paymentRef}
                            </span>
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            User: {truncateUserId(r.userId)}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {formatTimestamp(r.timestamp)}
                          </p>
                        </div>
                      </div>
                      {r.status === RechargeStatus.pending && (
                        <div className="flex flex-col gap-1 shrink-0">
                          <Button
                            size="sm"
                            onClick={() => handleApproveRecharge(r.id)}
                            className="green-gradient text-white border-0 h-7 text-xs px-2"
                            disabled={
                              approveRecharge.isPending ||
                              rejectRecharge.isPending
                            }
                            data-ocid={`admin.recharges.approve.button.${i + 1}`}
                          >
                            {approveRecharge.isPending ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Check className="w-3 h-3 mr-1" />
                            )}
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectRecharge(r.id)}
                            className="h-7 text-xs px-2"
                            disabled={
                              approveRecharge.isPending ||
                              rejectRecharge.isPending
                            }
                            data-ocid={`admin.recharges.delete.button.${i + 1}`}
                          >
                            {rejectRecharge.isPending ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <X className="w-3 h-3 mr-1" />
                            )}
                            Reject
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
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-card rounded-xl p-3 card-shadow text-center">
                <p className="text-lg font-bold text-primary">
                  {allWithdrawalsSorted.length}
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

            {/* Filter Buttons */}
            <div
              className="flex gap-2 mb-3 flex-wrap"
              data-ocid="admin.withdrawals.filter.tab"
            >
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

            {withdrawalsLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-xl" />
                ))}
              </div>
            ) : filteredWithdrawals.length === 0 ? (
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
                    key={w.id.toString()}
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
                            {withdrawalStatusBadge(w.status)}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 max-w-[200px] break-words">
                            {w.paymentDetails}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            User: {truncateUserId(w.userId)}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {formatTimestamp(w.timestamp)}
                          </p>
                        </div>
                      </div>
                      {w.status === WithdrawalStatus.pending && (
                        <div className="flex flex-col gap-1 shrink-0">
                          <Button
                            size="sm"
                            onClick={() => handleApproveWithdrawal(w.id)}
                            className="green-gradient text-white border-0 h-7 text-xs px-2"
                            disabled={
                              approveWithdrawal.isPending ||
                              rejectWithdrawal.isPending
                            }
                            data-ocid={`admin.withdrawals.approve.button.${i + 1}`}
                          >
                            {approveWithdrawal.isPending ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Check className="w-3 h-3 mr-1" />
                            )}
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectWithdrawal(w.id)}
                            className="h-7 text-xs px-2"
                            disabled={
                              approveWithdrawal.isPending ||
                              rejectWithdrawal.isPending
                            }
                            data-ocid={`admin.withdrawals.delete.button.${i + 1}`}
                          >
                            {rejectWithdrawal.isPending ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <X className="w-3 h-3 mr-1" />
                            )}
                            Reject
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
            {usersLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-14 w-full rounded-xl" />
                ))}
              </div>
            ) : users?.length === 0 ? (
              <p
                className="text-center text-muted-foreground py-8"
                data-ocid="admin.users.empty_state"
              >
                No users
              </p>
            ) : (
              <div className="space-y-2">
                {users?.map((user, i) => (
                  <div
                    key={user.referralCode}
                    className="bg-card rounded-xl p-3 card-shadow"
                    data-ocid={`admin.users.item.${i + 1}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">
                          {user.username || "FIFA Member"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.phone
                            ? `****${user.phone.slice(-4)}`
                            : "------"}{" "}
                          · Code: {user.referralCode}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-primary font-semibold">
                          ₹{user.walletBalance.toFixed(2)}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Balance
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Plan Dialog */}
      <Dialog open={planDialog} onOpenChange={setPlanDialog}>
        <DialogContent
          className="max-w-[380px] rounded-2xl mx-auto"
          data-ocid="admin.plan.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {planForm.id === BigInt(0) ? "Add" : "Edit"} Investment Plan
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Plan Name</Label>
              <Input
                value={planForm.name}
                onChange={(e) =>
                  setPlanForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="e.g. Starter Plan"
                className="mt-1"
                data-ocid="admin.plan.name.input"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={planForm.description}
                onChange={(e) =>
                  setPlanForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Brief description"
                className="mt-1"
                data-ocid="admin.plan.desc.input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Price (₹)</Label>
                <Input
                  type="number"
                  value={planForm.price}
                  onChange={(e) =>
                    setPlanForm((p) => ({
                      ...p,
                      price: Number.parseFloat(e.target.value) || 0,
                    }))
                  }
                  className="mt-1"
                  data-ocid="admin.plan.price.input"
                />
              </div>
              <div>
                <Label>Daily Return (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={planForm.dailyReturn}
                  onChange={(e) =>
                    setPlanForm((p) => ({
                      ...p,
                      dailyReturn: Number.parseFloat(e.target.value) || 0,
                    }))
                  }
                  className="mt-1"
                  data-ocid="admin.plan.return.input"
                />
              </div>
            </div>
            <div>
              <Label>Duration (days)</Label>
              <Input
                type="number"
                value={planForm.durationDays.toString()}
                onChange={(e) =>
                  setPlanForm((p) => ({
                    ...p,
                    durationDays: BigInt(e.target.value || 0),
                  }))
                }
                className="mt-1"
                data-ocid="admin.plan.duration.input"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={planForm.active}
                onCheckedChange={(checked) =>
                  setPlanForm((p) => ({ ...p, active: checked }))
                }
                data-ocid="admin.plan.active.switch"
              />
              <Label>Active</Label>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                onClick={() => setPlanDialog(false)}
                className="flex-1"
                data-ocid="admin.plan.cancel.button"
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </Button>
              <Button
                onClick={handleSavePlan}
                disabled={addPlan.isPending}
                className="flex-1 green-gradient text-white border-0"
                data-ocid="admin.plan.save.button"
              >
                {addPlan.isPending ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <Check className="w-4 h-4 mr-1" />
                )}
                Save Plan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
