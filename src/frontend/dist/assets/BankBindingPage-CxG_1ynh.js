import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as ue } from "./index-DrVGzxGQ.js";
import { A as ArrowLeft } from "./arrow-left-BdFvAdDD.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
];
const Wifi = createLucideIcon("wifi", __iconNode);
const CHIP_CELLS = ["c1", "c2", "c3", "c4", "c5", "c6"];
function BankBindingPage({ onBack }) {
  const [realName, setRealName] = reactExports.useState("");
  const [ifscCode, setIfscCode] = reactExports.useState("");
  const [accountNumber, setAccountNumber] = reactExports.useState("");
  const [isPending, setIsPending] = reactExports.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!realName.trim()) {
      ue.error("Real name is required");
      return;
    }
    if (!ifscCode.trim()) {
      ue.error("IFSC code is required");
      return;
    }
    if (!accountNumber.trim()) {
      ue.error("Account number is required");
      return;
    }
    setIsPending(true);
    await new Promise((r) => setTimeout(r, 1e3));
    setIsPending(false);
    ue.success("Bank card bound successfully!");
  };
  const displayName = realName.trim() || "YOUR NAME";
  const displayIfsc = ifscCode.trim() || "----";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-100 min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-700 flex items-center gap-3 px-4 py-3 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onBack,
          "data-ocid": "bank.back.button",
          className: "p-1",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-base", children: "Bind Bank Card" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-br from-blue-900 to-blue-700 px-5 py-6 flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xs bg-gradient-to-br from-blue-800 to-blue-600 rounded-2xl p-5 shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-10 translate-x-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-8 -translate-x-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 text-[10px] uppercase tracking-widest", children: "Savings Account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-5 h-5 text-white/70 rotate-90" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-7 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md mb-4 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid grid-cols-3 gap-0.5 p-1", children: CHIP_CELLS.map((cell) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-yellow-600/40 rounded-sm" }, cell)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-mono text-base tracking-[0.2em] mb-4", children: "• • • •   • • • •   • • • •   • • • •" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-[9px] uppercase tracking-widest", children: "Card Holder" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold text-sm mt-0.5 uppercase tracking-wide", children: displayName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-[9px] uppercase tracking-widest", children: "IFSC" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-semibold text-sm mt-0.5 uppercase", children: displayIfsc })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "bg-white rounded-2xl shadow-sm p-5 space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "bank-name",
              label: "REAL NAME",
              placeholder: "Enter your full name",
              value: realName,
              onChange: setRealName,
              ocid: "bank.name.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "bank-ifsc",
              label: "IFSC CODE",
              placeholder: "E.G. SBIN0001234",
              value: ifscCode,
              onChange: (v) => setIfscCode(v.toUpperCase()),
              ocid: "bank.ifsc.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FormField,
            {
              id: "bank-account",
              label: "ACCOUNT NUMBER",
              placeholder: "Enter account number",
              value: accountNumber,
              onChange: setAccountNumber,
              type: "number",
              ocid: "bank.account.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-amber-600 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700", children: "Please ensure your bank details are correct. Wrong details may cause withdrawal failure." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              disabled: isPending,
              "data-ocid": "bank.submit_button",
              className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-colors disabled:opacity-60",
              children: [
                isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" }) : null,
                "Confirm"
              ]
            }
          )
        ]
      }
    ) })
  ] });
}
function FormField({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: id,
        className: "text-blue-700 font-bold text-xs tracking-wide",
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        id,
        type,
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        "data-ocid": ocid,
        className: "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      }
    )
  ] });
}
export {
  BankBindingPage as default
};
