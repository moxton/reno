import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import CostCalculator from '@/app/components/CostCalculator';
import { getCalculatorBySlug, getCalculatorSlugs } from '@/app/lib/calculators';
import { getFullProjectData } from '@/app/lib/projects';
import { formatCurrency } from '@/app/lib/formatters';

export function generateStaticParams() {
  return getCalculatorSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) return {};
  return {
    title: calc.title,
    description: calc.seo?.metaDescription || calc.description,
  };
}

export default function CalculatorPage({ params }) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) notFound();

  const projectData = getFullProjectData(calc.projectSlug);

  return (
    <div className="py-10 sm:py-14">
      <div className="section-width section-padding">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Calculators', href: '/calculators/' },
            { label: calc.title },
          ]}
        />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">{calc.title}</h1>
          <p className="mt-2 text-lg text-muted max-w-2xl">{calc.description}</p>
        </div>

        {/* Calculator */}
        <div className="mb-12">
          <CostCalculator config={calc} />
        </div>

        {/* Link to Full Cost Guide */}
        {projectData && (
          <div className="bg-primary-50 rounded-xl border border-primary-100 p-6 mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="font-semibold text-primary">Want the full picture?</h2>
                <p className="text-sm text-muted mt-1">
                  Read our complete {projectData.title} cost guide with material comparisons, contractor tips, savings strategies, and regional pricing data.
                </p>
              </div>
              <Link
                href={`/projects/${projectData.category}/${projectData.slug}/`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors whitespace-nowrap"
              >
                View Full Cost Guide
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        )}

        {/* Quick Reference Table from Project Data */}
        {projectData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Cost Summary */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-semibold text-primary mb-4">Quick Cost Reference</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-sm text-muted">National Average</span>
                  <span className="font-semibold text-primary tabular-nums">{formatCurrency(projectData.costSummary.nationalAverage)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-sm text-muted">Typical Range</span>
                  <span className="font-semibold text-primary tabular-nums">{formatCurrency(projectData.costSummary.typicalLow)} - {formatCurrency(projectData.costSummary.typicalHigh)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-sm text-muted">Low End</span>
                  <span className="tabular-nums text-sm">{formatCurrency(projectData.costSummary.lowEnd)}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted">High End</span>
                  <span className="tabular-nums text-sm">{formatCurrency(projectData.costSummary.highEnd)}</span>
                </div>
              </div>
            </div>

            {/* Tier Comparison */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-semibold text-primary mb-4">Cost by Tier</h2>
              <div className="space-y-3">
                {['budget', 'midRange', 'premium'].map(tierKey => {
                  const t = projectData.costBreakdown[tierKey];
                  if (!t) return null;
                  return (
                    <div key={tierKey} className="flex justify-between items-start py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <span className="text-sm font-medium text-primary capitalize">{tierKey === 'midRange' ? 'Mid-Range' : tierKey.charAt(0).toUpperCase() + tierKey.slice(1)}</span>
                        <p className="text-xs text-muted mt-0.5 max-w-xs">{t.description}</p>
                      </div>
                      <span className="font-semibold text-primary tabular-nums shrink-0 ml-4">{formatCurrency(t.total)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Related Calculators */}
        <section>
          <h2 className="text-xl font-semibold text-primary mb-6">More Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {getCalculatorSlugs()
              .filter(s => s !== calc.slug)
              .slice(0, 3)
              .map(slug => {
                const related = getCalculatorBySlug(slug);
                if (!related) return null;
                return (
                  <Link
                    key={slug}
                    href={`/calculators/${slug}/`}
                    className="group bg-white rounded-xl border border-gray-100 p-5 card-hover"
                  >
                    <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">{related.title}</h3>
                    <p className="text-sm text-muted mt-1">National avg: {formatCurrency(related.nationalAverage)}</p>
                  </Link>
                );
              })}
          </div>
        </section>
      </div>
    </div>
  );
}
