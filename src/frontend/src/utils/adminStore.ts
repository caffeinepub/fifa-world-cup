// Local admin data store - manages recharges, withdrawals, and users from localStorage

export interface LocalRecharge {
  id: string;
  phone: string;
  amount: number;
  paymentRef: string;
  status: "pending" | "completed" | "failed";
  timestamp: number;
}

export interface LocalWithdrawal {
  id: string;
  phone: string;
  amount: number;
  paymentDetails: string;
  status: "pending" | "approved" | "rejected";
  timestamp: number;
}

export interface LocalUser {
  phone: string;
  referral: string;
  balance: number;
  earnings: number;
  totalRecharged: number;
  totalWithdrawn: number;
}

const RECHARGE_KEY = "pb_recharges";
const WITHDRAWAL_KEY = "pb_withdrawals";

function generateId(): string {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function getAllRecharges(): LocalRecharge[] {
  try {
    const raw = localStorage.getItem(RECHARGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAllRecharges(recharges: LocalRecharge[]): void {
  localStorage.setItem(RECHARGE_KEY, JSON.stringify(recharges));
}

export function addRecharge(
  phone: string,
  amount: number,
  paymentRef: string,
): LocalRecharge {
  const recharges = getAllRecharges();
  const r: LocalRecharge = {
    id: generateId(),
    phone,
    amount,
    paymentRef,
    status: "pending",
    timestamp: Date.now(),
  };
  recharges.push(r);
  saveAllRecharges(recharges);
  return r;
}

export function getUserRecharges(phone: string): LocalRecharge[] {
  return getAllRecharges()
    .filter((r) => r.phone === phone)
    .sort((a, b) => b.timestamp - a.timestamp);
}

export function approveRechargeLocal(id: string): void {
  const recharges = getAllRecharges();
  const idx = recharges.findIndex((r) => r.id === id);
  if (idx === -1) return;
  const r = recharges[idx];
  if (r.status !== "pending") return;
  recharges[idx] = { ...r, status: "completed" };
  saveAllRecharges(recharges);
  const wallet = getLocalWallet(r.phone);
  wallet.balance += r.amount;
  wallet.totalRecharged = (wallet.totalRecharged ?? 0) + r.amount;
  setLocalWallet(r.phone, wallet);
}

export function rejectRechargeLocal(id: string): void {
  const recharges = getAllRecharges();
  const idx = recharges.findIndex((r) => r.id === id);
  if (idx === -1) return;
  recharges[idx] = { ...recharges[idx], status: "failed" };
  saveAllRecharges(recharges);
}

export function getAllWithdrawals(): LocalWithdrawal[] {
  try {
    const raw = localStorage.getItem(WITHDRAWAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAllWithdrawals(withdrawals: LocalWithdrawal[]): void {
  localStorage.setItem(WITHDRAWAL_KEY, JSON.stringify(withdrawals));
}

export function addWithdrawal(
  phone: string,
  amount: number,
  paymentDetails: string,
): LocalWithdrawal | { error: string } {
  const wallet = getLocalWallet(phone);
  if (wallet.balance < amount) {
    return { error: "Insufficient balance" };
  }
  wallet.balance -= amount;
  setLocalWallet(phone, wallet);
  const withdrawals = getAllWithdrawals();
  const w: LocalWithdrawal = {
    id: generateId(),
    phone,
    amount,
    paymentDetails,
    status: "pending",
    timestamp: Date.now(),
  };
  withdrawals.push(w);
  saveAllWithdrawals(withdrawals);
  return w;
}

export function getUserWithdrawals(phone: string): LocalWithdrawal[] {
  return getAllWithdrawals()
    .filter((w) => w.phone === phone)
    .sort((a, b) => b.timestamp - a.timestamp);
}

export function approveWithdrawalLocal(id: string): void {
  const withdrawals = getAllWithdrawals();
  const idx = withdrawals.findIndex((w) => w.id === id);
  if (idx === -1) return;
  const w = withdrawals[idx];
  if (w.status !== "pending") return;
  withdrawals[idx] = { ...w, status: "approved" };
  saveAllWithdrawals(withdrawals);
  const wallet = getLocalWallet(w.phone);
  wallet.totalWithdrawn = (wallet.totalWithdrawn ?? 0) + w.amount;
  setLocalWallet(w.phone, wallet);
}

export function rejectWithdrawalLocal(id: string): void {
  const withdrawals = getAllWithdrawals();
  const idx = withdrawals.findIndex((w) => w.id === id);
  if (idx === -1) return;
  const w = withdrawals[idx];
  if (w.status !== "pending") return;
  withdrawals[idx] = { ...w, status: "rejected" };
  saveAllWithdrawals(withdrawals);
  const wallet = getLocalWallet(w.phone);
  wallet.balance += w.amount;
  setLocalWallet(w.phone, wallet);
}

export interface LocalWallet {
  balance: number;
  earnings: number;
  totalRecharged?: number;
  totalWithdrawn?: number;
}

function walletKey(phone: string): string {
  return `pb_wallet_${phone}`;
}

export function getLocalWallet(phone: string): LocalWallet {
  try {
    const raw = localStorage.getItem(walletKey(phone));
    return raw ? JSON.parse(raw) : { balance: 0, earnings: 0 };
  } catch {
    return { balance: 0, earnings: 0 };
  }
}

export function setLocalWallet(phone: string, wallet: LocalWallet): void {
  localStorage.setItem(walletKey(phone), JSON.stringify(wallet));
}

export function getAllLocalUsers(): LocalUser[] {
  try {
    const raw = localStorage.getItem("pb_accounts");
    if (!raw) return [];
    const accounts: Record<
      string,
      { pwdHash: string; withdrawalPwd: string; referral: string }
    > = JSON.parse(raw);
    return Object.entries(accounts).map(([phone, acc]) => {
      const wallet = getLocalWallet(phone);
      return {
        phone,
        referral: acc.referral || "",
        balance: wallet.balance,
        earnings: wallet.earnings,
        totalRecharged: wallet.totalRecharged ?? 0,
        totalWithdrawn: wallet.totalWithdrawn ?? 0,
      };
    });
  } catch {
    return [];
  }
}

export function updateUserBalance(phone: string, newBalance: number): void {
  const wallet = getLocalWallet(phone);
  wallet.balance = newBalance;
  setLocalWallet(phone, wallet);
}

export function deleteUser(phone: string): void {
  try {
    const raw = localStorage.getItem("pb_accounts");
    if (!raw) return;
    const accounts = JSON.parse(raw);
    delete accounts[phone];
    localStorage.setItem("pb_accounts", JSON.stringify(accounts));
    localStorage.removeItem(walletKey(phone));
  } catch {}
}
