import Breadcrumbs from '@/app/components/Breadcrumbs';
import CategoryCard from '@/app/components/CategoryCard';
import ProjectCard from '@/app/components/ProjectCard';
import { getAllCategories } from '@/app/lib/categories';
import { getAllProjects } from '@/app/lib/projects';

export const metadata = {
  title: 'All Home Improvement Projects',
  description: 'Browse cost guides for 200+ home improvement projects. Find accurate pricing for kitchen remodels, bathroom renovations, roofing, flooring, and more.',
};

export default function ProjectsIndex() {
  const categories = getAllCategories();
  const allProjects = getAllProjects();

  return (
    <div className="py-10 sm:py-14">
      <div className="section-width section-padding">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'All Projects' }]} />

        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">All Home Improvement Projects</h1>
          <p className="mt-3 text-lg text-muted max-w-2xl">
            Browse our complete library of cost guides. Each guide includes national averages, regional adjustments, detailed breakdowns, and interactive calculators.
          </p>
        </div>

        {/* Categories Grid */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-primary mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* All Projects List */}
        <section>
          <h2 className="text-xl font-semibold text-primary mb-6">
            All Cost Guides ({allProjects.length} projects)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allProjects
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
