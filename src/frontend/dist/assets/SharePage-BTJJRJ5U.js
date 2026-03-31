import { c as createLucideIcon, b as useUserProfile, r as reactExports, u as ue, j as jsxRuntimeExports, B as Button, S as Share2 } from "./index-DAmdjHi7.js";
import { C as Check } from "./check-DyDjp-bd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { x: "3", y: "8", width: "18", height: "4", rx: "1", key: "bkv52" }],
  ["path", { d: "M12 8v13", key: "1c76mn" }],
  ["path", { d: "M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7", key: "6wjy6b" }],
  [
    "path",
    {
      d: "M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",
      key: "1ihvrl"
    }
  ]
];
const Gift = createLucideIcon("gift", __iconNode);
function copyToClipboard(text) {
  var _a;
  if ((_a = navigator.clipboard) == null ? void 0 : _a.writeText) {
    navigator.clipboard.writeText(text).catch(() => {
    });
    return true;
  }
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
  document.body.appendChild(el);
  el.focus();
  el.select();
  el.setSelectionRange(0, el.value.length);
  const ok = document.execCommand("copy");
  document.body.removeChild(el);
  return ok;
}
const APP_SHARES = [
  {
    name: "WhatsApp",
    color: "#25D366",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: "w-5 h-5",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
      }
    ),
    getUrl: (link, code) => `https://wa.me/?text=${encodeURIComponent(`Join me on FIFA World Cup! Use my referral code: ${code} 
${link}`)}`
  },
  {
    name: "Telegram",
    color: "#0088cc",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: "w-5 h-5",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" })
      }
    ),
    getUrl: (link, code) => `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(`Join FIFA World Cup! Use my referral code: ${code}`)}`
  },
  {
    name: "Facebook",
    color: "#1877F2",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: "w-5 h-5",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })
      }
    ),
    getUrl: (link) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`
  },
  {
    name: "Twitter/X",
    color: "#000000",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: "w-5 h-5",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
      }
    ),
    getUrl: (link, code) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Join FIFA World Cup! Use my referral code: ${code}`)}&url=${encodeURIComponent(link)}`
  },
  {
    name: "Instagram",
    color: "#E1306C",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: "w-5 h-5",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" })
      }
    ),
    getUrl: (link) => {
      copyToClipboard(link);
      ue.success("Link copied! Open Instagram and paste it.");
      return null;
    }
  }
];
function SharePage() {
  const { data: profile } = useUserProfile();
  const [copied, setCopied] = reactExports.useState(false);
  const referralCode = (profile == null ? void 0 : profile.referralCode) ?? "";
  const referralLink = `${window.location.origin}${window.location.pathname}?ref=${referralCode}`;
  reactExports.useEffect(() => {
    if (!referralCode) return;
    const ok = copyToClipboard(referralLink);
    if (ok) {
      setCopied(true);
      ue.success("Referral link copied automatically!");
      setTimeout(() => setCopied(false), 2e3);
    }
  }, [referralCode, referralLink]);
  const handleCopy = () => {
    const ok = copyToClipboard(referralLink);
    if (ok) {
      setCopied(true);
      ue.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2e3);
    } else {
      ue.error("Copy failed. Please select the link and copy manually.");
    }
  };
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join FIFA World Cup",
          text: `Join me on FIFA World Cup and start earning daily returns! Use my referral code: ${referralCode}`,
          url: referralLink
        });
      } catch {
      }
    } else {
      handleCopy();
    }
  };
  const handleAppShare = (app) => {
    const url = app.getUrl(referralLink, referralCode);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "green-gradient px-5 pt-6 pb-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "w-8 h-8 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-bold text-xl mb-2", children: "Invite & Earn" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm max-w-[260px] mx-auto", children: "Invite friends and earn bonus from their investments. Build your team and multiply your earnings!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 -mt-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl card-shadow p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 text-center", children: "Your Referral Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-secondary rounded-xl p-4 text-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold tracking-[0.3em] text-primary", children: referralCode || "------" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Referral Link" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 bg-muted rounded-lg px-3 py-2 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate flex-1", children: referralLink }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleCopy,
              className: "green-gradient text-white border-0 font-semibold hover:opacity-90",
              "data-ocid": "share.copy.button",
              children: [
                copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 mr-1.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4 mr-1.5" }),
                copied ? "Copied!" : "Copy Link"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleShare,
              className: "green-gradient text-white border-0 font-semibold",
              "data-ocid": "share.share.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4 mr-1.5" }),
                "Share"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3 text-center font-medium", children: "Share via" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2", children: APP_SHARES.map((app) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleAppShare(app),
            className: "flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-muted transition-colors",
            title: app.name,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm",
                  style: { backgroundColor: app.color },
                  children: app.icon
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground leading-tight text-center", children: app.name })
            ]
          },
          app.name
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl card-shadow p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3", children: "How It Works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
          {
            step: "1",
            title: "Share Your Link",
            desc: "Share your unique referral link with friends"
          },
          {
            step: "2",
            title: "Friend Registers",
            desc: "Your friend signs up using your referral code"
          },
          {
            step: "3",
            title: "Earn Bonuses",
            desc: "Earn from your team's investment activity"
          }
        ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full green-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0", children: s.step }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: s.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.desc })
          ] })
        ] }, s.step)) })
      ] })
    ] })
  ] });
}
export {
  SharePage as default
};
