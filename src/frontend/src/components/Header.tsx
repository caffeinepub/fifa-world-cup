import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between"
      style={{
        background: "linear-gradient(135deg, #0a1628 0%, #1565c0 100%)",
        borderBottom: "2px solid #FFD700",
        boxShadow:
          "0 0 12px rgba(255,215,0,0.5), 0 2px 20px rgba(59,130,246,0.4)",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="text-2xl"
          style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.6))" }}
        >
          ⚽
        </span>
        <span
          className="neon-text-gold font-extrabold text-lg tracking-widest uppercase"
          style={{ color: "#FFD700" }}
        >
          FIFA WORLD CUP 2026
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:text-yellow-300 hover:bg-white/10"
        data-ocid="header.button"
      >
        <Bell className="w-5 h-5" />
      </Button>
    </header>
  );
}
