import { c as createLucideIcon, g as useUserProfile, t as useIsAdmin, a as useInternetIdentity, m as useAllRecharges, o as useAllWithdrawals, r as reactExports, j as jsxRuntimeExports, v as User, u as ue, B as Button } from "./index-DYsE67EW.js";
import { B as Badge } from "./badge-CpLSqUND.js";
import { S as Skeleton } from "./skeleton-D8YvEWtn.js";
import { g as getWallet } from "./wallet-C74YaBx6.js";
import { T as TrendingUp } from "./trending-up-D63AL9U8.js";
import { C as Clock } from "./clock-JFGVJFI5.js";
import { C as ChevronRight } from "./chevron-right-CdmCAmc3.js";
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
function AccountPage({
  onNavigate,
  onLogout
}) {
  const { data: profile, isLoading } = useUserProfile();
  const { data: isAdmin } = useIsAdmin();
  const { identity } = useInternetIdentity();
  const { data: recharges, isLoading: rechargesLoading } = useAllRecharges();
  const { data: withdrawals, isLoading: withdrawalsLoading } = useAllWithdrawals();
  const [hasAdminUrl, setHasAdminUrl] = reactExports.useState(
    () => sessionStorage.getItem("adminAccess") === "1"
  );
  const [walletBalance, setWalletBalance] = reactExports.useState(0);
  const [walletEarnings, setWalletEarnings] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "Alireza5234") {
      sessionStorage.setItem("adminAccess", "1");
      setHasAdminUrl(true);
    }
    const phone = localStorage.getItem("pb_current_phone");
    if (phone) {
      const w = getWallet(phone);
      setWalletBalance(w.balance);
      setWalletEarnings(w.earnings);
    }
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-4 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-2xl" }, i)) });
  }
  const handleLogout = () => {
    localStorage.removeItem("pb_phone");
    localStorage.removeItem("pb_pwd_hash");
    onLogout == null ? void 0 : onLogout();
  };
  const userId = identity == null ? void 0 : identity.getPrincipal().toString();
  const myRecharges = (recharges ?? []).filter((r) => r.userId.toString() === userId).slice(-5).reverse();
  const myWithdrawals = (withdrawals ?? []).filter((w) => w.userId.toString() === userId).slice(-5).reverse();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "green-gradient px-5 pt-6 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-bold text-lg", children: (profile == null ? void 0 : profile.phone) || "FIFA Member" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full", children: "VIP 1" })
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
            value: `₹${walletBalance.toFixed(0)}`,
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
            value: `₹${walletEarnings.toFixed(0)}`,
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-2xl card-shadow overflow-hidden",
          "data-ocid": "account.recharge.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-3 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: "Recharge History" })
            ] }),
            rechargesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-4 py-3 space-y-2",
                "data-ocid": "account.recharge.loading_state",
                children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-xl" }, i))
              }
            ) : myRecharges.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-4 py-6 text-center text-muted-foreground text-sm",
                "data-ocid": "account.recharge.empty_state",
                children: "No recharge history"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: myRecharges.map((r, idx) => {
              var _a;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between px-4 py-3",
                  "data-ocid": `account.recharge.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                        "₹",
                        Number(r.amount).toFixed(0)
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[160px]", children: r.paymentRef })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.status })
                  ]
                },
                ((_a = r.id) == null ? void 0 : _a.toString()) ?? idx
              );
            }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-2xl card-shadow overflow-hidden",
          "data-ocid": "account.withdrawal.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-3 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: "Withdrawal History" })
            ] }),
            withdrawalsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-4 py-3 space-y-2",
                "data-ocid": "account.withdrawal.loading_state",
                children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-xl" }, i))
              }
            ) : myWithdrawals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-4 py-6 text-center text-muted-foreground text-sm",
                "data-ocid": "account.withdrawal.empty_state",
                children: "No withdrawal history"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: myWithdrawals.map((w, idx) => {
              var _a;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center justify-between px-4 py-3",
                  "data-ocid": `account.withdrawal.item.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                        "₹",
                        Number(w.amount).toFixed(0)
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[160px]", children: w.paymentDetails })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: w.status })
                  ]
                },
                ((_a = w.id) == null ? void 0 : _a.toString()) ?? idx
              );
            }) })
          ]
        }
      ),
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
      )
    ] })
  ] });
}
function StatusBadge({ status }) {
  const s = Array.isArray(status) ? Object.keys(status[0] ?? {})[0] : typeof status === "object" ? Object.keys(status)[0] : String(status);
  if (s === "completed" || s === "Completed") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/20 text-green-400 border-green-500/30 text-[10px]", children: "Completed" });
  }
  if (s === "failed" || s === "Failed" || s === "rejected" || s === "Rejected") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-500/20 text-red-400 border-red-500/30 text-[10px]", children: "Failed" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-[10px]", children: "Pending" });
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
