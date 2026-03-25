'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';

// US States for regional dropdown
const US_STATES = [
  { code: '', label: 'National Average' },
  { code: 'AL', label: 'Alabama' }, { code: 'AK', label: 'Alaska' }, { code: 'AZ', label: 'Arizona' },
  { code: 'AR', label: 'Arkansas' }, { code: 'CA', label: 'California' }, { code: 'CO', label: 'Colorado' },
  { code: 'CT', label: 'Connecticut' }, { code: 'DE', label: 'Delaware' }, { code: 'FL', label: 'Florida' },
  { code: 'GA', label: 'Georgia' }, { code: 'HI', label: 'Hawaii' }, { code: 'ID', label: 'Idaho' },
  { code: 'IL', label: 'Illinois' }, { code: 'IN', label: 'Indiana' }, { code: 'IA', label: 'Iowa' },
  { code: 'KS', label: 'Kansas' }, { code: 'KY', label: 'Kentucky' }, { code: 'LA', label: 'Louisiana' },
  { code: 'ME', label: 'Maine' }, { code: 'MD', label: 'Maryland' }, { code: 'MA', label: 'Massachusetts' },
  { code: 'MI', label: 'Michigan' }, { code: 'MN', label: 'Minnesota' }, { code: 'MS', label: 'Mississippi' },
  { code: 'MO', label: 'Missouri' }, { code: 'MT', label: 'Montana' }, { code: 'NE', label: 'Nebraska' },
  { code: 'NV', label: 'Nevada' }, { code: 'NH', label: 'New Hampshire' }, { code: 'NJ', label: 'New Jersey' },
  { code: 'NM', label: 'New Mexico' }, { code: 'NY', label: 'New York' }, { code: 'NC', label: 'North Carolina' },
  { code: 'ND', label: 'North Dakota' }, { code: 'OH', label: 'Ohio' }, { code: 'OK', label: 'Oklahoma' },
  { code: 'OR', label: 'Oregon' }, { code: 'PA', label: 'Pennsylvania' }, { code: 'RI', label: 'Rhode Island' },
  { code: 'SC', label: 'South Carolina' }, { code: 'SD', label: 'South Dakota' }, { code: 'TN', label: 'Tennessee' },
  { code: 'TX', label: 'Texas' }, { code: 'UT', label: 'Utah' }, { code: 'VT', label: 'Vermont' },
  { code: 'VA', label: 'Virginia' }, { code: 'WA', label: 'Washington' }, { code: 'WV', label: 'West Virginia' },
  { code: 'WI', label: 'Wisconsin' }, { code: 'WY', label: 'Wyoming' },
];

// Animated number component
function AnimatedNumber({ value, format = 'currency' }) {
  const [displayValue, setDisplayValue] = useState(value);
  const animationRef = useRef(null);
  const previousValue = useRef(value);

  useEffect(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const startValue = previousValue.current;
    const endValue = value;
    const startTime = performance.now();
    const duration = 300;

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * eased;
      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        previousValue.current = endValue;
      }
    }

    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [value]);

  const formatted = format === 'currency'
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(displayValue))
    : format === 'percent'
      ? `${displayValue >= 0 ? '+' : ''}${Math.round(displayValue)}%`
      : Math.round(displayValue).toLocaleString();

  return <span className="tabular-nums">{formatted}</span>;
}

// Format currency for static display
function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n));
}

export default function CostCalculator({ config }) {
  const [size, setSize] = useState(config.sizeInput.default);
  const [tier, setTier] = useState('midRange');
  const [state, setState] = useState('');
  const [options, setOptions] = useState(() => {
    const initial = {};
    config.options.forEach(opt => { initial[opt.id] = opt.default; });
    return initial;
  });
  const [showPrintView, setShowPrintView] = useState(false);
  const printRef = useRef(null);

  const toggleOption = useCallback((id) => {
    setOptions(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Calculate costs
  const calculation = useMemo(() => {
    const tierData = config.tiers[tier];
    const multiplier = state ? (config.regionalMultipliers[state] || 1) : 1;

    const materialBase = tierData.materialPerUnit * size;
    const laborBase = tierData.laborPerUnit * size;
    const permitBase = tierData.permitBase;

    let optionsCost = 0;
    const optionBreakdown = [];
    config.options.forEach(opt => {
      if (options[opt.id]) {
        const cost = opt.costByTier[tier];
        optionsCost += cost;
        optionBreakdown.push({ label: opt.label, cost });
      }
    });

    const subtotalBeforeRegion = materialBase + laborBase + permitBase + optionsCost;
    const total = subtotalBeforeRegion * multiplier;
    const materials = materialBase * multiplier;
    const labor = laborBase * multiplier;
    const permits = permitBase * multiplier;
    const optionsAdjusted = optionsCost * multiplier;

    const costPerUnit = size > 0 ? total / size : 0;
    const vsNational = config.nationalAverage > 0
      ? ((total - config.nationalAverage) / config.nationalAverage) * 100
      : 0;

    return {
      total,
      materials,
      labor,
      permits,
      optionsAdjusted,
      optionBreakdown: optionBreakdown.map(o => ({ ...o, cost: o.cost * multiplier })),
      costPerUnit,
      vsNational,
      multiplier,
      tierLabel: tierData.label,
      tierDescription: tierData.description,
    };
  }, [size, tier, state, options, config]);

  const tierKeys = Object.keys(config.tiers);
  const selectedState = US_STATES.find(s => s.code === state);

  // Print summary handler
  const handlePrint = useCallback(() => {
    setShowPrintView(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => setShowPrintView(false), 500);
    }, 100);
  }, []);

  // Share handler
  const handleShare = useCallback(async () => {
    const text = `${config.title}\n\nEstimated Cost: ${fmt(calculation.total)}\nTier: ${calculation.tierLabel}\nSize: ${size.toLocaleString()} ${config.sizeInput.unit}\n${selectedState?.label ? `Location: ${selectedState.label}` : 'National Average'}\n\nPowered by HomeProjectCostGuide.com`;
    if (navigator.share) {
      try {
        await navigator.share({ title: config.title, text });
      } catch { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert('Estimate copied to clipboard!');
      } catch { /* fallback */ }
    }
  }, [config.title, calculation.total, calculation.tierLabel, size, config.sizeInput.unit, selectedState]);

  return (
    <>
      {/* Print-only view */}
      {showPrintView && (
        <div className="fixed inset-0 bg-white z-50 p-8 overflow-auto print:static print:p-0" ref={printRef}>
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-primary mb-1">{config.title}</h1>
            <p className="text-sm text-muted mb-6">Generated by HomeProjectCostGuide.com - {new Date().toLocaleDateString()}</p>
            <div className="border-2 border-accent rounded-lg p-6 mb-6">
              <div className="text-center">
                <p className="text-sm text-muted uppercase tracking-wide">Estimated Total Cost</p>
                <p className="text-4xl font-bold text-primary mt-1">{fmt(calculation.total)}</p>
              </div>
            </div>
            <table className="w-full text-sm mb-6">
              <tbody>
                <tr className="border-b"><td className="py-2 font-medium">Quality Tier</td><td className="py-2 text-right">{calculation.tierLabel}</td></tr>
                <tr className="border-b"><td className="py-2 font-medium">{config.sizeInput.label}</td><td className="py-2 text-right">{size.toLocaleString()} {config.sizeInput.unit}</td></tr>
                <tr className="border-b"><td className="py-2 font-medium">Location</td><td className="py-2 text-right">{selectedState?.label || 'National Average'}{state ? ` (${calculation.multiplier}x)` : ''}</td></tr>
                <tr className="border-b"><td className="py-2 font-medium">Cost per {config.sizeInput.unit}</td><td className="py-2 text-right">{fmt(calculation.costPerUnit)}</td></tr>
              </tbody>
            </table>
            <h2 className="font-semibold text-primary mb-2">Cost Breakdown</h2>
            <table className="w-full text-sm mb-6">
              <tbody>
                <tr className="border-b"><td className="py-2">Materials</td><td className="py-2 text-right tabular-nums">{fmt(calculation.materials)}</td></tr>
                <tr className="border-b"><td className="py-2">Labor</td><td className="py-2 text-right tabular-nums">{fmt(calculation.labor)}</td></tr>
                {calculation.permits > 0 && <tr className="border-b"><td className="py-2">Permits</td><td className="py-2 text-right tabular-nums">{fmt(calculation.permits)}</td></tr>}
                {calculation.optionBreakdown.map((o, i) => (
                  <tr key={i} className="border-b"><td className="py-2">{o.label}</td><td className="py-2 text-right tabular-nums">{fmt(o.cost)}</td></tr>
                ))}
                <tr className="border-t-2 border-primary font-bold"><td className="py-2">Total</td><td className="py-2 text-right tabular-nums">{fmt(calculation.total)}</td></tr>
              </tbody>
            </table>
            <p className="text-xs text-muted">This is an estimate based on national averages adjusted for your region. Actual costs may vary based on specific project conditions, contractor availability, and material prices. Get at least 3 quotes from licensed contractors.</p>
            <button onClick={() => setShowPrintView(false)} className="mt-6 text-sm text-accent underline print:hidden">Close Print View</button>
          </div>
        </div>
      )}

      {/* Calculator */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-6 py-5">
          <h2 className="text-xl font-bold text-white">{config.title}</h2>
          <p className="text-primary-200 text-sm mt-1">{config.description}</p>
        </div>

        <div className="p-6 lg:p-8">
          {/* Input Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Size Input */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                {config.sizeInput.label}
                <span className="text-muted font-normal ml-1">({config.sizeInput.unit})</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={config.sizeInput.min}
                  max={config.sizeInput.max}
                  step={config.sizeInput.step}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="flex-1 h-2 rounded-full appearance-none bg-gray-200 accent-accent cursor-pointer"
                />
                <input
                  type="number"
                  min={config.sizeInput.min}
                  max={config.sizeInput.max}
                  step={config.sizeInput.step}
                  value={size}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (v >= config.sizeInput.min && v <= config.sizeInput.max) setSize(v);
                  }}
                  className="w-24 px-3 py-2 text-right border border-gray-200 rounded-lg text-sm font-medium tabular-nums focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                />
              </div>
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>{config.sizeInput.min.toLocaleString()}</span>
                <span>{config.sizeInput.max.toLocaleString()} {config.sizeInput.unit}</span>
              </div>
            </div>

            {/* State Dropdown */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Your State
                {state && (
                  <span className={`ml-2 text-xs font-normal ${calculation.multiplier > 1 ? 'text-red-500' : calculation.multiplier < 1 ? 'text-success' : 'text-muted'}`}>
                    ({calculation.multiplier > 1 ? '+' : ''}{Math.round((calculation.multiplier - 1) * 100)}% vs national avg)
                  </span>
                )}
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-white"
              >
                {US_STATES.map(s => (
                  <option key={s.code} value={s.code}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quality Tier Selector */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-primary mb-3">Quality Tier</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tierKeys.map((key) => {
                const t = config.tiers[key];
                const isActive = tier === key;
                return (
                  <button
                    key={key}
                    onClick={() => setTier(key)}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      isActive
                        ? 'border-accent bg-accent-50 shadow-sm'
                        : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute top-3 right-3 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    <span className={`text-sm font-semibold ${isActive ? 'text-accent-700' : 'text-primary'}`}>
                      {t.label}
                    </span>
                    <p className="text-xs text-muted mt-1 leading-relaxed">{t.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Options */}
          {config.options.length > 0 && (
            <div className="mb-8">
              <label className="block text-sm font-medium text-primary mb-3">Project Options</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {config.options.map((opt) => {
                  const cost = opt.costByTier[tier];
                  const isEnabled = options[opt.id];
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleOption(opt.id)}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-all duration-150 ${
                        isEnabled
                          ? 'border-accent-200 bg-accent-50'
                          : 'border-gray-100 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          isEnabled ? 'bg-accent border-accent' : 'border-gray-300'
                        }`}>
                          {isEnabled && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm font-medium text-primary">{opt.label}</span>
                      </div>
                      {cost > 0 && (
                        <span className={`text-xs font-medium tabular-nums ${isEnabled ? 'text-accent-700' : 'text-muted'}`}>
                          +{fmt(cost)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-gray-100 my-8" />

          {/* Results */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Total Estimate - Featured */}
            <div className="lg:col-span-2 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6 border border-accent-200">
              <p className="text-sm font-medium text-accent-700 uppercase tracking-wide">Estimated Total</p>
              <p className="text-4xl sm:text-5xl font-bold text-primary mt-2">
                <AnimatedNumber value={calculation.total} />
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-accent-700">Cost per {config.sizeInput.unit}</span>
                  <span className="font-semibold text-primary tabular-nums">
                    <AnimatedNumber value={calculation.costPerUnit} />
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-accent-700">vs National Average</span>
                  <span className={`font-semibold tabular-nums ${calculation.vsNational > 0 ? 'text-red-600' : calculation.vsNational < 0 ? 'text-success' : 'text-primary'}`}>
                    <AnimatedNumber value={calculation.vsNational} format="percent" />
                  </span>
                </div>
              </div>
            </div>

            {/* Itemized Breakdown */}
            <div className="lg:col-span-3">
              <p className="text-sm font-medium text-primary mb-3">Itemized Breakdown</p>
              <div className="space-y-2">
                <BreakdownRow label="Materials" value={calculation.materials} total={calculation.total} color="bg-blue-500" />
                <BreakdownRow label="Labor" value={calculation.labor} total={calculation.total} color="bg-accent" />
                {calculation.permits > 0 && (
                  <BreakdownRow label="Permits" value={calculation.permits} total={calculation.total} color="bg-gray-400" />
                )}
                {calculation.optionBreakdown.map((o, i) => (
                  <BreakdownRow key={i} label={o.label} value={o.cost} total={calculation.total} color="bg-primary-300" />
                ))}
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-sm font-bold text-primary">Total</span>
                  <span className="text-lg font-bold text-primary tabular-nums">
                    <AnimatedNumber value={calculation.total} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
              </svg>
              Print Estimate
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary text-sm font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              Share Estimate
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted mt-6 leading-relaxed">
            This calculator provides estimates based on national averages adjusted for your region. Actual costs may vary significantly based on specific project conditions, contractor availability, material prices, and local market factors. Always get at least 3 quotes from licensed, insured contractors before starting your project.
          </p>
        </div>
      </div>
    </>
  );
}

// Breakdown row with animated bar
function BreakdownRow({ label, value, total, color }) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted w-28 sm:w-36 shrink-0 truncate">{label}</span>
      <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${color}`}
          style={{ width: `${Math.max(pct, 2)}%` }}
        />
      </div>
      <span className="text-sm font-medium text-primary tabular-nums w-20 text-right shrink-0">
        <AnimatedNumber value={value} />
      </span>
    </div>
  );
}
