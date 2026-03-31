const key = (phone) => `pb_wallet_${phone}`;
function getWallet(phone) {
  try {
    const raw = localStorage.getItem(key(phone));
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return { balance: 0, earnings: 0 };
}
function setWallet(phone, wallet) {
  localStorage.setItem(key(phone), JSON.stringify(wallet));
}
function initWallet(phone) {
  if (!localStorage.getItem(key(phone))) {
    setWallet(phone, { balance: 100, earnings: 0 });
  }
}
function earnRandom(phone) {
  const wallet = getWallet(phone);
  const amount = Math.floor(Math.random() * 16) + 5;
  wallet.balance += amount;
  wallet.earnings += amount;
  setWallet(phone, wallet);
  return amount;
}
export {
  earnRandom as e,
  getWallet as g,
  initWallet as i,
  setWallet as s
};
