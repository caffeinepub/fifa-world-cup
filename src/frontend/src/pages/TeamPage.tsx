import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useReferralTree, useUserProfile } from "../hooks/useQueries";

const COMMISSION_LEVELS = [
  { level: 1, pct: 15, color: "border-emerald-500", bg: "bg-emerald-900/30" },
  { level: 2, pct: 2, color: "border-blue-500", bg: "bg-blue-900/30" },
  { level: 3, pct: 1, color: "border-purple-500", bg: "bg-purple-900/30" },
];

export default function TeamPage() {
  const { identity } = useInternetIdentity();
  const userId = identity?.getPrincipal().toString();
  const { data: profile } = useUserProfile();
  const { data: tree, isLoading } = useReferralTree(userId);
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);

  const levels = {
    1: tree?.level1 ?? [],
    2: tree?.level2 ?? [],
    3: tree?.level3 ?? [],
  };
  const totalTeam = levels[1].length + levels[2].length + levels[3].length;
  const currentMembers = levels[activeLevel];

  return (
    <div className="pb-4">
      {/* Header Stats */}
      <div className="green-gradient px-5 pt-5 pb-8">
        <h2 className="text-white font-bold text-lg mb-1">My Team</h2>
        <p className="text-white/80 text-sm mb-4">
          Referral commission up to 18%
        </p>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/15 rounded-xl p-3 backdrop-blur-sm">
            <p className="text-white/70 text-xs mb-1">Team Size</p>
            <p className="text-white font-bold text-2xl">{totalTeam}</p>
          </div>
          <div className="bg-white/15 rounded-xl p-3 backdrop-blur-sm">
            <p className="text-white/70 text-xs mb-1">Referral Code</p>
            <p className="text-white font-bold text-base tracking-widest">
              {profile?.referralCode ?? "---"}
            </p>
          </div>
          <div className="bg-white/15 rounded-xl p-3 backdrop-blur-sm">
            <p className="text-white/70 text-xs mb-1">Team Recharge</p>
            <p className="text-white font-bold text-2xl">₹0</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-4">
        {/* Commission Breakdown */}
        <div className="bg-card rounded-2xl card-shadow p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">
              Commission Structure
            </h3>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
              Up to 18%
            </span>
          </div>
          <div className="space-y-2">
            {COMMISSION_LEVELS.map((c) => (
              <div
                key={c.level}
                className={`flex items-center justify-between p-3 rounded-xl border-l-4 ${c.color} ${c.bg}`}
                data-ocid={`team.commission.item.${c.level}`}
              >
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    Level {c.level}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Referral Commission
                  </p>
                </div>
                <span className="text-2xl font-bold text-primary">
                  {c.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Level Tabs */}
        <div className="bg-card rounded-2xl card-shadow overflow-hidden">
          <div className="flex border-b border-border">
            {([1, 2, 3] as const).map((lv) => (
              <button
                type="button"
                key={lv}
                onClick={() => setActiveLevel(lv)}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                  activeLevel === lv
                    ? "text-primary border-b-2 border-primary bg-secondary/50"
                    : "text-muted-foreground"
                }`}
                data-ocid="team.level.tab"
              >
                LV:{lv}{" "}
                <span className="text-xs font-normal">
                  ({levels[lv].length})
                </span>
              </button>
            ))}
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-secondary rounded-xl p-3">
                <p className="text-xs text-muted-foreground">Team Size</p>
                <p className="font-bold text-foreground text-xl">
                  {currentMembers.length}
                </p>
              </div>
              <div className="bg-secondary rounded-xl p-3">
                <p className="text-xs text-muted-foreground">
                  Level {activeLevel}
                </p>
                <p className="font-bold text-primary text-xl">
                  {currentMembers.length} members
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-xl" />
                ))}
              </div>
            ) : currentMembers.length === 0 ? (
              <div className="text-center py-8" data-ocid="team.empty_state">
                <Users className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">
                  No members at Level {activeLevel} yet
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Invite friends to grow your team!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {currentMembers.map((member, i) => (
                  <div
                    key={member.toString()}
                    className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                    data-ocid={`team.item.${i + 1}`}
                  >
                    <div className="w-8 h-8 rounded-full green-gradient flex items-center justify-center text-white text-xs font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Member {i + 1}
                      </p>
                      <p className="text-xs text-muted-foreground truncate max-w-[220px]">
                        {member.toString().slice(0, 20)}...
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-xs bg-secondary text-primary px-2 py-0.5 rounded-full">
                        LV:{activeLevel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
