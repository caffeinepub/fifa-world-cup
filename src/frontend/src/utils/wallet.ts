export interface Wallet {
  balance: number;
  earnings: number;
}

const key = (phone: string) => `pb_wallet_${phone}`;

export function getWallet(phone: string): Wallet {
  try {
    const raw = localStorage.getItem(key(phone));
    if (raw) return JSON.parse(raw) as Wallet;
  } catch {}
  return { balance: 0, earnings: 0 };
}

export function setWallet(phone: string, wallet: Wallet): void {
  localStorage.setItem(key(phone), JSON.stringify(wallet));
}

export function initWallet(phone: string): void {
  if (!localStorage.getItem(key(phone))) {
    setWallet(phone, { balance: 100, earnings: 0 });
  }
}

export function earnRandom(phone: string): number {
  const wallet = getWallet(phone);
  const amount = Math.floor(Math.random() * 16) + 5; // random 5–20
  wallet.balance += amount;
  wallet.earnings += amount;
  setWallet(phone, wallet);
  return amount;
}
