import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Loader2 } from "lucide-react";
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

function calcDailyIncome(price: number, dailyReturnPct: number): number {
  return (price * dailyReturnPct) / 100;
}

function calcTotalReturn(
  price: number,
  dailyReturnPct: number,
  durationDays: number,
): number {
  return calcDailyIncome(price, dailyReturnPct) * durationDays;
}

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

type ModalState =
  | { type: "none" }
  | { type: "insufficient"; plan: InvestmentPlan }
  | { type: "confirm"; plan: InvestmentPlan };

export default function HomePage({ onNavigate }: HomePageProps) {
  const { identity } = useInternetIdentity();
  const userId = identity?.getPrincipal().toString();
  const { data: profile } = useUserProfile();
  const { data: plans, isLoading: plansLoading } = useAllPlans();
  const { data: investments } = useUserInvestments(userId);
  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const createInvestment = useCreateInvestment();

  const activePlans = plans?.filter((p) => p.active) ?? [];
  const activeInvestments = investments?.filter((i) => i.active) ?? [];

  const handlePurchaseClick = (plan: InvestmentPlan) => {
    const balance = profile?.walletBalance ?? 0;
    if (balance < plan.price) {
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
      amount: plan.price,
    });
    if (result === "ok") {
      toast.success("Investment created successfully!");
      setModal({ type: "none" });
    } else if (result === "insufficientBalance") {
      setModal({ type: "insufficient", plan });
    } else {
      toast.error("Plan not found.");
      setModal({ type: "none" });
    }
  };

  const currentPlan =
    modal.type === "insufficient" || modal.type === "confirm"
      ? modal.plan
      : null;
  const dailyRupees = currentPlan
    ? calcDailyIncome(currentPlan.price, currentPlan.dailyReturn)
    : 0;
  const totalReturn = currentPlan
    ? calcTotalReturn(
        currentPlan.price,
        currentPlan.dailyReturn,
        Number(currentPlan.durationDays),
      )
    : 0;

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
        <div className="grid grid-cols-2 gap-2">
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
              icon={
                <span className="material-icons text-xl">
                  account_balance_wallet
                </span>
              }
              label="Recharge"
              onClick={() => onNavigate("recharge")}
              ocid="home.recharge.button"
            />
            <ActionCard
              icon={<span className="material-icons text-xl">trending_up</span>}
              label="Withdraw"
              onClick={() => onNavigate("withdrawal")}
              ocid="home.withdraw.button"
            />
            <ActionCard
              icon={<span className="material-icons text-xl">share</span>}
              label="Channel"
              onClick={() => onNavigate("share")}
              ocid="home.channel.button"
            />
            <ActionCard
              icon={<span className="material-icons text-xl">download</span>}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3].map((_i) => (
              <Skeleton key={_i} className="h-44 w-full rounded-2xl" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activePlans.map((plan, i) => (
              <PlanCard
                key={plan.id.toString()}
                plan={plan}
                index={i + 1}
                onInvest={() => handlePurchaseClick(plan)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Insufficient Balance Modal */}
      <Dialog
        open={modal.type === "insufficient"}
        onOpenChange={(o) => {
          if (!o) setModal({ type: "none" });
        }}
      >
        <DialogContent
          className="max-w-[380px] rounded-2xl mx-auto"
          data-ocid="insufficient.dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-red-600">
              Insufficient Balance
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div
              className="rounded-xl p-4"
              style={{
                background: "rgba(220,38,38,0.08)",
                border: "1px solid rgba(220,38,38,0.2)",
              }}
            >
              <p className="text-sm text-foreground leading-relaxed">
                Your current balance is{" "}
                <span className="font-bold" style={{ color: "#b8860b" }}>
                  ₹{(profile?.walletBalance ?? 0).toFixed(0)}
                </span>
                . You need{" "}
                <span className="font-bold text-red-600">
                  ₹{currentPlan?.price}
                </span>{" "}
                to purchase this plan. Please recharge your wallet first.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setModal({ type: "none" })}
                data-ocid="insufficient.cancel_button"
              >
                Cancel
              </Button>
              <Button
                className="flex-1 border-0 font-semibold"
                style={GOLD_BTN_STYLE}
                onClick={() => {
                  setModal({ type: "none" });
                  onNavigate("recharge");
                }}
                data-ocid="insufficient.recharge.button"
              >
                Recharge Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm Purchase Modal */}
      <Dialog
        open={modal.type === "confirm"}
        onOpenChange={(o) => {
          if (!o) setModal({ type: "none" });
        }}
      >
        <DialogContent
          className="max-w-[380px] rounded-2xl mx-auto"
          data-ocid="confirm.dialog"
        >
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
          </DialogHeader>
          {currentPlan && (
            <div className="space-y-4">
              <div className="bg-secondary rounded-xl p-4 space-y-2">
                <p className="font-bold text-foreground text-base">
                  {currentPlan.name}
                </p>
                <div className="grid grid-cols-2 gap-y-1 text-sm">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-semibold text-foreground">
                    ₹{currentPlan.price}
                  </span>
                  <span className="text-muted-foreground">Daily Earning:</span>
                  <span className="font-semibold" style={{ color: "#b8860b" }}>
                    ₹{dailyRupees.toFixed(0)}/day
                  </span>
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-semibold text-foreground">
                    {currentPlan.durationDays.toString()} days
                  </span>
                </div>
                <div
                  className="rounded-lg p-3 mt-2"
                  style={{
                    background: "rgba(255,215,0,0.1)",
                    border: "1px solid rgba(255,215,0,0.3)",
                  }}
                >
                  <p className="text-xs text-muted-foreground mb-1">
                    Total Return
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    ₹{dailyRupees.toFixed(0)} ×{" "}
                    {currentPlan.durationDays.toString()} days ={" "}
                    <span
                      className="font-bold text-base"
                      style={{ color: "#b8860b" }}
                    >
                      ₹{totalReturn.toFixed(0)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setModal({ type: "none" })}
                  disabled={createInvestment.isPending}
                  data-ocid="confirm.cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 border-0 font-semibold"
                  style={GOLD_BTN_STYLE}
                  onClick={handleConfirmPurchase}
                  disabled={createInvestment.isPending}
                  data-ocid="confirm.confirm_button"
                >
                  {createInvestment.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  Confirm
                </Button>
              </div>
            </div>
          )}
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
  const dailyRupees = calcDailyIncome(plan.price, plan.dailyReturn);
  const total = calcTotalReturn(
    plan.price,
    plan.dailyReturn,
    Number(plan.durationDays),
  );

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
          <span className="material-icons text-base mr-1">shopping_cart</span>
          Purchase Now
        </Button>
      </div>
    </div>
  );
}
