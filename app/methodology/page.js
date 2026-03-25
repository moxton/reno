import Breadcrumbs from '@/app/components/Breadcrumbs';
import Link from 'next/link';

export const metadata = {
  title: 'Our Methodology',
  description: 'How Home Project Cost Guide researches and calculates home improvement costs. Our data sources, methodology, regional adjustments, and update process explained.',
};

export default function MethodologyPage() {
  return (
    <div className="py-10 sm:py-14">
      <div className="section-width section-padding">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Methodology' }]} />

        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">How We Calculate Costs</h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            Transparency is the foundation of trust. Here&apos;s exactly how we research, calculate, and maintain the cost data on this site.
          </p>

          {/* Overview */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-primary">Overview</h2>
            <div className="mt-4 space-y-4 text-text leading-relaxed">
              <p>
                Every cost guide on Home Project Cost Guide follows a standardized research process. We don&apos;t make up numbers and we don&apos;t rely on a single source. Our goal is to give you a cost range that&apos;s close to what you&apos;d actually see in contractor bids for your area.
              </p>
              <p>
                Each guide includes a national average, a typical cost range (covering roughly 80% of projects), and low-end to high-end extremes. We break costs down by component (materials, labor, permits) and by quality tier (budget, mid-range, premium) so you can see where the money goes.
              </p>
            </div>
          </section>

          {/* Data Sources */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-primary">Our Data Sources</h2>
            <p className="mt-4 text-muted leading-relaxed">
              We cross-reference multiple sources for every project. No single database covers everything perfectly, so triangulation is key. Here&apos;s what we use:
            </p>
            <div className="mt-6 space-y-4">
              {[
                {
                  name: 'Bureau of Labor Statistics (BLS)',
                  desc: 'Government data on construction labor wages by occupation and region. The most reliable source for understanding labor cost differences across the country.',
                },
                {
                  name: 'RSMeans Construction Cost Data',
                  desc: 'The industry-standard reference for construction cost estimating, used by contractors, architects, and project managers. Provides detailed unit costs for materials and labor.',
                },
                {
                  name: 'Remodeling Magazine Cost vs. Value Report',
                  desc: 'Annual survey of actual remodeling costs across 150 metro areas. Published for over 30 years. Particularly useful for understanding cost-to-value ratios.',
                },
                {
                  name: 'Contractor Survey Aggregators',
                  desc: 'Platforms like HomeAdvisor, HomeGuide, and Fixr aggregate actual project costs reported by contractors and homeowners. We use publicly available ranges from these sources.',
                },
                {
                  name: 'Homewyse Cost Calculators',
                  desc: 'Homewyse uses BLS data and manufacturer pricing to build bottom-up cost estimates. Their methodology is transparent, making them a good reference for unit-cost validation.',
                },
                {
                  name: 'Manufacturer & Supplier Pricing',
                  desc: 'For material costs, we reference current pricing from major suppliers and manufacturers. Material costs can shift significantly year to year, so this keeps our data current.',
                },
              ].map((source) => (
                <div key={source.name} className="bg-white rounded-lg border border-gray-100 p-5">
                  <h3 className="text-base font-semibold text-primary">{source.name}</h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">{source.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How We Calculate */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-primary">How We Build a Cost Guide</h2>
            <div className="mt-6 space-y-6">
              {[
                {
                  step: '1',
                  title: 'Research Phase',
                  desc: 'We gather cost data from at least two independent sources for each project type. We look at national averages, regional variations, and cost breakdowns by component (materials, labor, permits, equipment).',
                },
                {
                  step: '2',
                  title: 'Cross-Reference & Validation',
                  desc: 'When sources agree within 15%, we average them. When they diverge significantly, we investigate why (different scope assumptions, outdated data, regional bias) and adjust accordingly. We always show the full range rather than hiding disagreement.',
                },
                {
                  step: '3',
                  title: 'Tier Breakdown',
                  desc: 'We split costs into budget, mid-range, and premium tiers. These are not arbitrary - they reflect real differences in material quality, fixture brands, labor specialization, and finish work that contractors typically offer.',
                },
                {
                  step: '4',
                  title: 'Regional Adjustment',
                  desc: 'National averages are useful as a baseline, but your actual costs depend heavily on where you live. We apply regional multipliers based on BLS wage data and construction cost indices. A kitchen remodel in San Francisco costs meaningfully more than the same project in Memphis.',
                },
                {
                  step: '5',
                  title: 'Review & Publish',
                  desc: 'Before publishing, every guide is reviewed for accuracy, completeness, and clarity. We check that the math adds up, the ranges make sense, and the advice is genuinely useful rather than generic filler.',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                    <p className="mt-1 text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Regional Adjustments */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-primary">Regional Cost Adjustments</h2>
            <div className="mt-4 space-y-4 text-text leading-relaxed">
              <p>
                Labor rates are the single biggest factor in regional cost differences. A licensed electrician in New York City charges a different rate than one in rural Georgia - and that difference flows through to every project.
              </p>
              <p>
                Our regional multipliers account for labor rate differences, material cost variations (shipping, local supply chains), permit costs, and local code requirements that can add scope to a project.
              </p>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-4 font-semibold text-primary">Region</th>
                    <th className="text-left py-3 pr-4 font-semibold text-primary">Cost Multiplier</th>
                    <th className="text-left py-3 font-semibold text-primary">What It Means</th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4 font-medium text-text">Northeast</td>
                    <td className="py-3 pr-4 tabular-nums">+15% to +25%</td>
                    <td className="py-3">Higher labor rates, stricter codes, shorter building season in some areas</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4 font-medium text-text">West Coast</td>
                    <td className="py-3 pr-4 tabular-nums">+20% to +35%</td>
                    <td className="py-3">Highest labor costs nationally, seismic requirements, strict permitting</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4 font-medium text-text">Southeast</td>
                    <td className="py-3 pr-4 tabular-nums">-10% to -15%</td>
                    <td className="py-3">Lower labor costs, year-round building, fewer code complications</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4 font-medium text-text">Midwest</td>
                    <td className="py-3 pr-4 tabular-nums">-5% to -15%</td>
                    <td className="py-3">Moderate labor costs, varies significantly between metro and rural</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-text">Mountain West</td>
                    <td className="py-3 pr-4 tabular-nums">+5% to +10%</td>
                    <td className="py-3">Growing markets with rising labor demand, altitude/climate considerations</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Calculator Methodology */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-primary">How Our Calculators Work</h2>
            <div className="mt-4 space-y-4 text-text leading-relaxed">
              <p>
                Our interactive calculators use the same underlying data as our written guides, but let you customize the inputs. When you adjust the square footage, quality tier, or location, the calculator applies our cost formulas in real time.
              </p>
              <p>
                Calculator estimates are meant to give you a reasonable ballpark - not a binding quote. Your actual costs will depend on your specific home, contractor, local market conditions, and project scope. But a good ballpark is exactly what you need when you&apos;re planning, budgeting, and evaluating contractor bids.
              </p>
            </div>
          </section>

          {/* Update Schedule */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-primary">How We Stay Current</h2>
            <div className="mt-4 space-y-4 text-text leading-relaxed">
              <p>
                Construction costs change. Material prices fluctuate with supply chains. Labor rates shift with market demand. A cost guide that was accurate in 2024 might be meaningfully off by 2026.
              </p>
              <p>
                We review and update all cost data at least annually. High-traffic guides (kitchen remodels, bathroom remodels, roofing) are reviewed more frequently. Every guide displays a &ldquo;Last Updated&rdquo; date so you always know how fresh the data is.
              </p>
              <p>
                If you notice data that seems off, please{' '}
                <Link href="/about/" className="text-accent font-medium hover:underline">
                  let us know
                </Link>. Reader feedback is one of our best tools for catching inaccuracies.
              </p>
            </div>
          </section>

          {/* Limitations */}
          <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-primary">Important Limitations</h2>
            <div className="mt-4 space-y-3 text-sm text-muted leading-relaxed">
              <p>
                Our cost guides provide estimates based on national and regional data. They are not quotes, bids, or guarantees. Actual project costs depend on factors we can&apos;t account for remotely: your home&apos;s specific condition, local permit requirements, contractor availability, material selections, and project complexity.
              </p>
              <p>
                Always get at least three written bids from licensed, insured contractors before starting a project. Use our guides as a starting point for understanding what&apos;s reasonable - not as a substitute for professional estimates.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
