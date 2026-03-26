import Link from 'next/link';
import { getPopularProjects } from '@/app/lib/projects';

export default function NotFound() {
  const popular = getPopularProjects(6);

  return (
    <div className="py-16 sm:py-24">
      <div className="section-width section-padding">
        <div className="text-center">
          <p className="text-7xl font-bold text-primary/10">404</p>
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">Page Not Found</h1>
          <p className="mt-3 text-muted max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-600 transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/projects/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gray-100 text-primary font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              Browse All Projects
            </Link>
          </div>
        </div>

        {/* Popular Projects */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-lg font-semibold text-primary mb-6 text-center">Popular Cost Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {popular.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.category}/${project.slug}/`}
                className="flex items-center justify-between bg-white rounded-lg border border-gray-100 p-4 hover:border-accent/30 hover:bg-accent-50/30 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-primary">{project.title}</p>
                  <p className="text-xs text-muted mt-0.5">{project.typicalRange}</p>
                </div>
                <svg className="w-4 h-4 text-muted-light flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted">Or try one of these tools:</p>
          <div className="mt-3 flex flex-wrap gap-3 justify-center">
            <Link href="/calculators/" className="text-sm text-accent hover:underline">Cost Calculators</Link>
            <span className="text-muted-light">-</span>
            <Link href="/compare/" className="text-sm text-accent hover:underline">Compare Projects</Link>
            <span className="text-muted-light">-</span>
            <Link href="/cost-by-zip/" className="text-sm text-accent hover:underline">Cost by ZIP Code</Link>
            <span className="text-muted-light">-</span>
            <Link href="/blog/" className="text-sm text-accent hover:underline">Blog</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
