import { notFound } from 'next/navigation';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import ProjectCard from '@/app/components/ProjectCard';
import CategoryCard from '@/app/components/CategoryCard';
import CategoryIcon from '@/app/components/icons/CategoryIcons';
import { getAllCategories, getCategoryBySlug, getCategorySlugs } from '@/app/lib/categories';
import { getProjectsByCategory } from '@/app/lib/projects';

export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ category: slug }));
}

export function generateMetadata({ params }) {
  const category = getCategoryBySlug(params.category);
  if (!category) return {};
  return {
    title: `${category.name} Costs & Prices`,
    description: `How much does ${category.name.toLowerCase()} work cost? Browse ${category.projectCount}+ ${category.name.toLowerCase()} project cost guides with detailed breakdowns, calculators, and regional pricing.`,
  };
}

export default function CategoryPage({ params }) {
  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const projects = getProjectsByCategory(category.slug);
  const allCategories = getAllCategories();
  const relatedCategories = allCategories
    .filter((c) => c.slug !== category.slug)
    .slice(0, 4);

  return (
    <div className="py-10 sm:py-14">
      <div className="section-width section-padding">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects/' },
            { label: category.name },
          ]}
        />

        {/* Category Hero */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-10 mb-10">
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-accent-50 flex items-center justify-center text-accent">
              <CategoryIcon name={category.icon} className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary">{category.name}</h1>
              <p className="mt-2 text-lg text-muted max-w-2xl">{category.description}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <span className="inline-flex items-center gap-1.5 text-primary font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  {category.projectCount}+ projects
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted tabular-nums">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {category.costRange}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-primary mb-6">
            {category.name} Cost Guides
            {projects.length > 0 && (
              <span className="text-muted font-normal ml-2">({projects.length} available)</span>
            )}
          </h2>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
              <p className="text-muted">
                Detailed cost guides for {category.name.toLowerCase()} projects are coming soon.
              </p>
              <p className="text-sm text-muted-light mt-2">
                We&apos;re researching and verifying cost data from multiple sources to ensure accuracy.
              </p>
            </div>
          )}
        </section>

        {/* Related Categories */}
        <section>
          <h2 className="text-xl font-semibold text-primary mb-6">Related Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
