import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as ue } from "./index-DYsE67EW.js";
import { i as initWallet } from "./wallet-C74YaBx6.js";
import { a as Eye, E as EyeOff } from "./eye-CTEzJDJO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
const DEFAULT_REFERRAL = "J7DGX685";
function getAccounts() {
  try {
    const raw = localStorage.getItem("pb_accounts");
    const accounts = raw ? JSON.parse(raw) : {};
    const oldPhone = localStorage.getItem("pb_phone");
    const oldHash = localStorage.getItem("pb_pwd_hash");
    if (oldPhone && oldHash && !accounts[oldPhone]) {
      accounts[oldPhone] = {
        pwdHash: oldHash,
        withdrawalPwd: localStorage.getItem("pb_withdrawal_pwd") || "",
        referral: localStorage.getItem("pb_referral") || ""
      };
      localStorage.setItem("pb_accounts", JSON.stringify(accounts));
      localStorage.removeItem("pb_phone");
      localStorage.removeItem("pb_pwd_hash");
      localStorage.removeItem("pb_withdrawal_pwd");
      localStorage.removeItem("pb_referral");
    }
    let migrated = false;
    for (const phone of Object.keys(accounts)) {
      if (!accounts[phone].referral) {
        accounts[phone].referral = DEFAULT_REFERRAL;
        migrated = true;
      }
    }
    if (migrated) {
      localStorage.setItem("pb_accounts", JSON.stringify(accounts));
    }
    return accounts;
  } catch {
    return {};
  }
}
function AuthPage({
  view,
  onSwitchView,
  onLogin
}) {
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [withdrawalPassword, setWithdrawalPassword] = reactExports.useState("");
  const [showWithdrawal, setShowWithdrawal] = reactExports.useState(false);
  const [referralCode, setReferralCode] = reactExports.useState(DEFAULT_REFERRAL);
  reactExports.useEffect(() => {
    const savedPhone = localStorage.getItem("pb_saved_phone");
    if (savedPhone) {
      setPhone(savedPhone);
    }
    const stored = sessionStorage.getItem("referralCode");
    if (stored) {
      setReferralCode(stored);
    } else {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get("ref");
      setReferralCode(ref || DEFAULT_REFERRAL);
    }
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    if (!phone.trim() || !password.trim()) {
      ue.error("Phone number and password are required");
      return;
    }
    const accounts = getAccounts();
    const account = accounts[phone.trim()];
    if (!account) {
      ue.error("Account not found. Please register first.");
      return;
    }
    if (account.pwdHash !== btoa(password)) {
      ue.error("Invalid password. Please try again.");
      return;
    }
    localStorage.setItem("pb_saved_phone", phone.trim());
    localStorage.setItem("pb_current_phone", phone.trim());
    initWallet(phone.trim());
    ue.success("Login successful! Welcome back.");
    onLogin(phone.trim());
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      ue.error("Phone number is required");
      return;
    }
    if (!password.trim()) {
      ue.error("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      ue.error("Passwords do not match");
      return;
    }
    if (!withdrawalPassword.trim()) {
      ue.error("Withdrawal password is required");
      return;
    }
    if (!referralCode.trim()) {
      ue.error("Referral code is required");
      return;
    }
    const accounts = getAccounts();
    if (accounts[phone.trim()]) {
      ue.error("This phone number is already registered.");
      return;
    }
    accounts[phone.trim()] = {
      pwdHash: btoa(password),
      withdrawalPwd: btoa(withdrawalPassword),
      referral: referralCode
    };
    localStorage.setItem("pb_accounts", JSON.stringify(accounts));
    localStorage.setItem("pb_saved_phone", phone.trim());
    localStorage.setItem("pb_current_phone", phone.trim());
    initWallet(phone.trim());
    sessionStorage.removeItem("referralCode");
    ue.success("Account created successfully! Welcome to FIFA World Cup.");
    onLogin(phone.trim());
  };
  const submitBtnStyle = {
    background: "linear-gradient(90deg, #1a56db 0%, #3b82f6 100%)",
    boxShadow: "0 4px 20px rgba(26,86,219,0.7), 0 0 40px rgba(59,130,246,0.3)"
  };
  if (view === "register") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen flex flex-col",
        style: {
          background: "linear-gradient(180deg, #0a1628 0%, #0d2444 50%, #1a3a6b 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-full relative overflow-hidden",
              style: {
                background: "linear-gradient(135deg, #0a1628 0%, #1a3a6b 50%, #0d2444 100%)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/generated/fifa-auth-banner.dim_800x400.jpg",
                  alt: "FIFA 2026",
                  className: "w-full object-cover",
                  style: { minHeight: 200, maxHeight: 260 }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-4 -mt-4 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-2xl overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-b border-blue-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onSwitchView("login"),
                  className: "flex-1 py-4 text-base font-semibold text-blue-400 hover:text-blue-600 transition-colors",
                  "data-ocid": "auth.login_tab",
                  children: "Login"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "flex-1 py-4 text-base font-bold text-blue-700 relative",
                  "data-ocid": "auth.register_tab",
                  children: [
                    "Register",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-600 rounded-full" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleRegister, className: "p-5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center bg-blue-50 border border-blue-200 rounded-full h-12 px-4 focus-within:ring-2 focus-within:ring-blue-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600 font-semibold text-sm mr-2", children: "+91" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-blue-200 mr-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "tel",
                    value: phone,
                    onChange: (e) => setPhone(e.target.value),
                    placeholder: "Enter phone number",
                    className: "flex-1 bg-transparent outline-none text-sm text-blue-900 placeholder:text-blue-400",
                    "data-ocid": "auth.phone"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center bg-blue-50 border border-blue-200 rounded-full h-12 px-5 focus-within:ring-2 focus-within:ring-blue-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: showPassword ? "text" : "password",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    placeholder: "Please new password",
                    className: "flex-1 bg-transparent outline-none text-sm text-blue-900 placeholder:text-blue-400",
                    "data-ocid": "register.password"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowPassword(!showPassword),
                    className: "text-blue-400 ml-2",
                    children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center bg-blue-50 border border-blue-200 rounded-full h-12 px-5 focus-within:ring-2 focus-within:ring-blue-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: showConfirm ? "text" : "password",
                    value: confirmPassword,
                    onChange: (e) => setConfirmPassword(e.target.value),
                    placeholder: "Please new password again",
                    className: "flex-1 bg-transparent outline-none text-sm text-blue-900 placeholder:text-blue-400",
                    "data-ocid": "register.confirm_password"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowConfirm(!showConfirm),
                    className: "text-blue-400 ml-2",
                    children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center bg-blue-50 border border-blue-200 rounded-full h-12 px-5 focus-within:ring-2 focus-within:ring-blue-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: showWithdrawal ? "text" : "password",
                    value: withdrawalPassword,
                    onChange: (e) => setWithdrawalPassword(e.target.value),
                    placeholder: "Enter Security password",
                    className: "flex-1 bg-transparent outline-none text-sm text-blue-900 placeholder:text-blue-400",
                    "data-ocid": "register.withdrawal_password"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowWithdrawal(!showWithdrawal),
                    className: "text-blue-400 ml-2",
                    children: showWithdrawal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center bg-blue-50 border border-blue-200 rounded-full h-12 px-4 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 text-blue-500 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    value: referralCode,
                    readOnly: true,
                    placeholder: "Referral code",
                    className: "flex-1 bg-transparent outline-none text-sm font-mono tracking-wider text-blue-900 placeholder:text-blue-400 cursor-not-allowed",
                    "data-ocid": "register.referral"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "submit",
                  className: "w-full h-12 rounded-full font-bold text-white text-sm tracking-widest uppercase",
                  style: submitBtnStyle,
                  "data-ocid": "register.submit",
                  children: "REGISTER"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-blue-500 pb-5", children: [
              "Already have an account?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onSwitchView("login"),
                  className: "text-blue-700 font-semibold hover:underline",
                  children: "Login"
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "text-center py-4 text-xs text-white/40 px-4", children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " FIFA 2026 Earn Platform"
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen flex flex-col",
      style: {
        background: "linear-gradient(180deg, #0a1628 0%, #0d2444 50%, #1a3a6b 100%)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-full relative overflow-hidden",
            style: {
              background: "linear-gradient(135deg, #0a1628 0%, #1a3a6b 50%, #0d2444 100%)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/fifa-auth-banner.dim_800x400.jpg",
                alt: "FIFA 2026",
                className: "w-full object-cover",
                style: { minHeight: 200, maxHeight: 260 }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-4 -mt-4 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-2xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-b border-blue-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "flex-1 py-4 text-base font-bold text-blue-700 relative",
                "data-ocid": "auth.login_tab",
                children: [
                  "Login",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-600 rounded-full" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onSwitchView("register"),
                className: "flex-1 py-4 text-base font-semibold text-blue-400 hover:text-blue-600 transition-colors",
                "data-ocid": "auth.register_tab",
                children: "Register"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "p-5 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center bg-blue-50 border border-blue-200 rounded-full h-12 px-4 focus-within:ring-2 focus-within:ring-blue-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-blue-600 font-semibold text-sm mr-2", children: "+91" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-5 bg-blue-200 mr-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "tel",
                  value: phone,
                  onChange: (e) => setPhone(e.target.value),
                  placeholder: "Enter phone number",
                  className: "flex-1 bg-transparent outline-none text-sm text-blue-900 placeholder:text-blue-400",
                  "data-ocid": "auth.phone"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center bg-blue-50 border border-blue-200 rounded-full h-12 px-5 focus-within:ring-2 focus-within:ring-blue-500", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: showPassword ? "text" : "password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  placeholder: "Enter password",
                  className: "flex-1 bg-transparent outline-none text-sm text-blue-900 placeholder:text-blue-400",
                  "data-ocid": "login.password"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowPassword(!showPassword),
                  className: "text-blue-400 ml-2",
                  children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                className: "w-full h-12 rounded-full font-bold text-white text-sm tracking-widest uppercase",
                style: submitBtnStyle,
                "data-ocid": "login.submit",
                children: "LOGIN"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-blue-500 pb-5", children: [
            "No account?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onSwitchView("register"),
                className: "text-blue-700 font-semibold hover:underline",
                "data-ocid": "login.register_link",
                children: "Register"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "text-center py-4 text-xs text-white/40 px-4", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " FIFA 2026 Earn Platform"
        ] })
      ]
    }
  );
}
export {
  AuthPage as default
};
