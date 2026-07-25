/**
 * Formats a number with locale-aware separators.
 * Example: 1780 → "1,780"
 */
const formatNumber = (num) => {
  if (num === null || num === undefined) return '—';
  return Number(num).toLocaleString();
};

export default formatNumber;
