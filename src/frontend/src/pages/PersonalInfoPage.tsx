import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  Lock,
  ShieldCheck,
} from "lucide-react";
import type { Page } from "../App";

interface PersonalInfoPageProps {
  onNavigate: (page: Page) => void;
  onBack: () => void;
}

export default function PersonalInfoPage({
  onNavigate,
  onBack,
}: PersonalInfoPageProps) {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Blue Header */}
      <div className="bg-blue-700 flex items-center gap-3 px-4 py-3 text-white">
        <button
          type="button"
          onClick={onBack}
          data-ocid="personal-info.back.button"
          className="p-1"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="font-semibold text-base">Personal Information</h2>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 px-5 py-8 flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl">
          🏆
        </div>
        <p className="text-white font-bold text-lg tracking-wide">
          FIFA World Cup 2026
        </p>
        <p className="text-white/70 text-xs text-center">
          Manage your account settings below
        </p>
      </div>

      <div className="px-4 pt-5">
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-2 px-1">
          Account Settings
        </p>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <SettingsRow
            icon={<CreditCard className="w-5 h-5 text-purple-500" />}
            iconBg="bg-purple-100"
            label="Bind Bank Card"
            subtitle="Link your bank account for withdrawals"
            onClick={() => onNavigate("bank")}
            ocid="personal-info.bank.button"
          />
          <div className="h-px bg-gray-100 mx-4" />
          <SettingsRow
            icon={<Lock className="w-5 h-5 text-green-500" />}
            iconBg="bg-green-100"
            label="Change Password"
            subtitle="Update your login password"
            onClick={() => onNavigate("change-password")}
            ocid="personal-info.change-password.button"
          />
          <div className="h-px bg-gray-100 mx-4" />
          <SettingsRow
            icon={<ShieldCheck className="w-5 h-5 text-teal-500" />}
            iconBg="bg-teal-100"
            label="Withdrawal Password"
            subtitle="Change your withdrawal PIN"
            onClick={() => onNavigate("withdrawal-password")}
            ocid="personal-info.withdrawal-password.button"
          />
        </div>
      </div>
    </div>
  );
}

function SettingsRow({
  icon,
  iconBg,
  label,
  subtitle,
  onClick,
  ocid,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  subtitle: string;
  onClick: () => void;
  ocid: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors"
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} shrink-0`}
      >
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </button>
  );
}
