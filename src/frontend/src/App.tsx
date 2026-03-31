import { Toaster } from "@/components/ui/sonner";
import { Suspense, lazy, useEffect, useState } from "react";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import TelegramPopup from "./components/TelegramPopup";
import WelcomePopup from "./components/WelcomePopup";
import { useUserProfile } from "./hooks/useQueries";

const AccountPage = lazy(() => import("./pages/AccountPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const BankBindingPage = lazy(() => import("./pages/BankBindingPage"));
const ChangePasswordPage = lazy(() => import("./pages/ChangePasswordPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PersonalInfoPage = lazy(() => import("./pages/PersonalInfoPage"));
const RechargePage = lazy(() => import("./pages/RechargePage"));
const SharePage = lazy(() => import("./pages/SharePage"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const WithdrawalPage = lazy(() => import("./pages/WithdrawalPage"));
const WithdrawalPasswordPage = lazy(
  () => import("./pages/WithdrawalPasswordPage"),
);

export type Page =
  | "home"
  | "team"
  | "share"
  | "account"
  | "recharge"
  | "withdrawal"
  | "admin"
  | "bank"
  | "personal-info"
  | "change-password"
  | "withdrawal-password";

const PageLoader = () => (
  <div className="flex items-center justify-center h-40">
    <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Persist admin access at module level
const adminParam = new URLSearchParams(window.location.search).get("admin");
if (adminParam === "Aliraza5234") {
  sessionStorage.setItem("adminAccess", "1");
}
const isAdminSession = sessionStorage.getItem("adminAccess") === "1";
const alreadyLoggedIn =
  !!localStorage.getItem("pb_current_phone") ||
  !!localStorage.getItem("pb_phone");

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => alreadyLoggedIn);
  const { data: _userProfile } = useUserProfile();
  const [currentPage, setCurrentPage] = useState<Page>(
    isAdminSession && alreadyLoggedIn ? "admin" : "home",
  );
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTelegram, setShowTelegram] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) sessionStorage.setItem("referralCode", ref);
  }, []);

  useEffect(() => {
    if (isLoggedIn && !sessionStorage.getItem("welcomeShown")) {
      setShowWelcome(true);
      sessionStorage.setItem("welcomeShown", "1");
    } else if (isLoggedIn && !sessionStorage.getItem("telegramShown")) {
      setShowTelegram(true);
    }
  }, [isLoggedIn]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    if (!sessionStorage.getItem("telegramShown")) {
      setTimeout(() => setShowTelegram(true), 400);
    }
  };

  const handleCloseTelegram = () => {
    sessionStorage.setItem("telegramShown", "1");
    setShowTelegram(false);
  };

  if (!isLoggedIn) {
    return (
      <>
        <Suspense fallback={<PageLoader />}>
          <AuthPage
            view={authView}
            onSwitchView={setAuthView}
            onLogin={(_phone: string) => {
              setIsLoggedIn(true);
              if (isAdminSession) setCurrentPage("admin");
            }}
          />
        </Suspense>
        <Toaster position="top-center" />
      </>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "team":
        return <TeamPage />;
      case "share":
        return <SharePage />;
      case "account":
        return (
          <AccountPage
            onNavigate={setCurrentPage}
            onLogout={() => {
              localStorage.removeItem("pb_current_phone");
              localStorage.removeItem("pb_phone");
              localStorage.removeItem("pb_pwd_hash");
              setIsLoggedIn(false);
            }}
          />
        );
      case "recharge":
        return <RechargePage onBack={() => setCurrentPage("home")} />;
      case "withdrawal":
        return <WithdrawalPage onBack={() => setCurrentPage("account")} />;
      case "admin":
        return <AdminPage onBack={() => setCurrentPage("home")} />;
      case "bank":
        return <BankBindingPage onBack={() => setCurrentPage("account")} />;
      case "personal-info":
        return (
          <PersonalInfoPage
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage("account")}
          />
        );
      case "change-password":
        return (
          <ChangePasswordPage onBack={() => setCurrentPage("personal-info")} />
        );
      case "withdrawal-password":
        return (
          <WithdrawalPasswordPage
            onBack={() => setCurrentPage("personal-info")}
          />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  const showBottomNav = ["home", "team", "share", "account"].includes(
    currentPage,
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[480px] mx-auto min-h-screen relative pb-20">
        <Header />
        <main>
          <Suspense fallback={<PageLoader />}>{renderPage()}</Suspense>
        </main>
        {showBottomNav && (
          <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
        )}
      </div>

      {/* Floating admin shortcut - one tap from anywhere */}
      {isAdminSession && currentPage !== "admin" && (
        <button
          type="button"
          onClick={() => setCurrentPage("admin")}
          style={{
            position: "fixed",
            bottom: 88,
            right: 16,
            zIndex: 9999,
            background: "linear-gradient(135deg, #1565c0 0%, #3b82f6 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: 50,
            padding: "10px 16px",
            fontWeight: 700,
            fontSize: 13,
            boxShadow: "0 4px 16px rgba(59,130,246,0.5)",
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
          }}
        >
          <span className="material-icons" style={{ fontSize: 18 }}>
            shield
          </span>
          Admin
        </button>
      )}

      <Toaster position="top-center" />
      {showWelcome && <WelcomePopup onClose={handleCloseWelcome} />}
      {showTelegram && !showWelcome && (
        <TelegramPopup onClose={handleCloseTelegram} />
      )}
    </div>
  );
}
