'use client';

import { useState, useMemo } from 'react';
import { getStateFromZip } from '@/app/lib/zip-to-state';
import { formatCurrency } from '@/app/lib/formatters';

const STATE_NAMES = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia',
  FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
  IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
  MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada',
  NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
  NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon',
  PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota',
  TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia',
  WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

const SORT_OPTIONS = [
  { value: 'name', label: 'Project Name' },
  { value: 'cost-low', label: 'Cost: Low to High' },
  { value: 'cost-high', label: 'Cost: High to Low' },
  { value: 'impact', label: 'Biggest Regional Impact' },
];

function getCategoryLabel(slug) {
  const map = {
    kitchen: 'Kitchen',
    bathroom: 'Bathroom',
    exterior: 'Exterior',
    basement: 'Basement',
    flooring: 'Flooring',
    'hvac-energy': 'HVAC & Energy',
    plumbing: 'Plumbing',
    electrical: 'Electrical',
    structural: 'Structural',
    'painting-walls': 'Painting & Walls',
    'outdoor-living': 'Outdoor Living',
    'smart-home': 'Smart Home & Tech',
  };
  return map[slug] || slug;
}

function MultiplierBadge({ multiplier }) {
  const diff = multiplier - 1;
  const pct = Math.round(diff * 100);

  let colorClass, label;
  if (pct < -2) {
    colorClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    label = `${pct}%`;
  } else if (pct > 2) {
    colorClass = 'bg-red-50 text-red-700 border-red-200';
    label = `+${pct}%`;
  } else {
    colorClass = 'bg-amber-50 text-amber-700 border-amber-200';
    label = 'Avg';
  }

  return (
    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border ${colorClass}`}>
      {label}
    </span>
  );
}

export default function RegionalCostLookup({ projects, regionalMultipliers }) {
  const [zip, setZip] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [activeCategory, setActiveCategory] = useState('all');
  const [hasSearched, setHasSearched] = useState(false);

  // Resolve ZIP to state
  const stateCode = useMemo(() => {
    if (zip.replace(/-.*$/, '').trim().length === 5) {
      return getStateFromZip(zip);
    }
    return null;
  }, [zip]);

  const multiplier = stateCode ? (regionalMultipliers[stateCode] || 1.0) : null;
  const stateName = stateCode ? (STATE_NAMES[stateCode] || stateCode) : null;

  // Determine if we should show results
  const showResults = stateCode !== null;
  const showError = hasSearched && zip.replace(/-.*$/, '').trim().length === 5 && !stateCode;

  // Get unique categories from projects
  const categories = useMemo(() => {
    const cats = [...new Set(projects.map(p => p.category))].sort();
    return cats;
  }, [projects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let list = [...projects];

    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }

    const m = multiplier || 1;

    switch (sortBy) {
      case 'name':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'cost-low':
        list.sort((a, b) => (a.nationalAverage * m) - (b.nationalAverage * m));
        break;
      case 'cost-high':
        list.sort((a, b) => (b.nationalAverage * m) - (a.nationalAverage * m));
        break;
      case 'impact':
        list.sort((a, b) => {
          const impactA = Math.abs(a.nationalAverage * m - a.nationalAverage);
          const impactB = Math.abs(b.nationalAverage * m - b.nationalAverage);
          return impactB - impactA;
        });
        break;
    }

    return list;
  }, [projects, activeCategory, sortBy, multiplier]);

  function handleZipChange(e) {
    const val = e.target.value.replace(/[^\d-]/g, '');
    if (val.length <= 10) {
      setZip(val);
      if (val.replace(/-.*$/, '').trim().length === 5) {
        setHasSearched(true);
      }
    }
  }

  // Multiplier summary text
  const diffPct = multiplier ? Math.round((multiplier - 1) * 100) : 0;
  let diffText = '';
  let diffColorClass = '';
  if (diffPct > 2) {
    diffText = `+${diffPct}% above national average`;
    diffColorClass = 'text-red-600';
  } else if (diffPct < -2) {
    diffText = `${diffPct}% below national average`;
    diffColorClass = 'text-emerald-600';
  } else {
    diffText = 'At the national average';
    diffColorClass = 'text-amber-600';
  }

  return (
    <div>
      {/* Hero ZIP Input Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-12 text-center mb-10 shadow-sm">
        <div className="max-w-lg mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/5 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
            What do projects cost in your area?
          </h2>
          <p className="text-muted mb-8">
            Enter your ZIP code to see how home improvement costs in your area compare to the national average.
          </p>
          <div className="relative max-w-xs mx-auto">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter ZIP code"
              value={zip}
              onChange={handleZipChange}
              maxLength={10}
              aria-label="ZIP code"
              className="w-full text-center text-2xl font-semibold tracking-widest py-4 px-6 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all placeholder:text-gray-300 placeholder:tracking-normal placeholder:text-lg placeholder:font-normal"
            />
            {zip && (
              <button
                onClick={() => { setZip(''); setHasSearched(false); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
                aria-label="Clear ZIP code"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* State result */}
          {showResults && (
            <div className="mt-6 animate-fade-in">
              <div className="inline-flex items-center gap-3 bg-gray-50 rounded-xl px-6 py-3">
                <span className="text-lg font-semibold text-primary">{stateName}</span>
                <span className="text-gray-300">|</span>
                <span className={`text-lg font-bold ${diffColorClass}`}>{diffText}</span>
              </div>
            </div>
          )}

          {/* Error state */}
          {showError && (
            <p className="mt-4 text-sm text-red-500">
              Could not determine a state for that ZIP code. Please check and try again.
            </p>
          )}
        </div>
      </div>

      {/* Results section */}
      {showResults && (
        <div className="animate-fade-in">
          {/* Filters and sort */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-muted border-gray-200 hover:border-primary hover:text-primary'
                }`}
              >
                All Projects
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                    activeCategory === cat
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-muted border-gray-200 hover:border-primary hover:text-primary'
                  }`}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <div className="flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-text focus:border-accent focus:ring-1 focus:ring-accent/20 outline-none"
                aria-label="Sort projects"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Summary bar */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-sm text-muted">
              Showing <span className="font-semibold text-text">{filteredProjects.length}</span> projects adjusted for
              <span className="font-semibold text-text"> {stateName}</span> pricing
              (multiplier: <span className="font-semibold">{multiplier?.toFixed(2)}x</span>)
            </p>
            {diffPct < -2 && (
              <p className="text-sm font-medium text-emerald-600">
                You could save {formatCurrency(Math.round(filteredProjects.reduce((sum, p) => sum + p.nationalAverage, 0) * Math.abs(multiplier - 1) / filteredProjects.length))} per project on average
              </p>
            )}
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map(project => {
              const adjusted = Math.round(project.nationalAverage * multiplier);
              const diff = adjusted - project.nationalAverage;
              const pctDiff = Math.round(((multiplier - 1) * 100));

              return (
                <a
                  key={project.slug}
                  href={`/projects/${project.category}/${project.slug}/`}
                  className="group block bg-white rounded-xl border border-gray-100 p-5 hover:border-accent/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-xs font-medium text-accent-700 uppercase tracking-wide">
                      {getCategoryLabel(project.category)}
                    </p>
                    <MultiplierBadge multiplier={multiplier} />
                  </div>

                  <h3 className="text-base font-semibold text-primary group-hover:text-accent transition-colors mb-4">
                    {project.title}
                  </h3>

                  <div className="space-y-2">
                    {/* National average - crossed out */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted">National avg.</span>
                      <span className="text-sm text-muted line-through tabular-nums">
                        {formatCurrency(project.nationalAverage)}
                      </span>
                    </div>

                    {/* Local estimate - prominent */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-text">Your area</span>
                      <span className="text-lg font-bold text-primary tabular-nums">
                        {formatCurrency(adjusted)}
                      </span>
                    </div>

                    {/* Difference */}
                    {diff !== 0 && (
                      <div className="flex items-center justify-end">
                        <span className={`text-xs font-medium tabular-nums ${diff > 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                          {diff > 0 ? '+' : ''}{formatCurrency(diff)} ({diff > 0 ? '+' : ''}{pctDiff}%)
                        </span>
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 text-muted">
              <p>No projects found in this category.</p>
            </div>
          )}

          {/* Methodology note */}
          <div className="mt-10 bg-gray-50 rounded-xl p-6 text-sm text-muted">
            <h3 className="font-semibold text-text mb-2">How we calculate regional costs</h3>
            <p className="mb-2">
              Regional cost adjustments are based on labor rate indices, material transportation costs, and local demand
              factors compiled from Bureau of Labor Statistics data, contractor surveys, and public cost databases.
              The multiplier for {stateName} ({multiplier?.toFixed(2)}x) is applied uniformly across project types as a
              baseline estimate.
            </p>
            <p>
              Actual costs can vary significantly within a state based on metro area, contractor availability, and
              seasonal demand. Use these numbers as a starting point and get local quotes for accurate pricing.
            </p>
          </div>
        </div>
      )}

      {/* Pre-search content */}
      {!showResults && !showError && (
        <div className="text-center py-8 text-muted">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-2xl font-bold text-primary">{Object.keys(regionalMultipliers).length}</p>
              <p className="text-xs text-muted mt-1">States covered</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-2xl font-bold text-primary">{projects.length}</p>
              <p className="text-xs text-muted mt-1">Projects tracked</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-2xl font-bold text-emerald-600">
                {Math.round((1 - Math.min(...Object.values(regionalMultipliers))) * 100)}%
              </p>
              <p className="text-xs text-muted mt-1">Max savings vs. avg</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-2xl font-bold text-red-500">
                +{Math.round((Math.max(...Object.values(regionalMultipliers)) - 1) * 100)}%
              </p>
              <p className="text-xs text-muted mt-1">Max premium vs. avg</p>
            </div>
          </div>
          <p className="text-sm max-w-md mx-auto">
            Home improvement costs vary by up to 40% depending on where you live. Enter your ZIP code above
            to see adjusted pricing for every project in our database.
          </p>
        </div>
      )}
    </div>
  );
}
