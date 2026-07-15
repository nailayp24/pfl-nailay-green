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

export function getTierByPoints(points) {
  const safePoints = toPointNumber(points);
  if (safePoints >= 1000) return "Platinum";
  if (safePoints >= 500) return "Gold";
  if (safePoints >= 250) return "Silver";
  if (safePoints >= 100) return "Bronze";
  return "Regular Member";
}

export function getPointsFromMember(member) {
  return toPointNumber(member?.points ?? member?.reward_points ?? member?.loyalty_points ?? 0);
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

export function getRewardBalance(memberId) {
  const history = readRewardHistory(memberId);
  return history.reduce((sum, entry) => sum + (Number(entry.points) || 0), 0);
}

export function addRewardHistoryEntry(memberId, entry) {
  const history = readRewardHistory(memberId);
  const nextEntry = {
    id: entry.id || `${Date.now()}`,
    date: entry.date || new Date().toISOString(),
    title: entry.title || "Reward Activity",
    type: entry.type || "redeem",
    points: Number(entry.points) || 0,
    notes: entry.notes || "",
  };
  const nextHistory = [nextEntry, ...history];
  saveRewardHistory(memberId, nextHistory);
  return nextHistory;
}
