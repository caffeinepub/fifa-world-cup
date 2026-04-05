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
export {
  getWallet as g,
  initWallet as i
};
