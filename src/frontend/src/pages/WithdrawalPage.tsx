import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, ArrowLeft, Clock, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  type LocalWithdrawal,
  addWithdrawal,
  getLocalWallet,
  getUserWithdrawals,
} from "../utils/adminStore";

interface WithdrawalPageProps {
  onBack: () => void;
}

const statusColor = (s: string) => {
  if (s === "approved") return "bg-green-100 text-green-700";
  if (s === "rejected") return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
};

export default function WithdrawalPage({ onBack }: WithdrawalPageProps) {
  const phone = localStorage.getItem("pb_current_phone") || "";
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [myWithdrawals, setMyWithdrawals] = useState<LocalWithdrawal[]>([]);

  const reloadData = () => {
    if (phone) {
      const w = getLocalWallet(phone);
      setBalance(w.balance);
      setMyWithdrawals(getUserWithdrawals(phone).slice(0, 10));
    }
  };

  useEffect(() => {
    if (phone) {
      const w = getLocalWallet(phone);
      setBalance(w.balance);
      setMyWithdrawals(getUserWithdrawals(phone).slice(0, 10));
    }
  }, [phone]);

  const handleSubmit = (e: React.FormEvent) => {
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
    if (!phone) {
      toast.error("Not logged in");
      return;
    }
    setSubmitting(true);
    const result = addWithdrawal(phone, amt, paymentDetails);
    if ("error" in result) {
      toast.error(result.error);
    } else {
      toast.success("Withdrawal request submitted! Awaiting admin approval.");
      setAmount("");
      setPaymentDetails("");
      reloadData();
    }
    setSubmitting(false);
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

        <div className="green-gradient rounded-2xl p-4 text-white">
          <p className="text-white/70 text-sm">Available Balance</p>
          <p className="text-3xl font-bold">₹{balance.toFixed(2)}</p>
        </div>

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
              placeholder="Bank: XXXX, Account: XXXX, IFSC: XXXX
or UPI: yourname@upi"
              className="mt-1 min-h-[80px]"
              data-ocid="withdrawal.details.textarea"
            />
          </div>
          <Button
            type="submit"
            className="w-full green-gradient text-white border-0 font-semibold h-11"
            disabled={submitting}
            data-ocid="withdrawal.submit_button"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            Submit Withdrawal
          </Button>
        </form>

        <div className="bg-card rounded-2xl p-4 card-shadow">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">
              Withdrawal History
            </h3>
          </div>
          {myWithdrawals.length === 0 ? (
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
                  key={w.id}
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
