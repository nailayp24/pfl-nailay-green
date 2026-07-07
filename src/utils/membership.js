export const MEMBERSHIP_TIERS = [
  { name: "Bronze", discount: 5 },
  { name: "Silver", discount: 10 },
  { name: "Gold", discount: 15 },
  { name: "Platinum", discount: 20 },
];

export const REWARD_CATALOG = [
  { id: "oil-25", title: "Voucher Ganti Oli", cost: 150, value: "Potongan Rp25.000" },
  { id: "wash-free", title: "Cuci Mobil Gratis", cost: 250, value: "Gratis cuci eksterior" },
  { id: "service-75", title: "Voucher Servis", cost: 500, value: "Potongan Rp75.000" },
];

export function toPointNumber(value) {
  const points = parseInt(value, 10);
  return Number.isNaN(points) ? 0 : Math.max(0, points);
}

export function getDiscountByTier(tierName) {
  return MEMBERSHIP_TIERS.find((tier) => tier.name === tierName)?.discount || 0;
}

export function getBookingRewardPoints(totalPrice) {
  return Math.max(10, Math.floor(toPointNumber(totalPrice) / 10000));
}

export function getRewardHistoryKey(memberId) {
  return `reward_history_${memberId || "guest"}`;
}

export function readRewardHistory(memberId) {
  try {
    return JSON.parse(localStorage.getItem(getRewardHistoryKey(memberId))) || [];
  } catch {
    return [];
  }
}

export function saveRewardHistory(memberId, history) {
  localStorage.setItem(getRewardHistoryKey(memberId), JSON.stringify(history));
}
