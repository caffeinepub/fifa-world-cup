import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-ChES9bTf.js";
import { A as ArrowLeft } from "./arrow-left-BJPzHx_r.js";
import { C as ChevronRight } from "./chevron-right-baVhx_hB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
function PersonalInfoPage({
  onNavigate,
  onBack
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-100 min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-700 flex items-center gap-3 px-4 py-3 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onBack,
          "data-ocid": "personal-info.back.button",
          className: "p-1",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-base", children: "Personal Information" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-blue-900 to-blue-700 px-5 py-8 flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl", children: "🏆" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-lg tracking-wide", children: "FIFA World Cup 2026" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs text-center", children: "Manage your account settings below" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2 px-1", children: "Account Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl overflow-hidden shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsRow,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-purple-500" }),
            iconBg: "bg-purple-100",
            label: "Bind Bank Card",
            subtitle: "Link your bank account for withdrawals",
            onClick: () => onNavigate("bank"),
            ocid: "personal-info.bank.button"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-gray-100 mx-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsRow,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-green-500" }),
            iconBg: "bg-green-100",
            label: "Change Password",
            subtitle: "Update your login password",
            onClick: () => onNavigate("change-password"),
            ocid: "personal-info.change-password.button"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-gray-100 mx-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SettingsRow,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-teal-500" }),
            iconBg: "bg-teal-100",
            label: "Withdrawal Password",
            subtitle: "Change your withdrawal PIN",
            onClick: () => onNavigate("withdrawal-password"),
            ocid: "personal-info.withdrawal-password.button"
          }
        )
      ] })
    ] })
  ] });
}
function SettingsRow({
  icon,
  iconBg,
  label,
  subtitle,
  onClick,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": ocid,
      className: "w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} shrink-0`,
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-800", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5", children: subtitle })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-gray-400" })
      ]
    }
  );
}
export {
  PersonalInfoPage as default
};
