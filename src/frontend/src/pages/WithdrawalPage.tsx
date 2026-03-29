import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, ArrowLeft, Clock, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { WithdrawalStatus } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllWithdrawals,
  useCreateWithdrawal,
  useUserProfile,
} from "../hooks/useQueries";

interface WithdrawalPageProps {
  onBack: () => void;
}

export default function WithdrawalPage({ onBack }: WithdrawalPageProps) {
  const { identity } = useInternetIdentity();
  const userId = identity?.getPrincipal().toString();
  const { data: profile } = useUserProfile();
  const [amount, setAmount] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const withdrawMutation = useCreateWithdrawal();
  const { data: allWithdrawals, isLoading } = useAllWithdrawals();

  const myWithdrawals =
    allWithdrawals?.filter((w) => w.userId.toString() === userId) ?? [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number.parseFloat(amount);
    if (Number.isNaN(amt) || amt <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (amt < 150) {
      toast.error("Minimum withdrawal amount is ₹150");
      return;
    }
    if (!paymentDetails.trim()) {
      toast.error("Enter bank/UPI details");
      return;
    }
    const result = await withdrawMutation.mutateAsync({
      amount: amt,
      paymentDetails,
    });
    if (result.__kind__ === "ok") {
      toast.success("Withdrawal request submitted!");
      setAmount("");
      setPaymentDetails("");
    } else if (result.__kind__ === "insufficientBalance") {
      toast.error("Insufficient balance.");
    } else {
      toast.error("Please register first.");
    }
  };

  const statusColor = (s: WithdrawalStatus) => {
    if (s === WithdrawalStatus.approved) return "bg-green-100 text-green-700";
    if (s === WithdrawalStatus.rejected) return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="pb-4">
      <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          data-ocid="withdrawal.back.button"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-semibold text-foreground">Withdraw Funds</h2>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* Notice Card */}
        <div
          className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2"
          data-ocid="withdrawal.notice.card"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">
                Minimum Withdrawal
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                Minimum withdrawal amount:{" "}
                <span className="font-bold">₹150</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">
                Withdrawal Time
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                Available: <span className="font-bold">07:00 - 17:00</span>
              </p>
            </div>
          </div>
        </div>

        {/* Balance Info */}
        <div className="green-gradient rounded-2xl p-4 text-white">
          <p className="text-white/70 text-sm">Available Balance</p>
          <p className="text-3xl font-bold">
            ₹{(profile?.walletBalance ?? 0).toFixed(2)}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-4 card-shadow space-y-4"
        >
          <h3 className="font-semibold text-foreground">Request Withdrawal</h3>
          <div>
            <Label htmlFor="wAmount">Amount (₹)</Label>
            <Input
              id="wAmount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Minimum ₹150"
              className="mt-1"
              data-ocid="withdrawal.amount.input"
            />
          </div>
          <div>
            <Label htmlFor="payDetails">Bank / UPI Details</Label>
            <Textarea
              id="payDetails"
              value={paymentDetails}
              onChange={(e) => setPaymentDetails(e.target.value)}
              placeholder="Bank: XXXX, Account: XXXX, IFSC: XXXX&#10;or UPI: yourname@upi"
              className="mt-1 min-h-[80px]"
              data-ocid="withdrawal.details.textarea"
            />
          </div>
          <Button
            type="submit"
            className="w-full green-gradient text-white border-0 font-semibold h-11"
            disabled={withdrawMutation.isPending}
            data-ocid="withdrawal.submit_button"
          >
            {withdrawMutation.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            Submit Withdrawal
          </Button>
        </form>

        {/* History */}
        <div className="bg-card rounded-2xl p-4 card-shadow">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">
              Withdrawal History
            </h3>
          </div>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-xl" />
              ))}
            </div>
          ) : myWithdrawals.length === 0 ? (
            <p
              className="text-center text-muted-foreground text-sm py-4"
              data-ocid="withdrawals.empty_state"
            >
              No withdrawals yet
            </p>
          ) : (
            <div className="space-y-2">
              {myWithdrawals.map((w, i) => (
                <div
                  key={w.id.toString()}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  data-ocid={`withdrawals.item.${i + 1}`}
                >
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      ₹{w.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                      {w.paymentDetails}
                    </p>
                  </div>
                  <Badge
                    className={`${statusColor(w.status)} border-0 text-xs font-medium`}
                  >
                    {w.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
