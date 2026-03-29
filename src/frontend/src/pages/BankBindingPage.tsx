import { AlertTriangle, ArrowLeft, Wifi } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BankBindingPageProps {
  onBack: () => void;
}

const CHIP_CELLS = ["c1", "c2", "c3", "c4", "c5", "c6"];

export default function BankBindingPage({ onBack }: BankBindingPageProps) {
  const [realName, setRealName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!realName.trim()) {
      toast.error("Real name is required");
      return;
    }
    if (!ifscCode.trim()) {
      toast.error("IFSC code is required");
      return;
    }
    if (!accountNumber.trim()) {
      toast.error("Account number is required");
      return;
    }
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsPending(false);
    toast.success("Bank card bound successfully!");
  };

  const displayName = realName.trim() || "YOUR NAME";
  const displayIfsc = ifscCode.trim() || "----";

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-blue-700 flex items-center gap-3 px-4 py-3 text-white">
        <button
          type="button"
          onClick={onBack}
          data-ocid="bank.back.button"
          className="p-1"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-semibold text-base">Bind Bank Card</h2>
      </div>

      <div className="bg-gradient-to-br from-blue-900 to-blue-700 px-5 py-6 flex flex-col items-center">
        <div className="w-full max-w-xs bg-gradient-to-br from-blue-800 to-blue-600 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-10 translate-x-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-8 -translate-x-8" />

          <div className="flex items-center justify-between mb-4 relative">
            <p className="text-white/60 text-[10px] uppercase tracking-widest">
              Savings Account
            </p>
            <Wifi className="w-5 h-5 text-white/70 rotate-90" />
          </div>

          <div className="w-10 h-7 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md mb-4 relative">
            <div className="absolute inset-0 grid grid-cols-3 gap-0.5 p-1">
              {CHIP_CELLS.map((cell) => (
                <div key={cell} className="bg-yellow-600/40 rounded-sm" />
              ))}
            </div>
          </div>

          <p className="text-white font-mono text-base tracking-[0.2em] mb-4">
            • • • • &nbsp; • • • • &nbsp; • • • • &nbsp; • • • •
          </p>

          <div className="flex items-end justify-between relative">
            <div>
              <p className="text-white/50 text-[9px] uppercase tracking-widest">
                Card Holder
              </p>
              <p className="text-white font-semibold text-sm mt-0.5 uppercase tracking-wide">
                {displayName}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-[9px] uppercase tracking-widest">
                IFSC
              </p>
              <p className="text-white font-semibold text-sm mt-0.5 uppercase">
                {displayIfsc}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pt-5">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm p-5 space-y-4"
        >
          <FormField
            id="bank-name"
            label="REAL NAME"
            placeholder="Enter your full name"
            value={realName}
            onChange={setRealName}
            ocid="bank.name.input"
          />
          <FormField
            id="bank-ifsc"
            label="IFSC CODE"
            placeholder="E.G. SBIN0001234"
            value={ifscCode}
            onChange={(v) => setIfscCode(v.toUpperCase())}
            ocid="bank.ifsc.input"
          />
          <FormField
            id="bank-account"
            label="ACCOUNT NUMBER"
            placeholder="Enter account number"
            value={accountNumber}
            onChange={setAccountNumber}
            type="number"
            ocid="bank.account.input"
          />

          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              Please ensure your bank details are correct. Wrong details may
              cause withdrawal failure.
            </p>
          </div>

          <button
            type="submit"
            disabled={isPending}
            data-ocid="bank.submit_button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-colors disabled:opacity-60"
          >
            {isPending ? (
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />
            ) : null}
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

function FormField({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  ocid,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  ocid: string;
}) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="text-blue-700 font-bold text-xs tracking-wide"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-ocid={ocid}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
