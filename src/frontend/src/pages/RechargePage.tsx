import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowLeft, Clock, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  type LocalRecharge,
  addRecharge,
  getUserRecharges,
} from "../utils/adminStore";

const QUICK_AMOUNTS = [490, 500, 1000, 2000, 5000];

const PAYMENT_METHODS = [
  {
    id: "pay-j",
    label: "Pay-J",
    icon: "₹",
    accent: "#F97316",
    desc: "Instant UPI",
  },
  {
    id: "pay-h",
    label: "Pay-H",
    icon: "🏦",
    accent: "#3B82F6",
    desc: "Bank Transfer",
  },
  {
    id: "pay-l",
    label: "Pay-L",
    icon: "💳",
    accent: "#8B5CF6",
    desc: "Card Payment",
  },
];

function generateTxnId(): string {
  return `TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

interface RechargePageProps {
  onBack: () => void;
}

const statusColor = (s: string) => {
  if (s === "completed") return "bg-green-100 text-green-700";
  if (s === "failed") return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
};

export default function RechargePage({ onBack }: RechargePageProps) {
  const phone = localStorage.getItem("pb_current_phone") || "";
  const [amount, setAmount] = useState("");
  const [paymentRef, setPaymentRef] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("pay-j");
  const [txnId, setTxnId] = useState<string>(() => generateTxnId());
  const [submitting, setSubmitting] = useState(false);
  const [myRecharges, setMyRecharges] = useState<LocalRecharge[]>([]);

  useEffect(() => {
    if (phone) setMyRecharges(getUserRecharges(phone).slice(0, 5));
  }, [phone]);

  const regenerateTxnId = useCallback(() => {
    const newId = generateTxnId();
    setTxnId(newId);
  }, []);

  useEffect(() => {
    setPaymentRef(txnId);
  }, [txnId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number.parseFloat(amount);
    if (Number.isNaN(amt) || amt <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (amt < 490) {
      toast.error("Minimum deposit amount is ₹490");
      return;
    }
    if (!phone) {
      toast.error("Not logged in");
      return;
    }
    setSubmitting(true);
    const ref = paymentRef.trim() || txnId;
    addRecharge(phone, amt, ref);
    toast.success(
      `Recharge request of ₹${amt} submitted! Awaiting admin approval.`,
    );
    setAmount("");
    regenerateTxnId();
    if (phone) setMyRecharges(getUserRecharges(phone).slice(0, 5));
    setSubmitting(false);
  };

  const activeMethod = PAYMENT_METHODS.find((m) => m.id === selectedMethod)!;

  return (
    <div className="pb-4">
      <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          data-ocid="recharge.back.button"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-semibold text-foreground">Recharge Wallet</h2>
      </div>

      <div className="px-4 mt-4 space-y-4">
        <div
          className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4"
          data-ocid="recharge.notice.card"
        >
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800">
              Minimum Deposit
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              Minimum deposit amount: <span className="font-bold">₹490</span>
            </p>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="bg-card rounded-2xl p-4 card-shadow">
          <h3 className="font-semibold text-foreground mb-3">
            Select Payment Method
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setSelectedMethod(method.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                  selectedMethod === method.id
                    ? "border-primary bg-secondary/50"
                    : "border-border bg-background hover:border-primary/40"
                }`}
                data-ocid="recharge.payment.button"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: method.accent }}
                >
                  {method.icon}
                </div>
                <span className="text-xs font-semibold text-foreground">
                  {method.label}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {method.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Gateway Info */}
        <div className="bg-card rounded-2xl p-4 card-shadow border-l-4 border-primary">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{activeMethod.icon}</span>
            <h3 className="font-semibold text-foreground">
              {activeMethod.label} — Payment Details
            </h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bank Name:</span>
              <span className="font-medium text-foreground">
                To be provided by admin
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account No:</span>
              <span className="font-medium text-foreground">
                XXXX XXXX XXXX
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">IFSC Code:</span>
              <span className="font-medium text-foreground">XXXX0000000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">UPI ID:</span>
              <span className="font-medium text-foreground">admin@upi</span>
            </div>
          </div>

          <div
            className="mt-4 rounded-xl p-3"
            style={{
              background: "rgba(21,101,192,0.10)",
              border: "1px solid rgba(21,101,192,0.25)",
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-foreground">
                Your Transaction ID
              </p>
              <button
                type="button"
                onClick={regenerateTxnId}
                className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg transition-colors"
                style={{
                  color: "#1565c0",
                  background: "rgba(21,101,192,0.12)",
                }}
                data-ocid="recharge.txnid.button"
              >
                <RefreshCw className="w-3 h-3" /> Generate New ID
              </button>
            </div>
            <p
              className="font-mono text-sm font-bold tracking-wide break-all"
              style={{ color: "#b8860b" }}
              data-ocid="recharge.txnid.panel"
            >
              {txnId}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              📋 Note this ID before making payment. It will be auto-filled
              below.
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-3 bg-yellow-900/20 rounded-lg p-2">
            ⚠️ Make the payment first, then enter the UTR/Reference number below.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-4 card-shadow space-y-4"
        >
          <h3 className="font-semibold text-foreground">
            Submit Recharge via {activeMethod.label}
          </h3>
          <div>
            <Label className="text-sm mb-2 block">Quick Amounts</Label>
            <div className="flex flex-wrap gap-2">
              {QUICK_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt.toString())}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    amount === amt.toString()
                      ? "border-primary bg-secondary text-primary"
                      : "border-border text-muted-foreground hover:border-primary"
                  }`}
                  data-ocid="recharge.amount.button"
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Minimum ₹490"
              className="mt-1"
              data-ocid="recharge.amount.input"
            />
          </div>
          <div>
            <Label htmlFor="ref">UTR / Reference Number</Label>
            <Input
              id="ref"
              value={paymentRef}
              onChange={(e) => setPaymentRef(e.target.value)}
              placeholder="Transaction ID auto-filled"
              className="mt-1 font-mono text-sm"
              data-ocid="recharge.ref.input"
            />
          </div>
          <Button
            type="submit"
            className="w-full green-gradient text-white border-0 font-semibold h-11"
            disabled={submitting}
            data-ocid="recharge.submit_button"
          >
            Submit Recharge Request
          </Button>
        </form>

        {/* History */}
        <div className="bg-card rounded-2xl p-4 card-shadow">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Recharge History</h3>
          </div>
          {myRecharges.length === 0 ? (
            <p
              className="text-center text-muted-foreground text-sm py-4"
              data-ocid="recharges.empty_state"
            >
              No recharges yet
            </p>
          ) : (
            <div className="space-y-2">
              {myRecharges.map((r, i) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  data-ocid={`recharges.item.${i + 1}`}
                >
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      ₹{r.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Ref: {r.paymentRef}
                    </p>
                  </div>
                  <Badge
                    className={`${statusColor(r.status)} border-0 text-xs font-medium`}
                  >
                    {r.status}
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
