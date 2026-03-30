import { Eye, EyeOff, RefreshCw, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AuthPageProps {
  view: "login" | "register";
  onSwitchView: (view: "login" | "register") => void;
  onLogin: (phone: string) => void;
}

interface Account {
  pwdHash: string;
  withdrawalPwd: string;
  referral: string;
}

function getAccounts(): Record<string, Account> {
  try {
    const raw = localStorage.getItem("pb_accounts");
    const accounts: Record<string, Account> = raw ? JSON.parse(raw) : {};
    // Migrate old single-account format
    const oldPhone = localStorage.getItem("pb_phone");
    const oldHash = localStorage.getItem("pb_pwd_hash");
    if (oldPhone && oldHash && !accounts[oldPhone]) {
      accounts[oldPhone] = {
        pwdHash: oldHash,
        withdrawalPwd: localStorage.getItem("pb_withdrawal_pwd") || "",
        referral: localStorage.getItem("pb_referral") || "",
      };
      localStorage.setItem("pb_accounts", JSON.stringify(accounts));
      localStorage.removeItem("pb_phone");
      localStorage.removeItem("pb_pwd_hash");
      localStorage.removeItem("pb_withdrawal_pwd");
      localStorage.removeItem("pb_referral");
    }
    return accounts;
  } catch {
    return {};
  }
}

export default function AuthPage({
  view,
  onSwitchView,
  onLogin,
}: AuthPageProps) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [withdrawalPassword, setWithdrawalPassword] = useState("");
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  const generateReferralCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const code = Array.from(
      { length: 8 },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join("");
    setReferralCode(code);
  };

  useEffect(() => {
    // Always pre-fill saved phone number
    const savedPhone = localStorage.getItem("pb_saved_phone");
    if (savedPhone) {
      setPhone(savedPhone);
    }
    const stored = sessionStorage.getItem("referralCode");
    if (stored) setReferralCode(stored);
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setReferralCode(ref);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !password.trim()) {
      toast.error("Phone number and password are required");
      return;
    }
    const accounts = getAccounts();
    const account = accounts[phone.trim()];
    if (!account) {
      toast.error("Account not found. Please register first.");
      return;
    }
    if (account.pwdHash !== btoa(password)) {
      toast.error("Invalid password. Please try again.");
      return;
    }
    // Always save phone for next login
    localStorage.setItem("pb_saved_phone", phone.trim());
    localStorage.setItem("pb_current_phone", phone.trim());
    toast.success("Login successful! Welcome back.");
    onLogin(phone.trim());
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!withdrawalPassword.trim()) {
      toast.error("Withdrawal password is required");
      return;
    }
    if (!referralCode.trim()) {
      toast.error("Referral code is required");
      return;
    }
    const accounts = getAccounts();
    if (accounts[phone.trim()]) {
      toast.error("This phone number is already registered.");
      return;
    }
    accounts[phone.trim()] = {
      pwdHash: btoa(password),
      withdrawalPwd: btoa(withdrawalPassword),
      referral: referralCode,
    };
    localStorage.setItem("pb_accounts", JSON.stringify(accounts));
    // Always save phone and session after registration
    localStorage.setItem("pb_saved_phone", phone.trim());
    localStorage.setItem("pb_current_phone", phone.trim());
    sessionStorage.removeItem("referralCode");
    toast.success("Account created successfully! Welcome to FIFA World Cup.");
    onLogin(phone.trim());
  };

  const submitBtnStyle = {
    background: "linear-gradient(90deg, #1a56db 0%, #3b82f6 100%)",
    boxShadow: "0 4px 20px rgba(26,86,219,0.7), 0 0 40px rgba(59,130,246,0.3)",
  };

  if (view === "register") {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{
          background:
            "linear-gradient(180deg, #0a1628 0%, #0d2444 50%, #1a3a6b 100%)",
        }}
      >
        <div
          className="w-full relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0a1628 0%, #1a3a6b 50%, #0d2444 100%)",
          }}
        >
          <img
            src="/assets/generated/fifa-auth-banner.dim_800x400.jpg"
            alt="FIFA 2026"
            className="w-full object-cover"
            style={{ minHeight: 200, maxHeight: 260 }}
          />
        </div>
        <div className="mx-4 -mt-4 relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex border-b border-blue-100">
              <button
                type="button"
                onClick={() => onSwitchView("login")}
                className="flex-1 py-4 text-base font-semibold text-blue-400 hover:text-blue-600 transition-colors"
                data-ocid="auth.login_tab"
              >
                Login
              </button>
              <button
                type="button"
                className="flex-1 py-4 text-base font-bold text-blue-700 relative"
                data-ocid="auth.register_tab"
              >
                Register
                <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-600 rounded-full" />
              </button>
            </div>
            <form onSubmit={handleRegister} className="p-5 space-y-3">
              <div className="flex items-center bg-blue-50 border border-blue-200 rounded-full h-12 px-4 focus-within:ring-2 focus-within:ring-blue-500">
                <span className="text-blue-600 font-semibold text-sm mr-2">
                  +91
                </span>
                <div className="w-px h-5 bg-blue-200 mr-3" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="flex-1 bg-transparent outline-none text-sm text-blue-900 placeholder:text-blue-400"
                  data-ocid="auth.phone"
                />
              </div>
              <div className="flex items-center bg-blue-50 border border-blue-200 rounded-full h-12 px-5 focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Please new password"
                  className="flex-1 bg-transparent outline-none text-sm text-blue-900 placeholder:text-blue-400"
                  data-ocid="register.password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-blue-400 ml-2"
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="flex items-center bg-blue-50 border border-blue-200 rounded-full h-12 px-5 focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Please new password again"
                  className="flex-1 bg-transparent outline-none text-sm text-blue-900 placeholder:text-blue-400"
                  data-ocid="register.confirm_password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="text-blue-400 ml-2"
                >
                  {showConfirm ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="flex items-center bg-blue-50 border border-blue-200 rounded-full h-12 px-5 focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type={showWithdrawal ? "text" : "password"}
                  value={withdrawalPassword}
                  onChange={(e) => setWithdrawalPassword(e.target.value)}
                  placeholder="Enter Security password"
                  className="flex-1 bg-transparent outline-none text-sm text-blue-900 placeholder:text-blue-400"
                  data-ocid="register.withdrawal_password"
                />
                <button
                  type="button"
                  onClick={() => setShowWithdrawal(!showWithdrawal)}
                  className="text-blue-400 ml-2"
                >
                  {showWithdrawal ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="flex items-center bg-blue-50 border border-blue-200 rounded-full h-12 px-4 gap-2 focus-within:ring-2 focus-within:ring-blue-500">
                <UserPlus className="w-4 h-4 text-blue-500 shrink-0" />
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Referral code"
                  className="flex-1 bg-transparent outline-none text-sm font-mono tracking-wider text-blue-900 placeholder:text-blue-400"
                  data-ocid="register.referral"
                />
                <button
                  type="button"
                  onClick={generateReferralCode}
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                  title="Generate random referral code"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <button
                type="submit"
                className="w-full h-12 rounded-full font-bold text-white text-sm tracking-widest uppercase"
                style={submitBtnStyle}
                data-ocid="register.submit"
              >
                REGISTER
              </button>
            </form>
            <p className="text-center text-sm text-blue-500 pb-5">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => onSwitchView("login")}
                className="text-blue-700 font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
        <div className="flex-1" />
        <footer className="text-center py-4 text-xs text-white/40 px-4">
          © {new Date().getFullYear()} FIFA 2026 Earn Platform
        </footer>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(180deg, #0a1628 0%, #0d2444 50%, #1a3a6b 100%)",
      }}
    >
      <div
        className="w-full relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0a1628 0%, #1a3a6b 50%, #0d2444 100%)",
        }}
      >
        <img
          src="/assets/generated/fifa-auth-banner.dim_800x400.jpg"
          alt="FIFA 2026"
          className="w-full object-cover"
          style={{ minHeight: 200, maxHeight: 260 }}
        />
      </div>
      <div className="mx-4 -mt-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex border-b border-blue-100">
            <button
              type="button"
              className="flex-1 py-4 text-base font-bold text-blue-700 relative"
              data-ocid="auth.login_tab"
            >
              Login
              <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-600 rounded-full" />
            </button>
            <button
              type="button"
              onClick={() => onSwitchView("register")}
              className="flex-1 py-4 text-base font-semibold text-blue-400 hover:text-blue-600 transition-colors"
              data-ocid="auth.register_tab"
            >
              Register
            </button>
          </div>
          <form onSubmit={handleLogin} className="p-5 space-y-3">
            <div className="flex items-center bg-blue-50 border border-blue-200 rounded-full h-12 px-4 focus-within:ring-2 focus-within:ring-blue-500">
              <span className="text-blue-600 font-semibold text-sm mr-2">
                +91
              </span>
              <div className="w-px h-5 bg-blue-200 mr-3" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="flex-1 bg-transparent outline-none text-sm text-blue-900 placeholder:text-blue-400"
                data-ocid="auth.phone"
              />
            </div>
            <div className="flex items-center bg-blue-50 border border-blue-200 rounded-full h-12 px-5 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="flex-1 bg-transparent outline-none text-sm text-blue-900 placeholder:text-blue-400"
                data-ocid="login.password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-blue-400 ml-2"
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full h-12 rounded-full font-bold text-white text-sm tracking-widest uppercase"
              style={submitBtnStyle}
              data-ocid="login.submit"
            >
              LOGIN
            </button>
          </form>
          <p className="text-center text-sm text-blue-500 pb-5">
            No account?{" "}
            <button
              type="button"
              onClick={() => onSwitchView("register")}
              className="text-blue-700 font-semibold hover:underline"
              data-ocid="login.register_link"
            >
              Register
            </button>
          </p>
        </div>
      </div>
      <div className="flex-1" />
      <footer className="text-center py-4 text-xs text-white/40 px-4">
        © {new Date().getFullYear()} FIFA 2026 Earn Platform
      </footer>
    </div>
  );
}
