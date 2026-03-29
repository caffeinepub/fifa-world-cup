import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { useEffect } from "react";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import WelcomePopup from "./components/WelcomePopup";
import { useUserProfile } from "./hooks/useQueries";
import AccountPage from "./pages/AccountPage";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import BankBindingPage from "./pages/BankBindingPage";
import HomePage from "./pages/HomePage";
import RechargePage from "./pages/RechargePage";
import SharePage from "./pages/SharePage";
import TeamPage from "./pages/TeamPage";
import WithdrawalPage from "./pages/WithdrawalPage";

export type Page =
  | "home"
  | "team"
  | "share"
  | "account"
  | "recharge"
  | "withdrawal"
  | "admin"
  | "bank";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () =>
      !!localStorage.getItem("pb_current_phone") ||
      !!localStorage.getItem("pb_phone"),
  );
  const { data: _userProfile } = useUserProfile();
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      sessionStorage.setItem("referralCode", ref);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && !sessionStorage.getItem("welcomeShown")) {
      setShowWelcome(true);
      sessionStorage.setItem("welcomeShown", "1");
    }
  }, [isLoggedIn]);

  const handleCloseWelcome = () => setShowWelcome(false);

  if (!isLoggedIn) {
    return (
      <>
        <AuthPage
          view={authView}
          onSwitchView={setAuthView}
          onLogin={(_phone: string) => setIsLoggedIn(true)}
        />
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
              // legacy cleanup
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
        return <AdminPage onBack={() => setCurrentPage("account")} />;
      case "bank":
        return <BankBindingPage onBack={() => setCurrentPage("account")} />;
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
        <main>{renderPage()}</main>
        {showBottomNav && (
          <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
        )}
      </div>
      <Toaster position="top-center" />
      {showWelcome && <WelcomePopup onClose={handleCloseWelcome} />}
    </div>
  );
}
