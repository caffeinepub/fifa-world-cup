import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button, u as ue } from "./index-BCMvTrdF.js";
import { B as Badge } from "./badge-Mcw9Tx6m.js";
import { L as Label, I as Input } from "./label-D7lUWdOA.js";
import { g as getUserRecharges, a as addRecharge } from "./adminStore-DR4uEK1x.js";
import { A as ArrowLeft } from "./arrow-left-DGXBSDC8.js";
import { C as CircleAlert } from "./circle-alert-DI8QsXkR.js";
import { C as Clock } from "./clock-8KjUEkno.js";
import "./index-JZwGUCbb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
const QUICK_AMOUNTS = [490, 500, 1e3, 2e3, 5e3];
const PAYMENT_METHODS = [
  {
    id: "pay-j",
    label: "Pay-J",
    icon: "₹",
    accent: "#F97316",
    desc: "Instant UPI"
  },
  {
    id: "pay-h",
    label: "Pay-H",
    icon: "🏦",
    accent: "#3B82F6",
    desc: "Bank Transfer"
  },
  {
    id: "pay-l",
    label: "Pay-L",
    icon: "💳",
    accent: "#8B5CF6",
    desc: "Card Payment"
  }
];
function generateTxnId() {
  return `TXN-${Date.now()}-${Math.floor(1e3 + Math.random() * 9e3)}`;
}
const statusColor = (s) => {
  if (s === "completed") return "bg-green-100 text-green-700";
  if (s === "failed") return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
};
function RechargePage({ onBack }) {
  const phone = localStorage.getItem("pb_current_phone") || "";
  const [amount, setAmount] = reactExports.useState("");
  const [paymentRef, setPaymentRef] = reactExports.useState("");
  const [selectedMethod, setSelectedMethod] = reactExports.useState("pay-j");
  const [txnId, setTxnId] = reactExports.useState(() => generateTxnId());
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [myRecharges, setMyRecharges] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (phone) setMyRecharges(getUserRecharges(phone).slice(0, 5));
  }, [phone]);
  const regenerateTxnId = reactExports.useCallback(() => {
    const newId = generateTxnId();
    setTxnId(newId);
  }, []);
  reactExports.useEffect(() => {
    setPaymentRef(txnId);
  }, [txnId]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const amt = Number.parseFloat(amount);
    if (Number.isNaN(amt) || amt <= 0) {
      ue.error("Enter a valid amount");
      return;
    }
    if (amt < 490) {
      ue.error("Minimum deposit amount is ₹490");
      return;
    }
    if (!phone) {
      ue.error("Not logged in");
      return;
    }
    setSubmitting(true);
    const ref = paymentRef.trim() || txnId;
    addRecharge(phone, amt, ref);
    ue.success(
      `Recharge request of ₹${amt} submitted! Awaiting admin approval.`
    );
    setAmount("");
    regenerateTxnId();
    if (phone) setMyRecharges(getUserRecharges(phone).slice(0, 5));
    setSubmitting(false);
  };
  const activeMethod = PAYMENT_METHODS.find((m) => m.id === selectedMethod);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 bg-card border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: onBack,
          "data-ocid": "recharge.back.button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Recharge Wallet" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 mt-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4",
          "data-ocid": "recharge.notice.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-amber-600 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-amber-800", children: "Minimum Deposit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-700 mt-0.5", children: [
                "Minimum deposit amount: ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "₹490" })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-4 card-shadow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3", children: "Select Payment Method" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: PAYMENT_METHODS.map((method) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setSelectedMethod(method.id),
            className: `flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${selectedMethod === method.id ? "border-primary bg-secondary/50" : "border-border bg-background hover:border-primary/40"}`,
            "data-ocid": "recharge.payment.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm",
                  style: { background: method.accent },
                  children: method.icon
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: method.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: method.desc })
            ]
          },
          method.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-4 card-shadow border-l-4 border-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: activeMethod.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground", children: [
            activeMethod.label,
            " — Payment Details"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Bank Name:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "To be provided by admin" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Account No:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "XXXX XXXX XXXX" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "IFSC Code:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "XXXX0000000" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "UPI ID:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "admin@upi" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-4 rounded-xl p-3",
            style: {
              background: "rgba(21,101,192,0.10)",
              border: "1px solid rgba(21,101,192,0.25)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Your Transaction ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: regenerateTxnId,
                    className: "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg transition-colors",
                    style: {
                      color: "#1565c0",
                      background: "rgba(21,101,192,0.12)"
                    },
                    "data-ocid": "recharge.txnid.button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                      " Generate New ID"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-mono text-sm font-bold tracking-wide break-all",
                  style: { color: "#b8860b" },
                  "data-ocid": "recharge.txnid.panel",
                  children: txnId
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: "📋 Note this ID before making payment. It will be auto-filled below." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3 bg-yellow-900/20 rounded-lg p-2", children: "⚠️ Make the payment first, then enter the UTR/Reference number below." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "bg-card rounded-2xl p-4 card-shadow space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground", children: [
              "Submit Recharge via ",
              activeMethod.label
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm mb-2 block", children: "Quick Amounts" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: QUICK_AMOUNTS.map((amt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setAmount(amt.toString()),
                  className: `px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${amount === amt.toString() ? "border-primary bg-secondary text-primary" : "border-border text-muted-foreground hover:border-primary"}`,
                  "data-ocid": "recharge.amount.button",
                  children: [
                    "₹",
                    amt
                  ]
                },
                amt
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amount", children: "Amount (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "amount",
                  type: "number",
                  value: amount,
                  onChange: (e) => setAmount(e.target.value),
                  placeholder: "Minimum ₹490",
                  className: "mt-1",
                  "data-ocid": "recharge.amount.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ref", children: "UTR / Reference Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "ref",
                  value: paymentRef,
                  onChange: (e) => setPaymentRef(e.target.value),
                  placeholder: "Transaction ID auto-filled",
                  className: "mt-1 font-mono text-sm",
                  "data-ocid": "recharge.ref.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full green-gradient text-white border-0 font-semibold h-11",
                disabled: submitting,
                "data-ocid": "recharge.submit_button",
                children: "Submit Recharge Request"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-4 card-shadow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Recharge History" })
        ] }),
        myRecharges.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-center text-muted-foreground text-sm py-4",
            "data-ocid": "recharges.empty_state",
            children: "No recharges yet"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: myRecharges.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between py-2 border-b border-border last:border-0",
            "data-ocid": `recharges.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-sm text-foreground", children: [
                  "₹",
                  r.amount.toFixed(2)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Ref: ",
                  r.paymentRef
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `${statusColor(r.status)} border-0 text-xs font-medium`,
                  children: r.status
                }
              )
            ]
          },
          r.id
        )) })
      ] })
    ] })
  ] });
}
export {
  RechargePage as default
};
