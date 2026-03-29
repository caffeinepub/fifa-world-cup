import { Button } from "@/components/ui/button";
import { Check, Copy, Gift, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUserProfile } from "../hooks/useQueries";

function copyToClipboard(text: string): boolean {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
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
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    getUrl: (link: string, code: string) =>
      `https://wa.me/?text=${encodeURIComponent(`Join me on FIFA World Cup! Use my referral code: ${code} \n${link}`)}`,
  },
  {
    name: "Telegram",
    color: "#0088cc",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    getUrl: (link: string, code: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(`Join FIFA World Cup! Use my referral code: ${code}`)}`,
  },
  {
    name: "Facebook",
    color: "#1877F2",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    getUrl: (link: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
  },
  {
    name: "Twitter/X",
    color: "#000000",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    getUrl: (link: string, code: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Join FIFA World Cup! Use my referral code: ${code}`)}&url=${encodeURIComponent(link)}`,
  },
  {
    name: "Instagram",
    color: "#E1306C",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    getUrl: (link: string) => {
      // Instagram doesn't support direct share URLs; copy link instead
      copyToClipboard(link);
      toast.success("Link copied! Open Instagram and paste it.");
      return null;
    },
  },
];

export default function SharePage() {
  const { data: profile } = useUserProfile();
  const [copied, setCopied] = useState(false);

  const referralCode = profile?.referralCode ?? "";
  const referralLink = `${window.location.origin}${window.location.pathname}?ref=${referralCode}`;

  useEffect(() => {
    if (!referralCode) return;
    const ok = copyToClipboard(referralLink);
    if (ok) {
      setCopied(true);
      toast.success("Referral link copied automatically!");
      setTimeout(() => setCopied(false), 2000);
    }
  }, [referralCode, referralLink]);

  const handleCopy = () => {
    const ok = copyToClipboard(referralLink);
    if (ok) {
      setCopied(true);
      toast.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Copy failed. Please select the link and copy manually.");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join FIFA World Cup",
          text: `Join me on FIFA World Cup and start earning daily returns! Use my referral code: ${referralCode}`,
          url: referralLink,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopy();
    }
  };

  const handleAppShare = (app: (typeof APP_SHARES)[0]) => {
    const url = app.getUrl(referralLink, referralCode);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="pb-4">
      {/* Hero */}
      <div className="green-gradient px-5 pt-6 pb-12 text-center">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
          <Gift className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-white font-bold text-xl mb-2">Invite & Earn</h2>
        <p className="text-white/80 text-sm max-w-[260px] mx-auto">
          Invite friends and earn bonus from their investments. Build your team
          and multiply your earnings!
        </p>
      </div>

      <div className="px-4 -mt-6 space-y-4">
        {/* Referral Code Card */}
        <div className="bg-card rounded-2xl card-shadow p-5">
          <p className="text-xs text-muted-foreground mb-1 text-center">
            Your Referral Code
          </p>
          <div className="bg-secondary rounded-xl p-4 text-center mb-4">
            <p className="text-3xl font-bold tracking-[0.3em] text-primary">
              {referralCode || "------"}
            </p>
          </div>

          <p className="text-xs text-muted-foreground mb-2">Referral Link</p>
          <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 mb-4">
            <p className="text-xs text-muted-foreground truncate flex-1">
              {referralLink}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <Button
              onClick={handleCopy}
              className="green-gradient text-white border-0 font-semibold hover:opacity-90"
              data-ocid="share.copy.button"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-1.5" />
              ) : (
                <Copy className="w-4 h-4 mr-1.5" />
              )}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
            <Button
              onClick={handleShare}
              className="green-gradient text-white border-0 font-semibold"
              data-ocid="share.share.button"
            >
              <Share2 className="w-4 h-4 mr-1.5" />
              Share
            </Button>
          </div>

          {/* Share to Apps */}
          <p className="text-xs text-muted-foreground mb-3 text-center font-medium">
            Share via
          </p>
          <div className="grid grid-cols-5 gap-2">
            {APP_SHARES.map((app) => (
              <button
                type="button"
                key={app.name}
                onClick={() => handleAppShare(app)}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-muted transition-colors"
                title={app.name}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: app.color }}
                >
                  {app.icon}
                </div>
                <span className="text-[10px] text-muted-foreground leading-tight text-center">
                  {app.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-card rounded-2xl card-shadow p-4">
          <h3 className="font-semibold text-foreground mb-3">How It Works</h3>
          <div className="space-y-3">
            {[
              {
                step: "1",
                title: "Share Your Link",
                desc: "Share your unique referral link with friends",
              },
              {
                step: "2",
                title: "Friend Registers",
                desc: "Your friend signs up using your referral code",
              },
              {
                step: "3",
                title: "Earn Bonuses",
                desc: "Earn from your team's investment activity",
              },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full green-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {s.step}
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {s.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
