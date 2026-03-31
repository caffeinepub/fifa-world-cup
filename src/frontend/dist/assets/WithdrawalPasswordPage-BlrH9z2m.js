import { r as reactExports, j as jsxRuntimeExports, u as ue } from "./index-BRTSfTF6.js";
import { A as ArrowLeft } from "./arrow-left-eMwUPPAj.js";
import { E as EyeOff, a as Eye } from "./eye-BCD3_r3-.js";
function WithdrawalPasswordPage({
  onBack
}) {
  const [oldPwd, setOldPwd] = reactExports.useState("");
  const [newPwd, setNewPwd] = reactExports.useState("");
  const [newPwd2, setNewPwd2] = reactExports.useState("");
  const [showOld, setShowOld] = reactExports.useState(false);
  const [showNew, setShowNew] = reactExports.useState(false);
  const [showNew2, setShowNew2] = reactExports.useState(false);
  const [isPending, setIsPending] = reactExports.useState(false);
  const handleConfirm = async () => {
    if (!oldPwd || !newPwd || !newPwd2) {
      ue.error("Please fill in all fields");
      return;
    }
    if (newPwd !== newPwd2) {
      ue.error("New withdrawal passwords do not match");
      return;
    }
    if (newPwd.length < 4) {
      ue.error("Withdrawal password must be at least 4 characters");
      return;
    }
    const phone = localStorage.getItem("pb_current_phone") || localStorage.getItem("pb_phone");
    if (!phone) {
      ue.error("Session expired. Please login again.");
      return;
    }
    const accounts = JSON.parse(
      localStorage.getItem("pb_accounts") || "{}"
    );
    const account = accounts[phone];
    if (!account) {
      ue.error("Account not found");
      return;
    }
    const storedWithdrawalPwd = account.withdrawalPwd || "";
    if (storedWithdrawalPwd && storedWithdrawalPwd !== oldPwd && storedWithdrawalPwd !== btoa(oldPwd)) {
      ue.error("Old withdrawal password is incorrect");
      return;
    }
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 600));
    accounts[phone].withdrawalPwd = newPwd;
    localStorage.setItem("pb_accounts", JSON.stringify(accounts));
    setIsPending(false);
    ue.success("Withdrawal password updated successfully!");
    onBack();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-100 min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-700 flex items-center gap-3 px-4 py-3 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onBack,
          "data-ocid": "withdrawal-password.back.button",
          className: "p-1",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-base", children: "Change Withdrawal Password" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-blue-900 to-blue-700 px-5 py-8 flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl", children: "🛡️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-base", children: "Update Withdrawal PIN" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-xs", children: "Secure your withdrawal transactions" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-sm p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PasswordField,
        {
          id: "wp-old",
          label: "Old Withdrawal Password",
          placeholder: "Please enter your old withdrawal password",
          value: oldPwd,
          onChange: setOldPwd,
          show: showOld,
          onToggle: () => setShowOld((v) => !v),
          ocid: "withdrawal-password.old.input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PasswordField,
        {
          id: "wp-new",
          label: "New Withdrawal Password",
          placeholder: "Please enter new withdrawal password",
          value: newPwd,
          onChange: setNewPwd,
          show: showNew,
          onToggle: () => setShowNew((v) => !v),
          ocid: "withdrawal-password.new.input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PasswordField,
        {
          id: "wp-new2",
          label: "New Withdrawal Password 2",
          placeholder: "Please enter new withdrawal password again",
          value: newPwd2,
          onChange: setNewPwd2,
          show: showNew2,
          onToggle: () => setShowNew2((v) => !v),
          ocid: "withdrawal-password.confirm.input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleConfirm,
          disabled: isPending,
          "data-ocid": "withdrawal-password.submit_button",
          className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-colors disabled:opacity-60 mt-2",
          children: [
            isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" }) : null,
            "Confirm"
          ]
        }
      )
    ] }) })
  ] });
}
function PasswordField({
  id,
  label,
  placeholder,
  value,
  onChange,
  show,
  onToggle,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: id, className: "text-blue-700 font-semibold text-sm", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id,
          type: show ? "text" : "password",
          value,
          onChange: (e) => onChange(e.target.value),
          placeholder,
          "data-ocid": ocid,
          className: "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onToggle,
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400",
          children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
        }
      )
    ] })
  ] });
}
export {
  WithdrawalPasswordPage as default
};
