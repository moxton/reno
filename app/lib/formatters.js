export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRange(low, high) {
  return `${formatCurrency(low)} - ${formatCurrency(high)}`;
}

export function getCostTier(average) {
  if (average < 1000) return { label: '$', color: 'bg-success text-white' };
  if (average < 10000) return { label: '$$', color: 'bg-blue-500 text-white' };
  if (average < 50000) return { label: '$$$', color: 'bg-accent text-white' };
  return { label: '$$$$', color: 'bg-red-500 text-white' };
}
