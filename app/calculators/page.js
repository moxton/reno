import Link from 'next/link';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { getAllCalculators } from '@/app/lib/calculators';
import { formatCurrency } from '@/app/lib/formatters';

export const metadata = {
  title: 'Home Improvement Cost Calculators',
  description: 'Free interactive cost calculators for kitchen remodels, bathroom remodels, roofing, flooring, painting, and more. Get instant estimates based on your project size, quality, and location.',
  openGraph: {
    title: 'Home Improvement Cost Calculators',
    description: 'Free interactive cost calculators for 50+ home improvement projects. Get instant estimates.',
    url: 'https://homeprojectcostguide.com/calculators/',
  },
  alternates: { canonical: 'https://homeprojectcostguide.com/calculators/' },
};

const categoryLabels = {
  kitchen: 'Kitchen',
  bathroom: 'Bathroom',
  exterior: 'Exterior',
  flooring: 'Flooring',
  'painting-walls': 'Painting',
  'hvac-energy': 'HVAC & Energy',
};

export default function CalculatorsPage() {
  const calculators = getAllCalculators();

  // Group by category
  const grouped = {};
  calculators.forEach(calc => {
    const cat = calc.category;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(calc);
  });

  return (
    <div className="py-10 sm:py-14">
      <div className="section-width section-padding">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Calculators' },
          ]}
        />

        {/* Hero */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-10 mb-10">
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-accent-50 flex items-center justify-center text-accent">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary">Cost Calculators</h1>
              <p className="mt-2 text-lg text-muted max-w-2xl">
                Get instant, personalized cost estimates for your home improvement project. Adjust for project size, quality tier, and your location to see real-time pricing.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <span className="inline-flex items-center gap-1.5 text-primary font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                  </svg>
                  {calculators.length} calculators
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  Real-time estimates
                </span>
                <span className="inline-flex items-center gap-1.5 text-muted">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  Regional pricing for all 50 states
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculators.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/${calc.slug}/`}
              className="group bg-white rounded-xl border border-gray-100 p-6 card-hover"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-accent-700 bg-accent-50 px-2 py-0.5 rounded-full">
                  {categoryLabels[calc.category] || calc.category}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">
                {calc.title}
              </h2>
              <p className="text-sm text-muted mt-1 line-clamp-2">{calc.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-muted">
                  National avg: <span className="font-semibold text-primary tabular-nums">{formatCurrency(calc.nationalAverage)}</span>
                  {calc.sizeInput.unit !== 'sq ft' && calc.sizeInput.unit !== 'linear ft' && (
                    <span className="text-muted">/{calc.sizeInput.unit.replace('windows', 'window')}</span>
                  )}
                </span>
                <span className="text-accent text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Calculate
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* How It Works */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold text-primary mb-6">How Our Calculators Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
              </div>
              <h3 className="font-semibold text-primary mb-1">Enter Your Details</h3>
              <p className="text-sm text-muted">Set your project size, choose a quality tier, select your state, and toggle the options that match your project scope.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="w-10 h-10 rounded-lg bg-accent-50 text-accent flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="font-semibold text-primary mb-1">Get Instant Estimates</h3>
              <p className="text-sm text-muted">See real-time cost estimates with an itemized breakdown of materials, labor, permits, and optional add-ons.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="w-10 h-10 rounded-lg bg-green-50 text-success flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-primary mb-1">Print or Share</h3>
              <p className="text-sm text-muted">Print a clean summary to bring to contractor meetings or share your estimate with a partner or friend.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
