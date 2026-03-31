import { AnimatePresence, motion } from "motion/react";

interface WelcomePopupProps {
  onClose: () => void;
}

const STARS = ["s1", "s2", "s3", "s4", "s5"];

export default function WelcomePopup({ onClose }: WelcomePopupProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        data-ocid="welcome.modal"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal card */}
        <motion.div
          className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background:
              "linear-gradient(160deg, #0a1628 0%, #1a3a6b 60%, #0d2244 100%)",
            border: "1px solid rgba(59,130,246,0.4)",
          }}
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Blue top border accent */}
          <div
            className="h-1 w-full"
            style={{
              background: "linear-gradient(90deg, #1d4ed8, #3b82f6, #1d4ed8)",
            }}
          />

          <div className="px-6 py-8 text-center">
            {/* Trophy icon */}
            <div className="text-6xl mb-4">🏆</div>

            {/* Star decoration */}
            <div className="flex justify-center gap-1 mb-4">
              {STARS.map((key) => (
                <span key={key} className="text-blue-400 text-sm">
                  ⭐
                </span>
              ))}
            </div>

            {/* Title */}
            <h1
              className="text-2xl font-black text-white mb-2 tracking-wide uppercase"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
            >
              Welcome to
            </h1>
            <h2
              className="text-3xl font-black mb-1 uppercase tracking-wider"
              style={{
                background: "linear-gradient(90deg, #1d4ed8, #60a5fa, #1d4ed8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              FIFA World Cup
            </h2>

            {/* Divider */}
            <div
              className="w-16 h-0.5 mx-auto my-4"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #3b82f6, transparent)",
              }}
            />

            {/* Subtitle */}
            <p className="text-blue-200 text-sm leading-relaxed mb-8">
              Invest &amp; Earn with the World&apos;s Biggest Football
              Tournament
            </p>

            {/* Football emoji row */}
            <div className="flex justify-center gap-3 mb-6 text-2xl">
              <span>⚽</span>
              <span>🌍</span>
              <span>⚽</span>
            </div>

            {/* CTA button */}
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 rounded-full font-bold text-white text-base uppercase tracking-widest transition-all duration-200 active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, #1565c0 0%, #1976d2 50%, #42a5f5 100%)",
              }}
              data-ocid="welcome.primary_button"
            >
              Get Started 🚀
            </button>
          </div>

          {/* Blue bottom border accent */}
          <div
            className="h-1 w-full"
            style={{
              background: "linear-gradient(90deg, #1d4ed8, #3b82f6, #1d4ed8)",
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
