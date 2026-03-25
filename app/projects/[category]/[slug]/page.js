import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { getCategoryBySlug } from '@/app/lib/categories';
import { getFullProjectData, getProjectSlugsWithData, getProjectBySlug } from '@/app/lib/projects';
import { formatCurrency } from '@/app/lib/formatters';

export function generateStaticParams() {
  const slugs = getProjectSlugsWithData();
  return slugs.map(slug => {
    const data = getFullProjectData(slug);
    return { category: data.category, slug: data.slug };
  });
}

export function generateMetadata({ params }) {
  const data = getFullProjectData(params.slug);
  if (!data) return {};
  return {
    title: `${data.title} Cost in 2026: What to Expect`,
    description: data.seo?.metaDescription || `How much does a ${data.title.toLowerCase()} cost? Get detailed cost breakdowns, regional pricing, and expert tips.`,
  };
}

export default function ProjectPage({ params }) {
  const data = getFullProjectData(params.slug);
  if (!data) notFound();

  const category = getCategoryBySlug(data.category);
  const cs = data.costSummary;

  return (
    <div className="py-10 sm:py-14">
      <div className="section-width section-padding">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects/' },
            { label: category?.name || data.category, href: `/projects/${data.category}/` },
            { label: data.title },
          ]}
        />

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">
          {data.title} Cost in 2026: What to Expect
        </h1>
        <p className="mt-2 text-sm text-muted">
          Last updated: {new Date(data.lastUpdated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        {/* Calculator CTA */}
        <div className="mt-6 bg-accent-50 border border-accent-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-semibold text-primary">Get a personalized estimate</h2>
            <p className="text-sm text-muted mt-1">Use our interactive calculator to estimate costs for your specific project size, quality, and location.</p>
          </div>
          <Link
            href={`/calculators/${data.slug}/`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-600 transition-colors whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
            </svg>
            Open Calculator
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Cost Breakdown Table */}
            <Section title="Cost Breakdown by Tier">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 pr-4 font-semibold text-primary">Component</th>
                      <th className="text-left py-3 pr-4 font-semibold text-primary">Budget</th>
                      <th className="text-left py-3 pr-4 font-semibold text-primary">Mid-Range</th>
                      <th className="text-left py-3 font-semibold text-primary">Premium</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-medium text-text">Materials</td>
                      <td className="py-3 pr-4 tabular-nums">{formatCurrency(data.costBreakdown.budget.materials)}</td>
                      <td className="py-3 pr-4 tabular-nums">{formatCurrency(data.costBreakdown.midRange.materials)}</td>
                      <td className="py-3 tabular-nums">{formatCurrency(data.costBreakdown.premium.materials)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-medium text-text">Labor</td>
                      <td className="py-3 pr-4 tabular-nums">{formatCurrency(data.costBreakdown.budget.labor)}</td>
                      <td className="py-3 pr-4 tabular-nums">{formatCurrency(data.costBreakdown.midRange.labor)}</td>
                      <td className="py-3 tabular-nums">{formatCurrency(data.costBreakdown.premium.labor)}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-medium text-text">Permits</td>
                      <td className="py-3 pr-4 tabular-nums">{formatCurrency(data.costBreakdown.budget.permits)}</td>
                      <td className="py-3 pr-4 tabular-nums">{formatCurrency(data.costBreakdown.midRange.permits)}</td>
                      <td className="py-3 tabular-nums">{formatCurrency(data.costBreakdown.premium.permits)}</td>
                    </tr>
                    {data.costBreakdown.budget.design > 0 && (
                      <tr className="border-b border-gray-100">
                        <td className="py-3 pr-4 font-medium text-text">Design</td>
                        <td className="py-3 pr-4 tabular-nums">{formatCurrency(data.costBreakdown.budget.design)}</td>
                        <td className="py-3 pr-4 tabular-nums">{formatCurrency(data.costBreakdown.midRange.design)}</td>
                        <td className="py-3 tabular-nums">{formatCurrency(data.costBreakdown.premium.design)}</td>
                      </tr>
                    )}
                    <tr className="border-t-2 border-gray-200 font-semibold text-primary">
                      <td className="py-3 pr-4">Total</td>
                      <td className="py-3 pr-4 tabular-nums">{formatCurrency(data.costBreakdown.budget.total)}</td>
                      <td className="py-3 pr-4 tabular-nums">{formatCurrency(data.costBreakdown.midRange.total)}</td>
                      <td className="py-3 tabular-nums">{formatCurrency(data.costBreakdown.premium.total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <TierNote tier="Budget" description={data.costBreakdown.budget.description} color="bg-green-50 border-green-200" />
                <TierNote tier="Mid-Range" description={data.costBreakdown.midRange.description} color="bg-blue-50 border-blue-200" />
                <TierNote tier="Premium" description={data.costBreakdown.premium.description} color="bg-amber-50 border-amber-200" />
              </div>
            </Section>

            {/* What Drives the Cost */}
            <Section title="What Drives the Cost">
              <div className="space-y-6">
                {data.costFactors.map((factor, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-100 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base font-semibold text-primary">{factor.title}</h3>
                      <span className="flex-shrink-0 text-sm font-medium text-accent tabular-nums">{factor.impact}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted leading-relaxed">{factor.description}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Cost by Material/Type */}
            <Section title="Cost by Material or Type">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 pr-4 font-semibold text-primary">Option</th>
                      <th className="text-left py-3 pr-4 font-semibold text-primary">Cost</th>
                      <th className="text-left py-3 pr-4 font-semibold text-primary hidden sm:table-cell">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted">
                    {data.materialOptions.map((opt, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-3 pr-4">
                          <span className="font-medium text-text">{opt.material}</span>
                          <span className="block text-xs text-muted-light mt-0.5 sm:hidden">{opt.bestFor}</span>
                        </td>
                        <td className="py-3 pr-4 tabular-nums whitespace-nowrap">{opt.costPerUnit}</td>
                        <td className="py-3 pr-4 hidden sm:table-cell">{opt.bestFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Regional Cost Variations */}
            <Section title="Regional Cost Variations">
              <p className="text-sm text-muted mb-4">
                Labor rates and material costs vary significantly by region. Apply these multipliers to the national average to estimate costs in your area.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 pr-4 font-semibold text-primary">Region</th>
                      <th className="text-left py-3 pr-4 font-semibold text-primary">Adjustment</th>
                      <th className="text-left py-3 pr-4 font-semibold text-primary">Est. Average</th>
                      <th className="text-left py-3 font-semibold text-primary hidden sm:table-cell">Note</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted">
                    {Object.values(data.regionalMultipliers).map((region, i) => {
                      const avgLow = Math.round(cs.nationalAverage * region.min);
                      const avgHigh = Math.round(cs.nationalAverage * region.max);
                      const pctLow = Math.round((region.min - 1) * 100);
                      const pctHigh = Math.round((region.max - 1) * 100);
                      const pctStr = pctLow >= 0
                        ? `+${pctLow}% to +${pctHigh}%`
                        : `${pctLow}% to ${pctHigh}%`;
                      return (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="py-3 pr-4 font-medium text-text">{region.label}</td>
                          <td className="py-3 pr-4 tabular-nums">{pctStr}</td>
                          <td className="py-3 pr-4 tabular-nums">{formatCurrency(avgLow)} - {formatCurrency(avgHigh)}</td>
                          <td className="py-3 hidden sm:table-cell">{region.note}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Timeline */}
            <Section title="Timeline &amp; What to Expect">
              <div className="bg-white rounded-lg border border-gray-100 p-5 mb-4">
                <div className="flex flex-wrap gap-6 text-sm">
                  <div>
                    <span className="text-muted">Fastest:</span>
                    <span className="ml-1 font-semibold text-primary">{data.timeline.minimum}</span>
                  </div>
                  <div>
                    <span className="text-muted">Typical:</span>
                    <span className="ml-1 font-semibold text-primary">{data.timeline.typical}</span>
                  </div>
                  <div>
                    <span className="text-muted">Complex:</span>
                    <span className="ml-1 font-semibold text-primary">{data.timeline.maximum}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {data.timeline.phases.map((phase, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-50 text-accent text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-text font-medium">{phase.name}</span>
                    <span className="flex-1 border-b border-dotted border-gray-200" />
                    <span className="text-muted tabular-nums">{phase.duration}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* DIY vs Professional */}
            <Section title="DIY vs. Professional">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg border border-green-200 p-5">
                  <h3 className="text-base font-semibold text-primary flex items-center gap-2">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                    </svg>
                    Good for DIY
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted">
                    {data.diyVsPro.diyTasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {task}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-success font-medium">Potential savings: {data.diyVsPro.diySavings}</p>
                </div>
                <div className="bg-blue-50 rounded-lg border border-blue-200 p-5">
                  <h3 className="text-base font-semibold text-primary flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    Hire a Pro
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted">
                    {data.diyVsPro.proOnlyTasks.map((task, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                        {task}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-blue-600 font-medium">DIY feasibility: {data.diyVsPro.diyFeasibility}</p>
                </div>
              </div>
              {data.diyVsPro.diyRisks && (
                <div className="mt-4 bg-red-50 rounded-lg border border-red-200 p-4">
                  <p className="text-sm text-red-800">
                    <span className="font-semibold">Risk warning:</span> {data.diyVsPro.diyRisks}
                  </p>
                </div>
              )}
            </Section>

            {/* How to Save Money */}
            <Section title="How to Save Money">
              <div className="space-y-3">
                {data.savingsTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-success/10 text-success text-xs font-bold flex items-center justify-center mt-0.5">
                      $
                    </span>
                    <p className="text-sm text-text leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Questions to Ask Your Contractor */}
            <Section title="Questions to Ask Your Contractor">
              <div className="space-y-4">
                {data.contractorQuestions.map((q, i) => (
                  <div key={i} className="bg-white rounded-lg border border-gray-100 p-4">
                    <h3 className="text-sm font-semibold text-primary">&ldquo;{q.question}&rdquo;</h3>
                    <p className="mt-1.5 text-xs text-muted leading-relaxed">
                      <span className="font-medium text-accent">Why this matters:</span> {q.why}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Related Projects */}
            {data.relatedProjects && data.relatedProjects.length > 0 && (
              <Section title="Related Projects">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.relatedProjects.map((slug) => {
                    const related = getProjectBySlug(slug);
                    if (!related) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/projects/${related.category}/${related.slug}/`}
                        className="flex items-center justify-between bg-white rounded-lg border border-gray-100 p-4 hover:border-accent/30 hover:bg-accent-50/30 transition-colors"
                      >
                        <div>
                          <p className="text-sm font-medium text-primary">{related.title}</p>
                          <p className="text-xs text-muted mt-0.5">{related.typicalRange}</p>
                        </div>
                        <svg className="w-4 h-4 text-muted-light" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </Link>
                    );
                  })}
                </div>
              </Section>
            )}

            {/* Sources */}
            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-lg font-semibold text-primary mb-3">Sources &amp; Methodology</h2>
              <p className="text-xs text-muted mb-3">
                Cost data cross-referenced from multiple sources. See our{' '}
                <Link href="/methodology/" className="text-accent hover:underline">full methodology</Link> for details on how we research and calculate costs.
              </p>
              <ul className="space-y-1">
                {data.sources.map((source, i) => (
                  <li key={i} className="text-xs text-muted-light">
                    {source.name} ({source.year})
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar - Quick Answer Box */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <div className="bg-accent-50 border border-accent-200 rounded-xl p-6">
                <h2 className="text-lg font-bold text-primary">Quick Answer</h2>
                <div className="mt-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wide font-medium">National Average</p>
                    <p className="text-3xl font-bold text-primary tabular-nums mt-0.5">{formatCurrency(cs.nationalAverage)}</p>
                  </div>
                  <div className="border-t border-accent-200 pt-3">
                    <p className="text-xs text-muted uppercase tracking-wide font-medium">Typical Range</p>
                    <p className="text-lg font-semibold text-primary tabular-nums mt-0.5">
                      {formatCurrency(cs.typicalLow)} - {formatCurrency(cs.typicalHigh)}
                    </p>
                  </div>
                  <div className="border-t border-accent-200 pt-3 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted">Low End</p>
                      <p className="text-sm font-semibold text-text tabular-nums">{formatCurrency(cs.lowEnd)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">High End</p>
                      <p className="text-sm font-semibold text-text tabular-nums">{formatCurrency(cs.highEnd)}</p>
                    </div>
                  </div>
                  {cs.costPerUnit && (
                    <div className="border-t border-accent-200 pt-3">
                      <p className="text-xs text-muted uppercase tracking-wide font-medium">Cost Per {cs.costPerUnit.unit}</p>
                      <p className="text-sm font-semibold text-primary tabular-nums mt-0.5">
                        ${cs.costPerUnit.low} - ${cs.costPerUnit.high}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Table of Contents */}
              <nav className="mt-6 bg-white rounded-xl border border-gray-100 p-5 hidden lg:block">
                <h3 className="text-sm font-semibold text-primary mb-3">On This Page</h3>
                <ul className="space-y-2 text-xs text-muted">
                  <li><a href="#cost-breakdown-by-tier" className="hover:text-accent transition-colors">Cost Breakdown</a></li>
                  <li><a href="#what-drives-the-cost" className="hover:text-accent transition-colors">What Drives the Cost</a></li>
                  <li><a href="#cost-by-material-or-type" className="hover:text-accent transition-colors">Cost by Material</a></li>
                  <li><a href="#regional-cost-variations" className="hover:text-accent transition-colors">Regional Variations</a></li>
                  <li><a href="#timeline--what-to-expect" className="hover:text-accent transition-colors">Timeline</a></li>
                  <li><a href="#diy-vs-professional" className="hover:text-accent transition-colors">DIY vs. Pro</a></li>
                  <li><a href="#how-to-save-money" className="hover:text-accent transition-colors">How to Save</a></li>
                  <li><a href="#questions-to-ask-your-contractor" className="hover:text-accent transition-colors">Contractor Questions</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return (
    <section id={id}>
      <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">{title}</h2>
      {children}
    </section>
  );
}

function TierNote({ tier, description, color }) {
  return (
    <div className={`rounded-lg border p-3 ${color}`}>
      <p className="text-xs font-semibold text-primary">{tier}</p>
      <p className="text-xs text-muted mt-1 leading-relaxed">{description}</p>
    </div>
  );
}
