import fs from 'fs';
import path from 'path';

// Load full project data from JSON files
function loadProjectDataFiles() {
  const projectsDir = path.join(process.cwd(), 'data', 'projects');
  try {
    const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));
    return files.map(f => {
      const raw = fs.readFileSync(path.join(projectsDir, f), 'utf-8');
      return JSON.parse(raw);
    });
  } catch {
    return [];
  }
}

// Lightweight seed data for search, cards, and pages without full JSON data files yet.
// Projects with JSON data files will have their summaries overridden by the full data.
const seedProjects = [
  { slug: 'basement-finishing', title: 'Basement Finishing', category: 'basement', nationalAverage: 22000, typicalRange: '$10,000 - $40,000', keywords: ['finish basement cost', 'basement remodel', 'basement renovation cost'] },
  { slug: 'siding-replacement', title: 'Siding Replacement', category: 'exterior', nationalAverage: 14000, typicalRange: '$7,000 - $25,000', keywords: ['siding cost', 'vinyl siding cost', 'fiber cement siding'] },
  { slug: 'garage-door-replacement', title: 'Garage Door Replacement', category: 'exterior', nationalAverage: 1400, typicalRange: '$750 - $2,500', keywords: ['garage door cost', 'new garage door', 'garage door replacement cost'] },
  { slug: 'driveway-replacement', title: 'Driveway Replacement', category: 'exterior', nationalAverage: 5000, typicalRange: '$2,500 - $10,000', keywords: ['driveway cost', 'concrete driveway cost', 'asphalt driveway cost'] },
  { slug: 'electrical-panel-upgrade', title: 'Electrical Panel Upgrade', category: 'electrical', nationalAverage: 2000, typicalRange: '$1,000 - $3,500', keywords: ['panel upgrade cost', '200 amp panel upgrade', 'electrical panel cost'] },
  { slug: 'water-heater-replacement', title: 'Water Heater Replacement', category: 'plumbing', nationalAverage: 1500, typicalRange: '$800 - $3,000', keywords: ['water heater cost', 'new water heater cost', 'water heater installation'] },
  { slug: 'kitchen-countertop-replacement', title: 'Countertop Replacement', category: 'kitchen', nationalAverage: 4500, typicalRange: '$1,500 - $10,000', keywords: ['countertop cost', 'granite countertop cost', 'quartz countertop cost'] },
  { slug: 'shower-replacement', title: 'Shower Replacement', category: 'bathroom', nationalAverage: 5500, typicalRange: '$2,500 - $10,000', keywords: ['shower remodel cost', 'new shower cost', 'shower replacement cost'] },
  { slug: 'heat-pump-installation', title: 'Heat Pump Installation', category: 'hvac-energy', nationalAverage: 8000, typicalRange: '$4,000 - $14,000', keywords: ['heat pump cost', 'heat pump installation cost', 'mini split cost'] },
  { slug: 'swimming-pool-installation', title: 'Swimming Pool Installation', category: 'outdoor-living', nationalAverage: 45000, typicalRange: '$20,000 - $80,000', keywords: ['pool cost', 'inground pool cost', 'swimming pool installation cost'] },
  { slug: 'solar-panel-installation', title: 'Solar Panel Installation', category: 'hvac-energy', nationalAverage: 20000, typicalRange: '$12,000 - $30,000', keywords: ['solar panel cost', 'solar installation cost', 'home solar cost'] },
  { slug: 'room-addition', title: 'Room Addition', category: 'structural', nationalAverage: 55000, typicalRange: '$25,000 - $100,000', keywords: ['room addition cost', 'home addition cost', 'add a room cost'] },
  { slug: 'foundation-repair', title: 'Foundation Repair', category: 'structural', nationalAverage: 5000, typicalRange: '$2,000 - $12,000', keywords: ['foundation repair cost', 'fix foundation cost', 'foundation crack repair'] },
  { slug: 'carpet-installation', title: 'Carpet Installation', category: 'flooring', nationalAverage: 2500, typicalRange: '$1,000 - $5,000', keywords: ['carpet cost', 'new carpet cost', 'carpet installation cost'] },
  { slug: 'exterior-painting', title: 'Exterior Painting', category: 'painting-walls', nationalAverage: 4500, typicalRange: '$2,000 - $8,000', keywords: ['exterior painting cost', 'house painting cost', 'paint house exterior'] },
  { slug: 'smart-home-wiring', title: 'Smart Home Wiring', category: 'smart-home', nationalAverage: 3000, typicalRange: '$1,500 - $6,000', keywords: ['smart home wiring cost', 'home automation cost', 'structured wiring'] },
  { slug: 'whole-house-repiping', title: 'Whole-House Repiping', category: 'plumbing', nationalAverage: 7500, typicalRange: '$4,000 - $15,000', keywords: ['repiping cost', 'repipe house cost', 'whole house repiping cost'] },
  { slug: 'attic-insulation', title: 'Attic Insulation', category: 'hvac-energy', nationalAverage: 2000, typicalRange: '$1,000 - $3,500', keywords: ['attic insulation cost', 'insulation cost', 'blown in insulation cost'] },
  { slug: 'patio-installation', title: 'Patio Installation', category: 'outdoor-living', nationalAverage: 4500, typicalRange: '$2,000 - $8,000', keywords: ['patio cost', 'concrete patio cost', 'paver patio cost'] },
  { slug: 'kitchen-cabinet-refacing', title: 'Kitchen Cabinet Refacing', category: 'kitchen', nationalAverage: 8000, typicalRange: '$4,000 - $14,000', keywords: ['cabinet refacing cost', 'reface cabinets cost', 'cabinet refinishing'] },
];

// Merge: JSON data files take priority, seed fills gaps
function buildProjectList() {
  const dataFiles = loadProjectDataFiles();
  const dataFileSlugs = new Set(dataFiles.map(d => d.slug));

  const fromData = dataFiles.map(d => ({
    slug: d.slug,
    title: d.title,
    category: d.category,
    nationalAverage: d.costSummary.nationalAverage,
    typicalRange: `$${d.costSummary.typicalLow.toLocaleString()} - $${d.costSummary.typicalHigh.toLocaleString()}`,
    keywords: d.seo?.secondaryKeywords || [],
    hasFullData: true,
  }));

  const fromSeed = seedProjects
    .filter(s => !dataFileSlugs.has(s.slug))
    .map(s => ({ ...s, hasFullData: false }));

  return [...fromData, ...fromSeed];
}

const projects = buildProjectList();

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug) {
  return projects.find(p => p.slug === slug) || null;
}

export function getProjectsByCategory(categorySlug) {
  return projects.filter(p => p.category === categorySlug);
}

export function getPopularProjects(count = 8) {
  const popularSlugs = [
    'full-kitchen-remodel',
    'bathroom-remodel',
    'roof-replacement',
    'hardwood-floor-installation',
    'deck-building',
    'interior-painting',
    'central-ac-installation',
    'window-replacement',
  ];
  return popularSlugs
    .map(slug => projects.find(p => p.slug === slug))
    .filter(Boolean)
    .slice(0, count);
}

// Load full project data for individual project pages
export function getFullProjectData(slug) {
  const projectsDir = path.join(process.cwd(), 'data', 'projects');
  const filePath = path.join(projectsDir, `${slug}.json`);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Get all slugs that have full data files
export function getProjectSlugsWithData() {
  const projectsDir = path.join(process.cwd(), 'data', 'projects');
  try {
    return fs.readdirSync(projectsDir)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));
  } catch {
    return [];
  }
}
