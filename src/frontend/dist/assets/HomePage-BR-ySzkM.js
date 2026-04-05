import { a as useInternetIdentity, b as useAllPlans, d as useUserInvestments, r as reactExports, e as useCreateInvestment, f as useAddOrUpdatePlan, j as jsxRuntimeExports, B as Button, u as ue } from "./index-BCMvTrdF.js";
import { B as Badge } from "./badge-Mcw9Tx6m.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-B-gLjX6w.js";
import { S as Skeleton } from "./skeleton-DziiOf-z.js";
import { g as getWallet } from "./wallet-y-3ERYYH.js";
import { C as ChevronRight } from "./chevron-right-DfyViqDH.js";
import { L as LoaderCircle } from "./loader-circle-DngyrKD4.js";
import "./index-JZwGUCbb.js";
function calcDailyIncome(price, dailyReturnPct) {
  return price * dailyReturnPct / 100;
}
function calcTotalReturn(price, dailyReturnPct, durationDays) {
  return calcDailyIncome(price, dailyReturnPct) * durationDays;
}
const BLUE_BTN_STYLE = {
  background: "linear-gradient(135deg, #1565c0 0%, #3b82f6 100%)",
  boxShadow: "0 4px 20px rgba(59,130,246,0.4)",
  color: "#ffffff"
};
const DEFAULT_PLANS = [
  {
    id: 1n,
    name: "Group Stage",
    description: "Entry level plan for new investors",
    price: 490,
    dailyReturn: 14.28,
    durationDays: 30n,
    active: true
  },
  {
    id: 2n,
    name: "Round of 16",
    description: "Build your momentum with steady gains",
    price: 990,
    dailyReturn: 10,
    durationDays: 45n,
    active: true
  },
  {
    id: 3n,
    name: "Quarter Final",
    description: "Mid-tier plan with strong daily return",
    price: 2370,
    dailyReturn: 8,
    durationDays: 60n,
    active: true
  },
  {
    id: 4n,
    name: "Semi Final",
    description: "High-performance investment plan",
    price: 4990,
    dailyReturn: 7,
    durationDays: 90n,
    active: true
  },
  {
    id: 5n,
    name: "World Cup Final",
    description: "Premium plan for serious investors",
    price: 9990,
    dailyReturn: 6,
    durationDays: 120n,
    active: true
  },
  {
    id: 6n,
    name: "Champion's Cup",
    description: "Ultimate plan — maximum returns",
    price: 24990,
    dailyReturn: 5.5,
    durationDays: 180n,
    active: true
  }
];
function HomePage({ onNavigate }) {
  const { identity } = useInternetIdentity();
  const userId = identity == null ? void 0 : identity.getPrincipal().toString();
  const { data: plans, isLoading: plansLoading } = useAllPlans();
  const { data: investments } = useUserInvestments(userId);
  const [modal, setModal] = reactExports.useState({ type: "none" });
  const [showDownloadModal, setShowDownloadModal] = reactExports.useState(false);
  const createInvestment = useCreateInvestment();
  const addPlan = useAddOrUpdatePlan();
  const seededRef = reactExports.useRef(false);
  const addPlanMutateRef = reactExports.useRef(addPlan.mutate);
  addPlanMutateRef.current = addPlan.mutate;
  const [walletBalance, setWalletBalance] = reactExports.useState(0);
  const [walletEarnings, setWalletEarnings] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const phone = localStorage.getItem("pb_current_phone");
    if (phone) {
      const w = getWallet(phone);
      setWalletBalance(w.balance);
      setWalletEarnings(w.earnings);
    }
  }, []);
  reactExports.useEffect(() => {
    if (!plans || plansLoading || plans.length > 0 || seededRef.current) return;
    seededRef.current = true;
    for (const p of DEFAULT_PLANS) {
      addPlanMutateRef.current(p);
    }
  }, [plans, plansLoading]);
  const activePlans = (plans == null ? void 0 : plans.filter((p) => p.active)) ?? [];
  const activeInvestments = (investments == null ? void 0 : investments.filter((i) => i.active)) ?? [];
  const handlePurchaseClick = (plan) => {
    if (walletBalance < plan.price) {
      setModal({ type: "insufficient", plan });
    } else {
      setModal({ type: "confirm", plan });
    }
  };
  const handleConfirmPurchase = async () => {
    if (modal.type !== "confirm") return;
    const plan = modal.plan;
    const result = await createInvestment.mutateAsync({
      planId: plan.id,
      amount: plan.price
    });
    if (result === "ok") {
      ue.success("Investment created successfully!");
      setModal({ type: "none" });
    } else if (result === "insufficientBalance") {
      setModal({ type: "insufficient", plan });
    } else {
      ue.error("Plan not found.");
      setModal({ type: "none" });
    }
  };
  const currentPlan = modal.type === "insufficient" || modal.type === "confirm" ? modal.plan : null;
  const dailyRupees = currentPlan ? calcDailyIncome(currentPlan.price, currentPlan.dailyReturn) : 0;
  const totalReturn = currentPlan ? calcTotalReturn(
    currentPlan.price,
    currentPlan.dailyReturn,
    Number(currentPlan.durationDays)
  ) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-5 pt-5 pb-6",
        style: {
          background: "radial-gradient(ellipse at top, rgba(59,130,246,0.3) 0%, transparent 70%), linear-gradient(135deg, #0a1628 0%, #1565c0 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm mb-1", children: "Welcome back 👋" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-bold text-xl mb-4", children: "Investor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-white/15 rounded-xl p-3 backdrop-blur-sm",
                style: { boxShadow: "0 0 12px rgba(59,130,246,0.2)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-[10px] mb-0.5", children: "Balance" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white font-bold text-base", children: [
                    "₹",
                    walletBalance.toFixed(0)
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-white/15 rounded-xl p-3 backdrop-blur-sm",
                style: { boxShadow: "0 0 12px rgba(59,130,246,0.2)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-[10px] mb-0.5", children: "Total Income" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white font-bold text-base", children: [
                    "₹",
                    walletEarnings.toFixed(0)
                  ] })
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 -mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl card-shadow p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ActionCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-icons text-xl", children: "trending_up" }),
          label: "Withdraw",
          onClick: () => onNavigate("withdrawal"),
          ocid: "home.withdraw.button"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ActionCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-icons text-xl", children: "account_balance_wallet" }),
          label: "Recharge",
          onClick: () => onNavigate("recharge"),
          ocid: "home.recharge.button"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ActionCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-icons text-xl", children: "share" }),
          label: "Channel",
          onClick: () => onNavigate("share"),
          ocid: "home.channel.button"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ActionCard,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-icons text-xl", children: "download" }),
          label: "Download",
          onClick: () => setShowDownloadModal(true),
          ocid: "home.download.button"
        }
      )
    ] }) }) }),
    activeInvestments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Active Investments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: activeInvestments.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: activeInvestments.map((inv, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card rounded-xl p-3 card-shadow flex items-center justify-between",
          "data-ocid": `investments.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-sm text-foreground", children: [
                "Plan #",
                inv.planId.toString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Amount: ₹",
                inv.amount.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "font-semibold text-sm",
                  style: { color: "#3b82f6" },
                  children: [
                    "+₹",
                    inv.dailyEarnings.toFixed(2),
                    "/day"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Earned: ₹",
                inv.totalEarned.toFixed(2)
              ] })
            ] })
          ]
        },
        `${inv.planId.toString()}-${inv.startTime.toString()}`
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Investment Plans" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground" })
      ] }),
      plansLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [1, 2, 3].map((_i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 w-full rounded-2xl" }, _i)) }) : activePlans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "bg-card rounded-2xl p-8 card-shadow text-center",
          "data-ocid": "plans.empty_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading plans..." })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: activePlans.map((plan, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        PlanCard,
        {
          plan,
          index: i + 1,
          onInvest: () => handlePurchaseClick(plan)
        },
        plan.id.toString()
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showDownloadModal, onOpenChange: setShowDownloadModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "max-w-[380px] rounded-2xl mx-auto",
        "data-ocid": "download.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "material-icons text-xl",
                style: { color: "#3b82f6" },
                children: "install_mobile"
              }
            ),
            "Install App"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl p-4 space-y-2",
                style: {
                  background: "rgba(59,130,246,0.08)",
                  border: "1px solid rgba(59,130,246,0.2)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "material-icons text-base",
                        style: { color: "#3b82f6" },
                        children: "android"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Android (Chrome)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal list-inside space-y-1 text-sm text-muted-foreground pl-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      "Tap the",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "3-dot menu" }),
                      " ",
                      "(⋮) in Chrome"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      "Tap",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: '"Add to Home Screen"' })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      "Tap ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: '"Add"' }),
                      " ",
                      "to confirm"
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded-xl p-4 space-y-2",
                style: {
                  background: "rgba(59,130,246,0.08)",
                  border: "1px solid rgba(59,130,246,0.2)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "material-icons text-base",
                        style: { color: "#3b82f6" },
                        children: "apple"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "iPhone (Safari)" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal list-inside space-y-1 text-sm text-muted-foreground pl-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      "Tap the",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Share button" }),
                      " ",
                      "(box with arrow ↑)"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      "Scroll down and tap",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: '"Add to Home Screen"' })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                      "Tap ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: '"Add"' }),
                      " ",
                      "to confirm"
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center px-2", children: "The app will appear on your home screen and open like a native app" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full border-0 font-semibold",
                style: BLUE_BTN_STYLE,
                onClick: () => setShowDownloadModal(false),
                "data-ocid": "download.close_button",
                children: "Got it!"
              }
            )
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: modal.type === "insufficient",
        onOpenChange: (o) => {
          if (!o) setModal({ type: "none" });
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-[380px] rounded-2xl mx-auto",
            "data-ocid": "insufficient.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-red-600", children: "Insufficient Balance" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rounded-xl p-4",
                    style: {
                      background: "rgba(220,38,38,0.08)",
                      border: "1px solid rgba(220,38,38,0.2)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground leading-relaxed", children: [
                      "Your current balance is",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", style: { color: "#3b82f6" }, children: [
                        "₹",
                        walletBalance.toFixed(0)
                      ] }),
                      ". You need",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-red-600", children: [
                        "₹",
                        currentPlan == null ? void 0 : currentPlan.price
                      ] }),
                      " ",
                      "to purchase this plan. Please recharge your wallet first."
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: () => setModal({ type: "none" }),
                      "data-ocid": "insufficient.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: "flex-1 border-0 font-semibold",
                      style: BLUE_BTN_STYLE,
                      onClick: () => {
                        setModal({ type: "none" });
                        onNavigate("recharge");
                      },
                      "data-ocid": "insufficient.recharge.button",
                      children: "Recharge Now"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: modal.type === "confirm",
        onOpenChange: (o) => {
          if (!o) setModal({ type: "none" });
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-[380px] rounded-2xl mx-auto",
            "data-ocid": "confirm.dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Confirm Purchase" }) }),
              currentPlan && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary rounded-xl p-4 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-base", children: currentPlan.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-y-1 text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Price:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                      "₹",
                      currentPlan.price
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Daily Earning:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", style: { color: "#3b82f6" }, children: [
                      "₹",
                      dailyRupees.toFixed(0),
                      "/day"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Duration:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                      currentPlan.durationDays.toString(),
                      " days"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "rounded-lg p-3 mt-2",
                      style: {
                        background: "rgba(59,130,246,0.1)",
                        border: "1px solid rgba(59,130,246,0.3)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: "Total Return" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
                          "₹",
                          dailyRupees.toFixed(0),
                          " ×",
                          " ",
                          currentPlan.durationDays.toString(),
                          " days =",
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: "font-bold text-base",
                              style: { color: "#3b82f6" },
                              children: [
                                "₹",
                                totalReturn.toFixed(0)
                              ]
                            }
                          )
                        ] })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      className: "flex-1",
                      onClick: () => setModal({ type: "none" }),
                      disabled: createInvestment.isPending,
                      "data-ocid": "confirm.cancel_button",
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      className: "flex-1 border-0 font-semibold",
                      style: BLUE_BTN_STYLE,
                      onClick: handleConfirmPurchase,
                      disabled: createInvestment.isPending,
                      "data-ocid": "confirm.confirm_button",
                      children: [
                        createInvestment.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }) : null,
                        "Confirm"
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    )
  ] });
}
function ActionCard({
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
      className: "flex flex-col items-center gap-1.5 py-2 rounded-xl transition-colors",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-10 h-10 rounded-full flex items-center justify-center",
            style: {
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.4)",
              color: "#3b82f6"
            },
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium text-foreground", children: label })
      ]
    }
  );
}
function PlanCard({
  plan,
  index,
  onInvest
}) {
  const dailyRupees = calcDailyIncome(plan.price, plan.dailyReturn);
  const total = calcTotalReturn(
    plan.price,
    plan.dailyReturn,
    Number(plan.durationDays)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card rounded-2xl card-shadow overflow-hidden",
      "data-ocid": `plans.item.${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-2",
            style: {
              background: "linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #1d4ed8 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-foreground", children: plan.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: plan.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                className: "border-0 font-semibold",
                style: {
                  background: "rgba(59,130,246,0.15)",
                  color: "#2563eb",
                  border: "1px solid rgba(59,130,246,0.3)"
                },
                children: [
                  plan.dailyReturn,
                  "%/day"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-foreground text-sm", children: [
                "₹",
                plan.price
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center border-x border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Daily" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-sm", style: { color: "#3b82f6" }, children: [
                "₹",
                dailyRupees.toFixed(0)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center border-r border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: plan.durationDays.toString() })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-sm", style: { color: "#3b82f6" }, children: [
                "₹",
                total.toFixed(0)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: onInvest,
              className: "w-full border-0 font-semibold h-9",
              style: BLUE_BTN_STYLE,
              "data-ocid": `plans.invest.button.${index}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "material-icons text-base mr-1", children: "shopping_cart" }),
                "Purchase Now"
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  HomePage as default
};
