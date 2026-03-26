import SearchBar from '@/app/components/SearchBar';
import CategoryCard from '@/app/components/CategoryCard';
import ProjectCard from '@/app/components/ProjectCard';
import Link from 'next/link';
import { getAllCategories } from '@/app/lib/categories';
import { getAllProjects, getPopularProjects } from '@/app/lib/projects';

export default function HomePage() {
  const categories = getAllCategories();
  const allProjects = getAllProjects();
  const popularProjects = getPopularProjects(8);

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="section-width section-padding py-14 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <h1 className="text-hero-sm sm:text-hero text-primary text-balance">
              Know what it costs before you call a contractor.
            </h1>
            <p className="mt-5 text-lg text-muted leading-relaxed">
              Free cost guides, calculators, and detailed breakdowns for 200+ home improvement projects.
            </p>
            <div className="mt-8 max-w-lg">
              <SearchBar projects={allProjects} />
            </div>
            <p className="mt-4 text-xs text-muted-light">
              Try: kitchen remodel, roof replacement, hardwood flooring, deck building
            </p>
          </div>
        </div>
      </section>

      {/* Tools Row - replaces generic 3-column value props */}
      <section className="py-10 sm:py-14 border-b border-gray-100">
        <div className="section-width section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/calculators/"
              className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 bg-white hover:border-accent/30 transition-colors group"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">Cost Calculators</span>
                <p className="text-xs text-muted mt-0.5">Adjust size, quality, and location</p>
              </div>
            </Link>

            <Link
              href="/compare/"
              className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 bg-white hover:border-accent/30 transition-colors group"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/5 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">Compare Projects</span>
                <p className="text-xs text-muted mt-0.5">Side-by-side cost breakdowns</p>
              </div>
            </Link>

            <Link
              href="/cost-by-zip/"
              className="flex items-center gap-4 p-5 rounded-xl border border-gray-100 bg-white hover:border-accent/30 transition-colors group"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-green-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">Cost by ZIP Code</span>
                <p className="text-xs text-muted mt-0.5">Regional pricing for your area</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Projects */}
      <section className="py-14 sm:py-20">
        <div className="section-width section-padding">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary">Most Searched Projects</h2>
              <p className="mt-1 text-muted">What homeowners are pricing right now</p>
            </div>
            <Link href="/projects/" className="hidden sm:inline-flex text-sm font-medium text-accent hover:underline">
              View all projects
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="sm:hidden mt-6 text-center">
            <Link href="/projects/" className="text-sm font-medium text-accent hover:underline">
              View all projects
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14 sm:py-20 bg-white border-y border-gray-100">
        <div className="section-width section-padding">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA - lightweight, not dark full-bleed */}
      <section className="py-14 sm:py-20">
        <div className="section-width section-padding">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">
              Not sure where to start?
            </h2>
            <p className="mt-3 text-muted max-w-md mx-auto">
              Our methodology page explains exactly how we research costs and where the numbers come from.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/methodology/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                How We Calculate Costs
              </Link>
              <Link
                href="/about/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 text-primary text-sm font-semibold hover:bg-gray-50 transition-colors"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
