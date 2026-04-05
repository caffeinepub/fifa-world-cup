const RECHARGE_KEY = "pb_recharges";
const WITHDRAWAL_KEY = "pb_withdrawals";
function generateId() {
  return `${Date.now()}-${Math.floor(Math.random() * 1e4)}`;
}
function getAllRecharges() {
  try {
    const raw = localStorage.getItem(RECHARGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveAllRecharges(recharges) {
  localStorage.setItem(RECHARGE_KEY, JSON.stringify(recharges));
}
function addRecharge(phone, amount, paymentRef) {
  const recharges = getAllRecharges();
  const r = {
    id: generateId(),
    phone,
    amount,
    paymentRef,
    status: "pending",
    timestamp: Date.now()
  };
  recharges.push(r);
  saveAllRecharges(recharges);
  return r;
}
function getUserRecharges(phone) {
  return getAllRecharges().filter((r) => r.phone === phone).sort((a, b) => b.timestamp - a.timestamp);
}
function approveRechargeLocal(id) {
  const recharges = getAllRecharges();
  const idx = recharges.findIndex((r2) => r2.id === id);
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
function rejectRechargeLocal(id) {
  const recharges = getAllRecharges();
  const idx = recharges.findIndex((r) => r.id === id);
  if (idx === -1) return;
  recharges[idx] = { ...recharges[idx], status: "failed" };
  saveAllRecharges(recharges);
}
function getAllWithdrawals() {
  try {
    const raw = localStorage.getItem(WITHDRAWAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveAllWithdrawals(withdrawals) {
  localStorage.setItem(WITHDRAWAL_KEY, JSON.stringify(withdrawals));
}
function addWithdrawal(phone, amount, paymentDetails) {
  const wallet = getLocalWallet(phone);
  if (wallet.balance < amount) {
    return { error: "Insufficient balance" };
  }
  wallet.balance -= amount;
  setLocalWallet(phone, wallet);
  const withdrawals = getAllWithdrawals();
  const w = {
    id: generateId(),
    phone,
    amount,
    paymentDetails,
    status: "pending",
    timestamp: Date.now()
  };
  withdrawals.push(w);
  saveAllWithdrawals(withdrawals);
  return w;
}
function getUserWithdrawals(phone) {
  return getAllWithdrawals().filter((w) => w.phone === phone).sort((a, b) => b.timestamp - a.timestamp);
}
function approveWithdrawalLocal(id) {
  const withdrawals = getAllWithdrawals();
  const idx = withdrawals.findIndex((w2) => w2.id === id);
  if (idx === -1) return;
  const w = withdrawals[idx];
  if (w.status !== "pending") return;
  withdrawals[idx] = { ...w, status: "approved" };
  saveAllWithdrawals(withdrawals);
  const wallet = getLocalWallet(w.phone);
  wallet.totalWithdrawn = (wallet.totalWithdrawn ?? 0) + w.amount;
  setLocalWallet(w.phone, wallet);
}
function rejectWithdrawalLocal(id) {
  const withdrawals = getAllWithdrawals();
  const idx = withdrawals.findIndex((w2) => w2.id === id);
  if (idx === -1) return;
  const w = withdrawals[idx];
  if (w.status !== "pending") return;
  withdrawals[idx] = { ...w, status: "rejected" };
  saveAllWithdrawals(withdrawals);
  const wallet = getLocalWallet(w.phone);
  wallet.balance += w.amount;
  setLocalWallet(w.phone, wallet);
}
function walletKey(phone) {
  return `pb_wallet_${phone}`;
}
function getLocalWallet(phone) {
  try {
    const raw = localStorage.getItem(walletKey(phone));
    return raw ? JSON.parse(raw) : { balance: 0, earnings: 0 };
  } catch {
    return { balance: 0, earnings: 0 };
  }
}
function setLocalWallet(phone, wallet) {
  localStorage.setItem(walletKey(phone), JSON.stringify(wallet));
}
function getAllLocalUsers() {
  try {
    const raw = localStorage.getItem("pb_accounts");
    if (!raw) return [];
    const accounts = JSON.parse(raw);
    return Object.entries(accounts).map(([phone, acc]) => {
      const wallet = getLocalWallet(phone);
      return {
        phone,
        referral: acc.referral || "",
        balance: wallet.balance,
        earnings: wallet.earnings,
        totalRecharged: wallet.totalRecharged ?? 0,
        totalWithdrawn: wallet.totalWithdrawn ?? 0
      };
    });
  } catch {
    return [];
  }
}
function updateUserBalance(phone, newBalance) {
  const wallet = getLocalWallet(phone);
  wallet.balance = newBalance;
  setLocalWallet(phone, wallet);
}
function deleteUser(phone) {
  try {
    const raw = localStorage.getItem("pb_accounts");
    if (!raw) return;
    const accounts = JSON.parse(raw);
    delete accounts[phone];
    localStorage.setItem("pb_accounts", JSON.stringify(accounts));
    localStorage.removeItem(walletKey(phone));
  } catch {
  }
}
export {
  addRecharge as a,
  getLocalWallet as b,
  getUserWithdrawals as c,
  addWithdrawal as d,
  getAllRecharges as e,
  getAllWithdrawals as f,
  getUserRecharges as g,
  getAllLocalUsers as h,
  approveRechargeLocal as i,
  approveWithdrawalLocal as j,
  rejectWithdrawalLocal as k,
  deleteUser as l,
  rejectRechargeLocal as r,
  updateUserBalance as u
};
