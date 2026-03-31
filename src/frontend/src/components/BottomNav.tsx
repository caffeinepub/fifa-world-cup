import { Home, Plus, Share2, User, Users } from "lucide-react";
import type { Page } from "../App";

interface BottomNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems = [
  { id: "home" as Page, label: "Home", icon: Home },
  { id: "team" as Page, label: "Team", icon: Users },
  { id: "share" as Page, label: "Share", icon: Share2 },
  { id: "account" as Page, label: "My", icon: User },
];

export default function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 bg-card bottom-safe"
      style={{
        borderTop: "1px solid #e2e8f0",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.12), 0 -1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-end justify-around px-2 py-2 relative">
        {navItems.slice(0, 2).map((item) => (
          <NavButton
            key={item.id}
            item={item}
            active={currentPage === item.id}
            onNavigate={onNavigate}
          />
        ))}

        {/* Central Deposit Button */}
        <div className="flex flex-col items-center flex-shrink-0">
          <button
            type="button"
            onClick={() => onNavigate("recharge")}
            className="-mt-6 w-14 h-14 rounded-full flex items-center justify-center border-4 border-white"
            style={{
              background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
              boxShadow: "0 4px 16px rgba(59,130,246,0.5)",
            }}
            data-ocid="nav.deposit.button"
          >
            <Plus className="w-6 h-6 text-white" strokeWidth={3} />
          </button>
          <span
            className="text-[11px] font-medium mt-0.5"
            style={{ color: "#94a3b8" }}
          >
            Deposit
          </span>
        </div>

        {navItems.slice(2).map((item) => (
          <NavButton
            key={item.id}
            item={item}
            active={currentPage === item.id}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </nav>
  );
}

function NavButton({
  item,
  active,
  onNavigate,
}: {
  item: (typeof navItems)[0];
  active: boolean;
  onNavigate: (page: Page) => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={() => onNavigate(item.id)}
      className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-colors ${
        active ? "" : "text-slate-400"
      }`}
      style={active ? { color: "#3b82f6" } : undefined}
      data-ocid={`nav.${item.id}.link`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-[11px] font-medium">{item.label}</span>
      {active && (
        <div
          className="w-4 h-0.5 rounded-full mt-0.5"
          style={{ background: "#3b82f6" }}
        />
      )}
    </button>
  );
}
