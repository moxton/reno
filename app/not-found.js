import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-20 sm:py-28">
      <div className="section-width section-padding text-center">
        <p className="text-6xl font-bold text-primary/10">404</p>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">Page Not Found</h1>
        <p className="mt-3 text-muted max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Try browsing our project categories or searching for what you need.
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
            Browse Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
