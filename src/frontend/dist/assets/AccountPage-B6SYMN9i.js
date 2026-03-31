import { c as createLucideIcon, b as useUserProfile, t as useIsAdmin, j as jsxRuntimeExports, v as User, u as ue, B as Button } from "./index-DrVGzxGQ.js";
import { S as Skeleton } from "./skeleton-CTchafLw.js";
import { T as TrendingUp } from "./trending-up-BcmdYqt_.js";
import { C as ChevronRight } from "./chevron-right-Bp0gif28.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }]
];
const Banknote = createLucideIcon("banknote", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$2);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$1);
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
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("admin") === "Aliraza5234") {
  sessionStorage.setItem("adminAccess", "1");
}
const hasAdminUrl = sessionStorage.getItem("adminAccess") === "1";
function AccountPage({
  onNavigate,
  onLogout
}) {
  const storedPhone = localStorage.getItem("pb_phone");
  const { data: profile, isLoading } = useUserProfile();
  const { data: isAdmin } = useIsAdmin();
  const shortUid = storedPhone ? storedPhone.slice(-8) : "--------";
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-4 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-2xl" }, i)) });
  }
  const handleLogout = () => {
    localStorage.removeItem("pb_phone");
    localStorage.removeItem("pb_pwd_hash");
    onLogout == null ? void 0 : onLogout();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "green-gradient px-5 pt-6 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-bold text-lg", children: (profile == null ? void 0 : profile.username) ?? storedPhone ?? "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full", children: "VIP 1" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/70 text-xs mt-0.5", children: [
          "UID: ",
          shortUid
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/60 text-xs mt-0.5", children: [
          "Code: ",
          profile == null ? void 0 : profile.referralCode
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 -mt-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Balance",
            value: `₹${((profile == null ? void 0 : profile.walletBalance) ?? 0).toFixed(0)}`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Recharge",
            value: `₹${((profile == null ? void 0 : profile.totalRecharged) ?? 0).toFixed(0)}`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            label: "Income",
            value: `₹${((profile == null ? void 0 : profile.totalEarned) ?? 0).toFixed(0)}`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl card-shadow overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MenuItem,
          {
            icon: "💳",
            label: "Personal Information",
            onClick: () => onNavigate("personal-info"),
            ocid: "account.personal.button"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MenuItem,
          {
            icon: "🏦",
            label: "Bank Card Binding",
            onClick: () => onNavigate("bank"),
            ocid: "account.bank.button"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MenuItem,
          {
            icon: "📱",
            label: "My Devices",
            onClick: () => ue.info("Coming soon"),
            ocid: "account.devices.button"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MenuItem,
          {
            icon: "📊",
            label: "Income Details",
            onClick: () => ue.info("Coming soon"),
            ocid: "account.income.button"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MenuItem,
          {
            icon: "ℹ️",
            label: "About Us",
            onClick: () => ue.info("Version 1.0.0"),
            ocid: "account.about.button"
          }
        )
      ] }),
      (isAdmin || hasAdminUrl) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: () => onNavigate("admin"),
          variant: "outline",
          className: "w-full border-primary text-primary font-semibold hover:bg-secondary",
          "data-ocid": "account.admin.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 mr-2" }),
            " Admin Panel"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleLogout,
          className: "w-full flex items-center justify-between px-4 py-4 bg-card rounded-2xl card-shadow text-destructive font-semibold",
          "data-ocid": "account.logout.button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🚪" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Logout" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "text-center pt-2 text-xs text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ". Built with ❤️ using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
            className: "text-primary underline",
            target: "_blank",
            rel: "noreferrer",
            children: "caffeine.ai"
          }
        )
      ] })
    ] })
  ] });
}
function StatCard({
  label,
  value,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl p-3 card-shadow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-primary mb-1", children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: value })
  ] });
}
function MenuItem({
  icon,
  label,
  onClick,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: "w-full flex items-center justify-between px-4 py-3.5 border-b border-border last:border-0 hover:bg-secondary/40 transition-colors",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
      ]
    }
  );
}
export {
  AccountPage as default
};
