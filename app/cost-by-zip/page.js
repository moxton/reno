import Breadcrumbs from '@/app/components/Breadcrumbs';
import RegionalCostLookup from '@/app/components/RegionalCostLookup';
import { getAllProjects } from '@/app/lib/projects';
import { getCalculatorBySlug } from '@/app/lib/calculators';

export const metadata = {
  title: 'Cost by ZIP Code - Regional Price Lookup',
  description:
    'Enter your ZIP code to see how home improvement costs in your area compare to the national average. Covers all 50 states with adjusted pricing for every project.',
  openGraph: {
    title: 'Cost by ZIP Code - Regional Price Lookup',
    description:
      'See how home improvement costs in your area compare to the national average. Adjusted pricing for every project across all 50 states.',
  },
};

export default function CostByZipPage() {
  // Load all projects with their summary data
  const allProjects = getAllProjects();

  // Only include projects that have nationalAverage data
  const projects = allProjects
    .filter(p => p.nationalAverage && p.nationalAverage > 0)
    .map(p => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      nationalAverage: p.nationalAverage,
    }));

  // Load regional multipliers from one calculator config (they are consistent across calculators)
  const kitchenCalc = getCalculatorBySlug('full-kitchen-remodel');
  const regionalMultipliers = kitchenCalc?.regionalMultipliers || {};

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Cost by ZIP Code' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Regional Cost Lookup
        </h1>
        <p className="text-lg text-muted max-w-2xl">
          Home improvement costs vary significantly by location. Use this tool to see adjusted project
          costs for your area based on regional labor rates and material pricing.
        </p>
      </header>

      <RegionalCostLookup
        projects={projects}
        regionalMultipliers={regionalMultipliers}
      />

      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Regional Cost Lookup Tool',
            description:
              'Enter your ZIP code to see adjusted home improvement project costs for your area.',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
    </div>
  );
}
