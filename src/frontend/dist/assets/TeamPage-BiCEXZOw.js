import { a as useInternetIdentity, g as useUserProfile, h as useReferralTree, r as reactExports, j as jsxRuntimeExports, U as Users } from "./index-B5YROnPL.js";
import { S as Skeleton } from "./skeleton-2nJFfQPG.js";
const COMMISSION_LEVELS = [
  { level: 1, pct: 15, color: "border-emerald-500", bg: "bg-emerald-900/30" },
  { level: 2, pct: 2, color: "border-blue-500", bg: "bg-blue-900/30" },
  { level: 3, pct: 1, color: "border-purple-500", bg: "bg-purple-900/30" }
];
function TeamPage() {
  const { identity } = useInternetIdentity();
  const userId = identity == null ? void 0 : identity.getPrincipal().toString();
  const { data: profile } = useUserProfile();
  const { data: tree, isLoading } = useReferralTree(userId);
  const [activeLevel, setActiveLevel] = reactExports.useState(1);
  const levels = {
    1: (tree == null ? void 0 : tree.level1) ?? [],
    2: (tree == null ? void 0 : tree.level2) ?? [],
    3: (tree == null ? void 0 : tree.level3) ?? []
  };
  const totalTeam = levels[1].length + levels[2].length + levels[3].length;
  const currentMembers = levels[activeLevel];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "green-gradient px-5 pt-5 pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-bold text-lg mb-1", children: "My Team" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm mb-4", children: "Referral commission up to 18%" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/15 rounded-xl p-3 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs mb-1", children: "Team Size" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-2xl", children: totalTeam })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/15 rounded-xl p-3 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs mb-1", children: "Referral Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-base tracking-widest", children: (profile == null ? void 0 : profile.referralCode) ?? "---" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/15 rounded-xl p-3 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-xs mb-1", children: "Team Recharge" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-2xl", children: "₹0" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 -mt-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl card-shadow p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Commission Structure" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full", children: "Up to 18%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: COMMISSION_LEVELS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center justify-between p-3 rounded-xl border-l-4 ${c.color} ${c.bg}`,
            "data-ocid": `team.commission.item.${c.level}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-semibold text-foreground text-sm", children: [
                  "Level ",
                  c.level
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Referral Commission" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-primary", children: [
                c.pct,
                "%"
              ] })
            ]
          },
          c.level
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl card-shadow overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex border-b border-border", children: [1, 2, 3].map((lv) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setActiveLevel(lv),
            className: `flex-1 py-3 text-sm font-semibold transition-colors ${activeLevel === lv ? "text-primary border-b-2 border-primary bg-secondary/50" : "text-muted-foreground"}`,
            "data-ocid": "team.level.tab",
            children: [
              "LV:",
              lv,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-normal", children: [
                "(",
                levels[lv].length,
                ")"
              ] })
            ]
          },
          lv
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary rounded-xl p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Team Size" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-xl", children: currentMembers.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary rounded-xl p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Level ",
                activeLevel
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-primary text-xl", children: [
                currentMembers.length,
                " members"
              ] })
            ] })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-xl" }, i)) }) : currentMembers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8", "data-ocid": "team.empty_state", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground mx-auto mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
              "No members at Level ",
              activeLevel,
              " yet"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Invite friends to grow your team!" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: currentMembers.map((member, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 py-2 border-b border-border last:border-0",
              "data-ocid": `team.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full green-gradient flex items-center justify-center text-white text-xs font-bold", children: i + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
                    "Member ",
                    i + 1
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate max-w-[220px]", children: [
                    member.toString().slice(0, 20),
                    "..."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-secondary text-primary px-2 py-0.5 rounded-full", children: [
                  "LV:",
                  activeLevel
                ] }) })
              ]
            },
            member.toString()
          )) })
        ] })
      ] })
    ] })
  ] });
}
export {
  TeamPage as default
};
