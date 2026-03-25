import SearchBar from '@/app/components/SearchBar';
import CategoryCard from '@/app/components/CategoryCard';
import ProjectCard from '@/app/components/ProjectCard';
import { getAllCategories } from '@/app/lib/categories';
import { getAllProjects, getPopularProjects } from '@/app/lib/projects';

export default function HomePage() {
  const categories = getAllCategories();
  const allProjects = getAllProjects();
  const popularProjects = getPopularProjects(8);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="section-width section-padding py-16 sm:py-20 lg:py-24 text-center">
          <h1 className="text-hero-sm sm:text-hero text-primary text-balance max-w-3xl mx-auto">
            Know what it costs before you call a contractor.
          </h1>
          <p className="mt-5 text-lg text-muted max-w-xl mx-auto leading-relaxed">
            Free cost guides, calculators, and detailed breakdowns for 200+ home improvement projects.
          </p>
          <div className="mt-8">
            <SearchBar projects={allProjects} />
          </div>
          <p className="mt-4 text-xs text-muted-light">
            Try: kitchen remodel, roof replacement, hardwood flooring, deck building
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 sm:py-20">
        <div className="section-width section-padding">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">Browse by Category</h2>
            <p className="mt-2 text-muted">Explore cost guides organized by project type</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Projects */}
      <section className="py-16 sm:py-20 bg-white border-y border-gray-100">
        <div className="section-width section-padding">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">Most Popular Cost Guides</h2>
            <p className="mt-2 text-muted">The projects homeowners search for most</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Value Proposition */}
      <section className="py-16 sm:py-20">
        <div className="section-width section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Research-Backed */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary">Research-Backed Data</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Every cost range is sourced from multiple industry databases, contractor surveys, and government labor statistics. No guesswork.
              </p>
            </div>

            {/* Interactive Calculators */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-xl bg-accent-50 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary">Interactive Calculators</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Get a personalized estimate based on your project size, quality level, and location. Adjust inputs and see costs update in real time.
              </p>
            </div>

            {/* Updated */}
            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-xl bg-green-50 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-success" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 19.644l3.181-3.183" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary">Updated for 2026</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                Material prices and labor rates change constantly. Our data is refreshed regularly to reflect current market conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary">
        <div className="section-width section-padding text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Ready to plan your project?</h2>
          <p className="mt-3 text-gray-400 max-w-lg mx-auto">
            Browse our complete library of cost guides or use a calculator to get a personalized estimate for your home.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/projects/"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-500 transition-colors"
            >
              Browse All Projects
            </a>
            <a
              href="/methodology/"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition-colors"
            >
              Our Methodology
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
