import { getCostTier } from '@/app/lib/formatters';

export default function CostRangeBadge({ average }) {
  const tier = getCostTier(average);
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${tier.color}`}>
      {tier.label}
    </span>
  );
}
