import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronRight,
  Download,
  Loader2,
  Radio,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Page } from "../App";
import type { InvestmentPlan } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAllPlans,
  useCreateInvestment,
  useUserInvestments,
  useUserProfile,
} from "../hooks/useQueries";

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const GOLD_BTN_STYLE = {
  background: "linear-gradient(135deg, #b8860b 0%, #FFD700 100%)",
  boxShadow: "0 4px 20px rgba(184,134,11,0.5), 0 0 30px rgba(255,215,0,0.25)",
  color: "#0a1628",
};

const BANNER_SLIDES = [
  { type: "image" as const },
  {
    type: "text" as const,
    emoji: "⚽",
    name: "FIFA World Cup 2026",
    tagline: "Invest & Earn During the World Cup Season",
    gradient: "linear-gradient(135deg, #0a1628 0%, #1a3a6e 100%)",
  },
  {
    type: "text" as const,
    emoji: "🏆",
    name: "Champion's Earnings",
    tagline: "Score big returns every single day",
    gradient: "linear-gradient(135deg, #0a1628 0%, #1a3a6e 100%)",
  },
];

function BannerSlider() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 3000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const slide = BANNER_SLIDES[active];

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl mx-4"
      style={{
        maxWidth: "calc(100% - 2rem)",
        background: slide.type === "image" ? "#0a1628" : slide.gradient,
        transition: "background 0.6s ease",
      }}
    >
      {slide.type === "image" ? (
        <img
          src="/assets/generated/fifa-banner.dim_800x300.jpg"
          alt="FIFA World Cup 2026"
          className="w-full object-cover rounded-2xl"
          style={{ height: "160px", display: "block" }}
        />
      ) : (
        <div className="px-5 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs mb-1 uppercase tracking-wider">
                FIFA World Cup Earn
              </p>
              <h3 className="text-white font-bold text-xl">{slide.name}</h3>
              <p className="text-white/80 text-sm mt-1">{slide.tagline}</p>
            </div>
            <div className="text-6xl">{slide.emoji}</div>
          </div>
        </div>
      )}
      <div
        className="flex gap-2 absolute bottom-2 left-5"
        style={{ pointerEvents: "auto" }}
      >
        {BANNER_SLIDES.map((s, i) => (
          <button
            key={s.type === "image" ? "dot-image" : s.name}
            type="button"
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-yellow-400" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { identity } = useInternetIdentity();
  const userId = identity?.getPrincipal().toString();
  const { data: profile } = useUserProfile();
  const { data: plans, isLoading: plansLoading } = useAllPlans();
  const { data: investments } = useUserInvestments(userId);
  const [investDialog, setInvestDialog] = useState<InvestmentPlan | null>(null);
  const [investAmount, setInvestAmount] = useState("");
  const createInvestment = useCreateInvestment();

  const activePlans = plans?.filter((p) => p.active) ?? [];
  const activeInvestments = investments?.filter((i) => i.active) ?? [];

  const handleInvest = async () => {
    if (!investDialog) return;
    const amt = Number.parseFloat(investAmount);
    if (Number.isNaN(amt) || amt <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    const result = await createInvestment.mutateAsync({
      planId: investDialog.id,
      amount: amt,
    });
    if (result === "ok") {
      toast.success("Investment created successfully!");
      setInvestDialog(null);
      setInvestAmount("");
    } else if (result === "insufficientBalance") {
      toast.error("Insufficient balance. Please recharge.");
    } else {
      toast.error("Plan not found.");
    }
  };

  return (
    <div className="pb-4">
      {/* Wallet Header */}
      <div
        className="px-5 pt-5 pb-6"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(59,130,246,0.3) 0%, transparent 70%), linear-gradient(135deg, #0a1628 0%, #1565c0 100%)",
        }}
      >
        <p className="text-white/80 text-sm mb-1">Welcome back 👋</p>
        <h2 className="text-white font-bold text-xl mb-4">
          {profile?.username ?? "Investor"}
        </h2>
        <div className="grid grid-cols-3 gap-2">
          <div
            className="bg-white/15 rounded-xl p-3 backdrop-blur-sm"
            style={{ boxShadow: "0 0 12px rgba(59,130,246,0.2)" }}
          >
            <p className="text-white/70 text-[10px] mb-0.5">Balance</p>
            <p className="text-white font-bold text-base">
              ₹{(profile?.walletBalance ?? 0).toFixed(0)}
            </p>
          </div>
          <div
            className="bg-white/15 rounded-xl p-3 backdrop-blur-sm"
            style={{ boxShadow: "0 0 12px rgba(59,130,246,0.2)" }}
          >
            <p className="text-white/70 text-[10px] mb-0.5">Recharged</p>
            <p className="text-white font-bold text-base">
              ₹{(profile?.totalRecharged ?? 0).toFixed(0)}
            </p>
          </div>
          <div
            className="bg-white/15 rounded-xl p-3 backdrop-blur-sm"
            style={{ boxShadow: "0 0 12px rgba(59,130,246,0.2)" }}
          >
            <p className="text-white/70 text-[10px] mb-0.5">Total Income</p>
            <p className="text-white font-bold text-base">
              ₹{(profile?.totalEarned ?? 0).toFixed(0)}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 -mt-3">
        <div className="bg-card rounded-2xl card-shadow p-3">
          <div className="grid grid-cols-4 gap-1">
            <ActionCard
              icon={<Wallet className="w-5 h-5" />}
              label="Recharge"
              onClick={() => onNavigate("recharge")}
              ocid="home.recharge.button"
            />
            <ActionCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="Withdraw"
              onClick={() => onNavigate("withdrawal")}
              ocid="home.withdraw.button"
            />
            <ActionCard
              icon={<Radio className="w-5 h-5" />}
              label="Channel"
              onClick={() => onNavigate("share")}
              ocid="home.channel.button"
            />
            <ActionCard
              icon={<Download className="w-5 h-5" />}
              label="Download"
              onClick={() => toast.info("Coming soon")}
              ocid="home.download.button"
            />
          </div>
        </div>
      </div>

      {/* Banner Slider */}
      <div className="mt-4 flex">
        <BannerSlider />
      </div>

      {/* Active Investments */}
      {activeInvestments.length > 0 && (
        <section className="px-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground">
              Active Investments
            </h3>
            <Badge variant="secondary">{activeInvestments.length}</Badge>
          </div>
          <div className="space-y-2">
            {activeInvestments.map((inv, i) => (
              <div
                key={`${inv.planId.toString()}-${inv.startTime.toString()}`}
                className="bg-card rounded-xl p-3 card-shadow flex items-center justify-between"
                data-ocid={`investments.item.${i + 1}`}
              >
                <div>
                  <p className="font-medium text-sm text-foreground">
                    Plan #{inv.planId.toString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Amount: ₹{inv.amount.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "#b8860b" }}
                  >
                    +₹{inv.dailyEarnings.toFixed(2)}/day
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Earned: ₹{inv.totalEarned.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Investment Plans */}
      <section className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Investment Plans</h3>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
        {plansLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((_i) => (
              <Skeleton key={_i} className="h-36 w-full rounded-2xl" />
            ))}
          </div>
        ) : activePlans.length === 0 ? (
          <div
            className="bg-card rounded-2xl p-8 card-shadow text-center"
            data-ocid="plans.empty_state"
          >
            <p className="text-muted-foreground">No plans available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activePlans.map((plan, i) => (
              <PlanCard
                key={plan.id.toString()}
                plan={plan}
                index={i + 1}
                onInvest={() => {
                  setInvestDialog(plan);
                  setInvestAmount(plan.price.toString());
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Invest Dialog */}
      <Dialog
        open={!!investDialog}
        onOpenChange={(o) => {
          if (!o) {
            setInvestDialog(null);
            setInvestAmount("");
          }
        }}
      >
        <DialogContent
          className="max-w-[380px] rounded-2xl mx-auto"
          data-ocid="invest.dialog"
        >
          <DialogHeader>
            <DialogTitle>Invest in {investDialog?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-secondary rounded-xl p-3">
              <p className="text-sm text-muted-foreground">
                Min Amount:{" "}
                <span className="font-semibold text-foreground">
                  ₹{investDialog?.price}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Daily Return:{" "}
                <span className="font-semibold" style={{ color: "#b8860b" }}>
                  {investDialog?.dailyReturn}%
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Duration:{" "}
                <span className="font-semibold text-foreground">
                  {investDialog?.durationDays?.toString()} days
                </span>
              </p>
            </div>
            <div>
              <Label>Investment Amount (₹)</Label>
              <Input
                type="number"
                value={investAmount}
                onChange={(e) => setInvestAmount(e.target.value)}
                placeholder="Enter amount"
                className="mt-1"
                data-ocid="invest.input"
              />
            </div>
            <Button
              onClick={handleInvest}
              className="w-full border-0 font-semibold"
              style={GOLD_BTN_STYLE}
              disabled={createInvestment.isPending}
              data-ocid="invest.submit_button"
            >
              {createInvestment.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              Confirm Investment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="text-center py-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          className="underline"
          style={{ color: "#b8860b" }}
          target="_blank"
          rel="noreferrer"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}

function ActionCard({
  icon,
  label,
  onClick,
  ocid,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  ocid: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 py-2 rounded-xl transition-colors"
      data-ocid={ocid}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(255,215,0,0.15)",
          border: "1px solid rgba(255,215,0,0.4)",
          boxShadow: "0 0 12px rgba(255,215,0,0.2)",
          color: "#FFD700",
        }}
      >
        {icon}
      </div>
      <span className="text-[11px] font-medium text-foreground">{label}</span>
    </button>
  );
}

function PlanCard({
  plan,
  index,
  onInvest,
}: { plan: InvestmentPlan; index: number; onInvest: () => void }) {
  const dailyRupees = (plan.price * plan.dailyReturn) / 100;
  const total = dailyRupees * Number(plan.durationDays);

  return (
    <div
      className="bg-card rounded-2xl card-shadow overflow-hidden"
      data-ocid={`plans.item.${index}`}
    >
      <div
        className="h-2"
        style={{
          background:
            "linear-gradient(90deg, #b8860b 0%, #FFD700 50%, #b8860b 100%)",
          boxShadow: "0 0 8px rgba(255,215,0,0.5)",
        }}
      />
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-bold text-foreground">{plan.name}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {plan.description}
            </p>
          </div>
          <Badge
            className="border-0 font-semibold"
            style={{
              background: "rgba(255,215,0,0.15)",
              color: "#b8860b",
              border: "1px solid rgba(255,215,0,0.3)",
            }}
          >
            {plan.dailyReturn}%/day
          </Badge>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground">Price</p>
            <p className="font-bold text-foreground text-sm">₹{plan.price}</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-[10px] text-muted-foreground">Daily</p>
            <p className="font-bold text-sm" style={{ color: "#b8860b" }}>
              ₹{dailyRupees.toFixed(0)}
            </p>
          </div>
          <div className="text-center border-r border-border">
            <p className="text-[10px] text-muted-foreground">Days</p>
            <p className="font-bold text-foreground text-sm">
              {plan.durationDays.toString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground">Total</p>
            <p className="font-bold text-sm" style={{ color: "#b8860b" }}>
              ₹{total.toFixed(0)}
            </p>
          </div>
        </div>
        <Button
          onClick={onInvest}
          className="w-full border-0 font-semibold h-9"
          style={GOLD_BTN_STYLE}
          data-ocid={`plans.invest.button.${index}`}
        >
          Purchase Now
        </Button>
      </div>
    </div>
  );
}
