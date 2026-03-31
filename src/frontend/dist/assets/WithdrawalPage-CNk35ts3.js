import { j as jsxRuntimeExports, i as cn, a as useInternetIdentity, b as useUserProfile, r as reactExports, m as useCreateWithdrawal, n as useAllWithdrawals, B as Button, u as ue, W as WithdrawalStatus } from "./index-DrVGzxGQ.js";
import { L as LoaderCircle, B as Badge } from "./index-D8E5KS5h.js";
import { L as Label, I as Input } from "./label-K3UKxVLN.js";
import { S as Skeleton } from "./skeleton-CTchafLw.js";
import { A as ArrowLeft } from "./arrow-left-BdFvAdDD.js";
import { C as CircleAlert, a as Clock } from "./clock-Bxty38Wi.js";
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
function WithdrawalPage({ onBack }) {
  const { identity } = useInternetIdentity();
  const userId = identity == null ? void 0 : identity.getPrincipal().toString();
  const { data: profile } = useUserProfile();
  const [amount, setAmount] = reactExports.useState("");
  const [paymentDetails, setPaymentDetails] = reactExports.useState("");
  const withdrawMutation = useCreateWithdrawal();
  const { data: allWithdrawals, isLoading } = useAllWithdrawals();
  const myWithdrawals = (allWithdrawals == null ? void 0 : allWithdrawals.filter((w) => w.userId.toString() === userId)) ?? [];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const amt = Number.parseFloat(amount);
    if (Number.isNaN(amt) || amt <= 0) {
      ue.error("Enter a valid amount");
      return;
    }
    if (amt < 150) {
      ue.error("Minimum withdrawal amount is ₹150");
      return;
    }
    if (!paymentDetails.trim()) {
      ue.error("Enter bank/UPI details");
      return;
    }
    const result = await withdrawMutation.mutateAsync({
      amount: amt,
      paymentDetails
    });
    if (result.__kind__ === "ok") {
      ue.success("Withdrawal request submitted!");
      setAmount("");
      setPaymentDetails("");
    } else if (result.__kind__ === "insufficientBalance") {
      ue.error("Insufficient balance.");
    } else {
      ue.error("Please register first.");
    }
  };
  const statusColor = (s) => {
    if (s === WithdrawalStatus.approved) return "bg-green-100 text-green-700";
    if (s === WithdrawalStatus.rejected) return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 bg-card border-b border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: onBack,
          "data-ocid": "withdrawal.back.button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Withdraw Funds" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 mt-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2",
          "data-ocid": "withdrawal.notice.card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-5 h-5 text-amber-600 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-amber-800", children: "Minimum Withdrawal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-700 mt-0.5", children: [
                  "Minimum withdrawal amount:",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "₹150" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-amber-600 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-amber-800", children: "Withdrawal Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-700 mt-0.5", children: [
                  "Available: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "07:00 - 17:00" })
                ] })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "green-gradient rounded-2xl p-4 text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm", children: "Available Balance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold", children: [
          "₹",
          ((profile == null ? void 0 : profile.walletBalance) ?? 0).toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "bg-card rounded-2xl p-4 card-shadow space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Request Withdrawal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "wAmount", children: "Amount (₹)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "wAmount",
                  type: "number",
                  value: amount,
                  onChange: (e) => setAmount(e.target.value),
                  placeholder: "Minimum ₹150",
                  className: "mt-1",
                  "data-ocid": "withdrawal.amount.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "payDetails", children: "Bank / UPI Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "payDetails",
                  value: paymentDetails,
                  onChange: (e) => setPaymentDetails(e.target.value),
                  placeholder: "Bank: XXXX, Account: XXXX, IFSC: XXXX\nor UPI: yourname@upi",
                  className: "mt-1 min-h-[80px]",
                  "data-ocid": "withdrawal.details.textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                className: "w-full green-gradient text-white border-0 font-semibold h-11",
                disabled: withdrawMutation.isPending,
                "data-ocid": "withdrawal.submit_button",
                children: [
                  withdrawMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }) : null,
                  "Submit Withdrawal"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-4 card-shadow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Withdrawal History" })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-xl" }, i)) }) : myWithdrawals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-center text-muted-foreground text-sm py-4",
            "data-ocid": "withdrawals.empty_state",
            children: "No withdrawals yet"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: myWithdrawals.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between py-2 border-b border-border last:border-0",
            "data-ocid": `withdrawals.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-sm text-foreground", children: [
                  "₹",
                  w.amount.toFixed(2)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-[180px]", children: w.paymentDetails })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `${statusColor(w.status)} border-0 text-xs font-medium`,
                  children: w.status
                }
              )
            ]
          },
          w.id.toString()
        )) })
      ] })
    ] })
  ] });
}
export {
  WithdrawalPage as default
};
