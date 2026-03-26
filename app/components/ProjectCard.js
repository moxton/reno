import Link from 'next/link';
import { formatCurrency } from '@/app/lib/formatters';

export default function ProjectCard({ project }) {
  const categoryLabel = project.category
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace('Hvac Energy', 'HVAC & Energy')
    .replace('Painting Walls', 'Painting & Walls')
    .replace('Outdoor Living', 'Outdoor Living')
    .replace('Smart Home', 'Smart Home & Tech');

  // Cost bar: position the average within a $0-$100k scale (capped)
  const maxScale = 100000;
  const barPercent = Math.min((project.nationalAverage / maxScale) * 100, 100);

  return (
    <Link
      href={`/projects/${project.category}/${project.slug}/`}
      className="group block bg-white rounded-xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-sm transition-all duration-150"
    >
      <p className="text-xs font-medium text-accent uppercase tracking-wide">{categoryLabel}</p>
      <h3 className="text-base font-semibold text-primary mt-1 group-hover:text-accent transition-colors">
        {project.title}
      </h3>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <span className="text-lg font-bold text-primary tabular-nums">
          {formatCurrency(project.nationalAverage)}
        </span>
        <span className="text-xs text-muted-light">avg. cost</span>
      </div>
      {/* Cost bar */}
      <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-accent/60 rounded-full"
          style={{ width: `${barPercent}%` }}
        />
      </div>
      <p className="text-xs text-muted mt-2 tabular-nums">{project.typicalRange}</p>
    </Link>
  );
}
