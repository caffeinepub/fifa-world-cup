import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface WithdrawalPasswordPageProps {
  onBack: () => void;
}

export default function WithdrawalPasswordPage({
  onBack,
}: WithdrawalPasswordPageProps) {
  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newPwd2, setNewPwd2] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showNew2, setShowNew2] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleConfirm = async () => {
    if (!oldPwd || !newPwd || !newPwd2) {
      toast.error("Please fill in all fields");
      return;
    }
    if (newPwd !== newPwd2) {
      toast.error("New withdrawal passwords do not match");
      return;
    }
    if (newPwd.length < 4) {
      toast.error("Withdrawal password must be at least 4 characters");
      return;
    }

    const phone =
      localStorage.getItem("pb_current_phone") ||
      localStorage.getItem("pb_phone");
    if (!phone) {
      toast.error("Session expired. Please login again.");
      return;
    }

    const accounts: Record<string, Record<string, string>> = JSON.parse(
      localStorage.getItem("pb_accounts") || "{}",
    );
    const account = accounts[phone];
    if (!account) {
      toast.error("Account not found");
      return;
    }

    const storedWithdrawalPwd = account.withdrawalPwd || "";
    if (
      storedWithdrawalPwd &&
      storedWithdrawalPwd !== oldPwd &&
      storedWithdrawalPwd !== btoa(oldPwd)
    ) {
      toast.error("Old withdrawal password is incorrect");
      return;
    }

    setIsPending(true);
    await new Promise((r) => setTimeout(r, 600));
    accounts[phone].withdrawalPwd = newPwd;
    localStorage.setItem("pb_accounts", JSON.stringify(accounts));
    setIsPending(false);
    toast.success("Withdrawal password updated successfully!");
    onBack();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-blue-700 flex items-center gap-3 px-4 py-3 text-white">
        <button
          type="button"
          onClick={onBack}
          data-ocid="withdrawal-password.back.button"
          className="p-1"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-semibold text-base">Change Withdrawal Password</h2>
      </div>

      <div className="bg-gradient-to-br from-blue-900 to-blue-700 px-5 py-8 flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
          🛡️
        </div>
        <p className="text-white font-bold text-base">Update Withdrawal PIN</p>
        <p className="text-white/60 text-xs">
          Secure your withdrawal transactions
        </p>
      </div>

      <div className="px-4 pt-5">
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <PasswordField
            id="wp-old"
            label="Old Withdrawal Password"
            placeholder="Please enter your old withdrawal password"
            value={oldPwd}
            onChange={setOldPwd}
            show={showOld}
            onToggle={() => setShowOld((v) => !v)}
            ocid="withdrawal-password.old.input"
          />
          <PasswordField
            id="wp-new"
            label="New Withdrawal Password"
            placeholder="Please enter new withdrawal password"
            value={newPwd}
            onChange={setNewPwd}
            show={showNew}
            onToggle={() => setShowNew((v) => !v)}
            ocid="withdrawal-password.new.input"
          />
          <PasswordField
            id="wp-new2"
            label="New Withdrawal Password 2"
            placeholder="Please enter new withdrawal password again"
            value={newPwd2}
            onChange={setNewPwd2}
            show={showNew2}
            onToggle={() => setShowNew2((v) => !v)}
            ocid="withdrawal-password.confirm.input"
          />

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isPending}
            data-ocid="withdrawal-password.submit_button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-colors disabled:opacity-60 mt-2"
          >
            {isPending ? (
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />
            ) : null}
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

function PasswordField({
  id,
  label,
  placeholder,
  value,
  onChange,
  show,
  onToggle,
  ocid,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  ocid: string;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-blue-700 font-semibold text-sm">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          data-ocid={ocid}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
