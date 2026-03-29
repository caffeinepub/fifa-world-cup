import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, ArrowLeft, Building2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BankBindingPageProps {
  onBack: () => void;
}

export default function BankBindingPage({ onBack }: BankBindingPageProps) {
  const [realName, setRealName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!realName.trim()) {
      toast.error("Real name is required");
      return;
    }
    if (!bankName.trim()) {
      toast.error("Bank name is required");
      return;
    }
    if (!accountNumber.trim()) {
      toast.error("Account number is required");
      return;
    }
    if (!ifscCode.trim()) {
      toast.error("IFSC code is required");
      return;
    }
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsPending(false);
    toast.success("Bank card bound successfully!");
  };

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          data-ocid="bank.back.button"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="font-semibold text-foreground">Bank Card Binding</h2>
      </div>

      {/* Green Banner */}
      <div className="green-gradient px-5 pt-6 pb-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-white font-bold text-lg">Bind Your Bank Account</h3>
        <p className="text-white/70 text-sm text-center mt-1">
          Securely link your bank for fast withdrawals
        </p>
      </div>

      <div className="px-4 -mt-5 space-y-4">
        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-5 card-shadow space-y-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="realName">Real Name</Label>
            <Input
              id="realName"
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
              placeholder="Enter your full legal name"
              data-ocid="bank.name.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="e.g. State Bank of India"
              data-ocid="bank.bankname.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              type="number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
              data-ocid="bank.account.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input
              id="ifscCode"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
              placeholder="e.g. SBIN0001234"
              data-ocid="bank.ifsc.input"
            />
          </div>

          {/* Warning Note */}
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              Please ensure your bank details are correct. Wrong details may
              cause withdrawal failure.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full green-gradient text-white border-0 font-semibold h-11"
            disabled={isPending}
            data-ocid="bank.submit_button"
          >
            {isPending ? (
              <span className="mr-2 inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : null}
            Bind Bank Card
          </Button>
        </form>
      </div>
    </div>
  );
}
