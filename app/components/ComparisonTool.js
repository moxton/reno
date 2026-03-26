'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// Inline formatCurrency since the shared version is a server module
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatRange(low, high) {
  return `${formatCurrency(low)} - ${formatCurrency(high)}`;
}

// Category labels for grouped dropdown
const CATEGORY_LABELS = {
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

// Category sort order
const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS);

function WinnerBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-success bg-green-50 px-2 py-0.5 rounded-full ml-2">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      Best
    </span>
  );
}

function SectionHeading({ children }) {
  return (
    <h3 className="text-lg font-bold text-primary border-b-2 border-accent/30 pb-2 mb-4">
      {children}
    </h3>
  );
}

function StatCard({ label, value, highlight = false }) {
  return (
    <div
      className={`rounded-lg p-3 text-center ${
        highlight ? 'bg-green-50 ring-1 ring-success/20' : 'bg-primary-50'
      }`}
    >
      <div className="text-xs text-muted mb-1 uppercase tracking-wide">{label}</div>
      <div className={`text-base sm:text-lg font-bold ${highlight ? 'text-success' : 'text-primary'}`}>
        {value}
      </div>
    </div>
  );
}

function ProjectSelector({ value, onChange, projects, groupedOptions, excludeSlugs, index }) {
  return (
    <div className="relative">
      <label
        htmlFor={`project-select-${index}`}
        className="block text-sm font-medium text-muted mb-1.5"
      >
        Project {index + 1}
      </label>
      <select
        id={`project-select-${index}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-text font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent appearance-none cursor-pointer"
      >
        <option value="">Select a project...</option>
        {CATEGORY_ORDER.map((cat) => {
          const items = groupedOptions[cat];
          if (!items || items.length === 0) return null;
          return (
            <optgroup key={cat} label={CATEGORY_LABELS[cat] || cat}>
              {items.map((p) => (
                <option
                  key={p.slug}
                  value={p.slug}
                  disabled={excludeSlugs.includes(p.slug)}
                >
                  {p.title}
                  {excludeSlugs.includes(p.slug) ? ' (already selected)' : ''}
                </option>
              ))}
            </optgroup>
          );
        })}
      </select>
      <div className="pointer-events-none absolute right-3 bottom-3.5">
        <svg className="w-5 h-5 text-muted" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

function ComparisonColumn({ data, isWinner }) {
  // isWinner is an object: { cost, timeline, diy }
  const cs = data.costSummary;
  const cb = data.costBreakdown;
  const tl = data.timeline;
  const dvp = data.diyVsPro;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-primary px-4 sm:px-6 py-4">
        <h4 className="text-white font-bold text-lg">{data.title}</h4>
        <span className="text-primary-200 text-sm capitalize">
          {CATEGORY_LABELS[data.category] || data.category}
        </span>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Cost Overview */}
        <div>
          <SectionHeading>Cost Overview</SectionHeading>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="National Avg"
              value={formatCurrency(cs.nationalAverage)}
              highlight={isWinner.cost}
            />
            <StatCard
              label="Typical Range"
              value={formatRange(cs.typicalLow, cs.typicalHigh)}
            />
            <StatCard label="Low End" value={formatCurrency(cs.lowEnd)} />
            <StatCard label="High End" value={formatCurrency(cs.highEnd)} />
          </div>
          {cs.costPerUnit && (
            <div className="mt-3 text-sm text-muted bg-gray-50 rounded-lg px-3 py-2 text-center">
              {formatCurrency(cs.costPerUnit.low)} - {formatCurrency(cs.costPerUnit.high)} per{' '}
              {cs.costPerUnit.unit}
            </div>
          )}
        </div>

        {/* Cost by Tier */}
        <div>
          <SectionHeading>Cost by Tier</SectionHeading>
          <div className="space-y-2">
            {[
              { key: 'budget', label: 'Budget' },
              { key: 'midRange', label: 'Mid-Range' },
              { key: 'premium', label: 'Premium' },
            ].map(({ key, label }) => {
              const tier = cb[key];
              if (!tier) return null;
              return (
                <div
                  key={key}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5"
                >
                  <span className="text-sm font-medium text-text">{label}</span>
                  <span className="font-bold text-primary">{formatCurrency(tier.total)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cost Breakdown (Mid-Range) */}
        <div>
          <SectionHeading>Mid-Range Breakdown</SectionHeading>
          {cb.midRange ? (
            <div className="space-y-1.5">
              {[
                { label: 'Materials', value: cb.midRange.materials },
                { label: 'Labor', value: cb.midRange.labor },
                { label: 'Permits', value: cb.midRange.permits },
                { label: 'Design', value: cb.midRange.design },
              ].map(
                ({ label, value }) =>
                  value > 0 && (
                    <div
                      key={label}
                      className="flex items-center justify-between text-sm px-1"
                    >
                      <span className="text-muted">{label}</span>
                      <span className="font-medium text-text">{formatCurrency(value)}</span>
                    </div>
                  )
              )}
              <div className="flex items-center justify-between text-sm px-1 pt-2 border-t border-gray-200 mt-2">
                <span className="font-semibold text-text">Total</span>
                <span className="font-bold text-primary">
                  {formatCurrency(cb.midRange.total)}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted">Breakdown not available</p>
          )}
        </div>

        {/* Timeline */}
        <div>
          <SectionHeading>
            Timeline
            {isWinner.timeline && <WinnerBadge />}
          </SectionHeading>
          {tl ? (
            <div className="grid grid-cols-3 gap-2">
              <StatCard label="Minimum" value={tl.minimum} highlight={isWinner.timeline} />
              <StatCard label="Typical" value={tl.typical} />
              <StatCard label="Maximum" value={tl.maximum} />
            </div>
          ) : (
            <p className="text-sm text-muted">Timeline not available</p>
          )}
        </div>

        {/* DIY Feasibility */}
        <div>
          <SectionHeading>
            DIY Feasibility
            {isWinner.diy && <WinnerBadge />}
          </SectionHeading>
          {dvp ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                <span className="text-sm text-muted">Feasibility</span>
                <span
                  className={`font-semibold text-sm px-2.5 py-0.5 rounded-full ${
                    dvp.diyFeasibility === 'High'
                      ? 'bg-green-100 text-success'
                      : dvp.diyFeasibility === 'Partial'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {dvp.diyFeasibility}
                </span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                <span className="text-sm text-muted">Potential Savings</span>
                <span className="font-semibold text-success text-sm">{dvp.diySavings}</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                <span className="text-sm text-muted">DIY-Friendly Tasks</span>
                <span className="font-bold text-primary">
                  {dvp.diyTasks ? dvp.diyTasks.length : 0}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted">DIY info not available</p>
          )}
        </div>

        {/* CTAs */}
        <div className="pt-2 space-y-2">
          <Link
            href={`/projects/${data.slug}/`}
            className="block w-full text-center bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-600 transition-colors"
          >
            View Full Cost Guide
          </Link>
          <Link
            href={`/calculators/${data.slug}/`}
            className="block w-full text-center border-2 border-accent text-accent-600 font-semibold py-3 rounded-lg hover:bg-accent-50 transition-colors"
          >
            Open Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ComparisonTool({ projects, projectSlugs, allFullData }) {
  const [selectedSlugs, setSelectedSlugs] = useState(['', '']);
  const [showThird, setShowThird] = useState(false);

  // Build grouped options (only projects with full data)
  const groupedOptions = useMemo(() => {
    const fullDataProjects = projects.filter(
      (p) => p.hasFullData && projectSlugs.includes(p.slug)
    );
    const grouped = {};
    for (const p of fullDataProjects) {
      if (!grouped[p.category]) {
        grouped[p.category] = [];
      }
      grouped[p.category].push(p);
    }
    // Sort each category alphabetically
    for (const cat of Object.keys(grouped)) {
      grouped[cat].sort((a, b) => a.title.localeCompare(b.title));
    }
    return grouped;
  }, [projects, projectSlugs]);

  const handleSelect = (index, slug) => {
    const next = [...selectedSlugs];
    next[index] = slug;
    setSelectedSlugs(next);
  };

  const handleAddThird = () => {
    if (!showThird) {
      setShowThird(true);
      setSelectedSlugs((prev) => [...prev.slice(0, 2), '']);
    }
  };

  const handleRemoveThird = () => {
    setShowThird(false);
    setSelectedSlugs((prev) => prev.slice(0, 2));
  };

  // Get the active full data for selected projects
  const activeProjects = selectedSlugs
    .filter((slug) => slug && allFullData[slug])
    .map((slug) => allFullData[slug]);

  // Determine "winners" for highlighting
  const winners = useMemo(() => {
    if (activeProjects.length < 2) return {};

    const averages = activeProjects.map((p) => p.costSummary.nationalAverage);
    const minCost = Math.min(...averages);

    // Parse timeline minimum to comparable number (weeks)
    function parseTimelineWeeks(str) {
      if (!str) return Infinity;
      const match = str.match(/(\d+)/);
      if (!match) return Infinity;
      const num = parseInt(match[1], 10);
      if (str.includes('day')) return num / 7;
      if (str.includes('hour')) return num / (7 * 24);
      return num; // assume weeks
    }

    const timelineVals = activeProjects.map((p) =>
      p.timeline ? parseTimelineWeeks(p.timeline.minimum) : Infinity
    );
    const minTimeline = Math.min(...timelineVals);

    // DIY score: High=3, Partial=2, Low=1
    function diyScore(p) {
      if (!p.diyVsPro) return 0;
      const f = p.diyVsPro.diyFeasibility;
      if (f === 'High') return 3;
      if (f === 'Partial') return 2;
      if (f === 'Low') return 1;
      return 0;
    }
    const diyScores = activeProjects.map(diyScore);
    const maxDiy = Math.max(...diyScores);

    const result = {};
    for (const p of activeProjects) {
      const idx = activeProjects.indexOf(p);
      result[p.slug] = {
        cost: averages[idx] === minCost && averages.filter((a) => a === minCost).length === 1,
        timeline:
          timelineVals[idx] === minTimeline &&
          timelineVals.filter((t) => t === minTimeline).length === 1,
        diy:
          diyScores[idx] === maxDiy &&
          maxDiy > 0 &&
          diyScores.filter((s) => s === maxDiy).length === 1,
      };
    }
    return result;
  }, [activeProjects]);

  const excludeFor = (index) =>
    selectedSlugs.filter((s, i) => i !== index && s !== '');

  const selectorCount = showThird ? 3 : 2;

  return (
    <div className="space-y-8">
      {/* Selectors */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-primary">Choose Projects to Compare</h2>
          {!showThird && (
            <button
              onClick={handleAddThird}
              className="text-sm font-medium text-accent hover:text-accent-600 transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add a third
            </button>
          )}
        </div>
        <div
          className={`grid gap-4 ${
            showThird ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'
          }`}
        >
          {Array.from({ length: selectorCount }).map((_, i) => (
            <div key={i} className="relative">
              <ProjectSelector
                value={selectedSlugs[i] || ''}
                onChange={(slug) => handleSelect(i, slug)}
                projects={projects}
                groupedOptions={groupedOptions}
                excludeSlugs={excludeFor(i)}
                index={i}
              />
              {i === 2 && showThird && (
                <button
                  onClick={handleRemoveThird}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-gray-200 hover:bg-red-100 text-muted hover:text-red-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Remove third project"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Empty state with popular comparisons */}
      {activeProjects.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-8">
          <h3 className="text-lg font-bold text-primary mb-5">Popular Comparisons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                slugA: 'full-kitchen-remodel',
                slugB: 'bathroom-remodel',
                nameA: 'Kitchen Remodel',
                nameB: 'Bathroom Remodel',
                description: 'The two most popular renovations - see which fits your budget.',
              },
              {
                slugA: 'deck-building',
                slugB: 'patio-installation',
                nameA: 'Deck',
                nameB: 'Patio',
                description: 'Both expand your outdoor living space, but costs differ a lot.',
              },
              {
                slugA: 'hardwood-floor-installation',
                slugB: 'vinyl-plank-flooring',
                nameA: 'Hardwood Flooring',
                nameB: 'Vinyl Plank Flooring',
                description: 'Classic hardwood vs the budget-friendly alternative everyone loves.',
              },
              {
                slugA: 'central-ac-installation',
                slugB: 'heat-pump-installation',
                nameA: 'Central AC',
                nameB: 'Heat Pump',
                description: 'Cooling only vs year-round comfort - which makes more sense?',
              },
            ].map(({ slugA, slugB, nameA, nameB, description }) => (
              <button
                key={`${slugA}-${slugB}`}
                onClick={() => {
                  setSelectedSlugs([slugA, slugB, ...(showThird ? [''] : [])]);
                }}
                className="text-left border border-gray-200 rounded-lg p-4 hover:border-accent hover:shadow-md transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-semibold text-primary group-hover:text-accent-600 transition-colors">
                    {nameA}
                  </span>
                  <span className="text-xs font-bold text-accent uppercase tracking-wide">vs</span>
                  <span className="font-semibold text-primary group-hover:text-accent-600 transition-colors">
                    {nameB}
                  </span>
                </div>
                <p className="text-sm text-muted leading-snug">{description}</p>
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-muted">Or choose your own projects above</p>
        </div>
      )}

      {/* Single project selected - prompt */}
      {activeProjects.length === 1 && (
        <div className="text-center py-10 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-muted text-lg">
            Great pick! Now select a second project to see the comparison.
          </p>
        </div>
      )}

      {/* Comparison grid */}
      {activeProjects.length >= 2 && (
        <>
          {/* Quick comparison summary bar */}
          <div className="bg-accent-50 border border-accent-200 rounded-xl p-4 sm:p-6">
            <h2 className="text-base font-bold text-primary mb-3">Quick Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-accent-200">
                    <th className="text-left py-2 pr-4 text-muted font-medium w-1/4"></th>
                    {activeProjects.map((p) => (
                      <th
                        key={p.slug}
                        className="text-center py-2 px-2 font-bold text-primary"
                      >
                        {p.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-accent-100">
                    <td className="py-2.5 pr-4 text-muted font-medium">Average Cost</td>
                    {activeProjects.map((p) => (
                      <td
                        key={p.slug}
                        className={`text-center py-2.5 px-2 font-bold ${
                          winners[p.slug]?.cost ? 'text-success' : 'text-primary'
                        }`}
                      >
                        {formatCurrency(p.costSummary.nationalAverage)}
                        {winners[p.slug]?.cost && <WinnerBadge />}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-accent-100">
                    <td className="py-2.5 pr-4 text-muted font-medium">Typical Range</td>
                    {activeProjects.map((p) => (
                      <td key={p.slug} className="text-center py-2.5 px-2 text-text">
                        {formatRange(p.costSummary.typicalLow, p.costSummary.typicalHigh)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-accent-100">
                    <td className="py-2.5 pr-4 text-muted font-medium">Typical Timeline</td>
                    {activeProjects.map((p) => (
                      <td
                        key={p.slug}
                        className={`text-center py-2.5 px-2 font-medium ${
                          winners[p.slug]?.timeline ? 'text-success' : 'text-text'
                        }`}
                      >
                        {p.timeline?.typical || 'N/A'}
                        {winners[p.slug]?.timeline && <WinnerBadge />}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-muted font-medium">DIY Feasibility</td>
                    {activeProjects.map((p) => (
                      <td
                        key={p.slug}
                        className={`text-center py-2.5 px-2 font-medium ${
                          winners[p.slug]?.diy ? 'text-success' : 'text-text'
                        }`}
                      >
                        {p.diyVsPro?.diyFeasibility || 'N/A'}
                        {winners[p.slug]?.diy && <WinnerBadge />}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Detailed comparison columns */}
          <div
            className={`grid gap-6 ${
              activeProjects.length === 3
                ? 'grid-cols-1 lg:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2'
            }`}
          >
            {activeProjects.map((p) => (
              <ComparisonColumn
                key={p.slug}
                data={p}
                isWinner={winners[p.slug] || { cost: false, timeline: false, diy: false }}
              />
            ))}
          </div>

          {/* Regional cost comparison */}
          {activeProjects.every((p) => p.regionalMultipliers) && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <SectionHeading>Regional Cost Comparison (Mid-Range)</SectionHeading>
              <p className="text-sm text-muted mb-4">
                How each project&apos;s cost shifts depending on where you live, based on the
                mid-range total.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-2.5 pr-4 font-semibold text-primary">Region</th>
                      {activeProjects.map((p) => (
                        <th key={p.slug} className="text-center py-2.5 px-3 font-semibold text-primary">
                          {p.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {['northeast', 'westCoast', 'southeast', 'midwest', 'mountainWest'].map(
                      (regionKey) => {
                        // Use the first project that has this region for the label
                        const labelProject = activeProjects.find(
                          (p) => p.regionalMultipliers?.[regionKey]
                        );
                        const regionLabel =
                          labelProject?.regionalMultipliers?.[regionKey]?.label || regionKey;
                        return (
                          <tr key={regionKey} className="border-b border-gray-100">
                            <td className="py-2.5 pr-4 font-medium text-text">{regionLabel}</td>
                            {activeProjects.map((p) => {
                              const region = p.regionalMultipliers?.[regionKey];
                              const midTotal = p.costBreakdown?.midRange?.total;
                              if (!region || !midTotal) {
                                return (
                                  <td key={p.slug} className="text-center py-2.5 px-3 text-muted">
                                    N/A
                                  </td>
                                );
                              }
                              const avgMultiplier = (region.min + region.max) / 2;
                              const adjusted = Math.round(midTotal * avgMultiplier);
                              const pctChange = Math.round((avgMultiplier - 1) * 100);
                              return (
                                <td key={p.slug} className="text-center py-2.5 px-3">
                                  <span className="font-medium text-text">
                                    {formatCurrency(adjusted)}
                                  </span>
                                  <span
                                    className={`block text-xs mt-0.5 ${
                                      pctChange > 0
                                        ? 'text-red-500'
                                        : pctChange < 0
                                        ? 'text-success'
                                        : 'text-muted'
                                    }`}
                                  >
                                    {pctChange > 0 ? '+' : ''}
                                    {pctChange}%
                                  </span>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Savings tips side by side */}
          {activeProjects.some((p) => p.savingsTips && p.savingsTips.length > 0) && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
              <SectionHeading>Top Money-Saving Tips</SectionHeading>
              <div
                className={`grid gap-6 ${
                  activeProjects.length === 3
                    ? 'grid-cols-1 lg:grid-cols-3'
                    : 'grid-cols-1 md:grid-cols-2'
                }`}
              >
                {activeProjects.map((p) => (
                  <div key={p.slug}>
                    <h4 className="font-semibold text-primary text-sm mb-3">{p.title}</h4>
                    {p.savingsTips && p.savingsTips.length > 0 ? (
                      <ul className="space-y-2">
                        {p.savingsTips.slice(0, 4).map((tip, i) => (
                          <li key={i} className="flex gap-2 text-sm text-text">
                            <svg
                              className="w-4 h-4 text-success mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted">No tips available</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
