import Link from 'next/link';
import CategoryIcon from '@/app/components/icons/CategoryIcons';

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/projects/${category.slug}/`}
      className="group block bg-white rounded-xl border border-gray-100 p-6 card-hover"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent-50 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
          <CategoryIcon name={category.icon} className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-primary group-hover:text-accent transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-muted mt-0.5">{category.projectCount}+ projects</p>
          <p className="text-sm text-muted-light mt-2 leading-relaxed line-clamp-2">
            {category.description}
          </p>
          <p className="text-xs font-medium text-primary/70 mt-3 tabular-nums">{category.costRange}</p>
        </div>
      </div>
    </Link>
  );
}
