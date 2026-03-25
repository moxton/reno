import Link from 'next/link';
import CostRangeBadge from './CostRangeBadge';
import { formatCurrency } from '@/app/lib/formatters';

export default function ProjectCard({ project }) {
  const categoryLabel = project.category
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace('Hvac Energy', 'HVAC & Energy')
    .replace('Painting Walls', 'Painting & Walls')
    .replace('Outdoor Living', 'Outdoor Living')
    .replace('Smart Home', 'Smart Home & Tech');

  return (
    <Link
      href={`/projects/${project.category}/${project.slug}/`}
      className="group block bg-white rounded-xl border border-gray-100 p-5 card-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-accent uppercase tracking-wide">{categoryLabel}</p>
          <h3 className="text-base font-semibold text-primary mt-1 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted mt-2 tabular-nums">{project.typicalRange}</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <CostRangeBadge average={project.nationalAverage} />
          <p className="text-lg font-bold text-primary mt-2 tabular-nums">
            {formatCurrency(project.nationalAverage)}
          </p>
          <p className="text-xs text-muted-light">avg. cost</p>
        </div>
      </div>
    </Link>
  );
}
