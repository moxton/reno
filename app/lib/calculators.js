import fs from 'fs';
import path from 'path';

const calculatorsDir = path.join(process.cwd(), 'data', 'calculators');

export function getAllCalculators() {
  try {
    const files = fs.readdirSync(calculatorsDir).filter(f => f.endsWith('.json'));
    return files.map(f => {
      const raw = fs.readFileSync(path.join(calculatorsDir, f), 'utf-8');
      return JSON.parse(raw);
    });
  } catch {
    return [];
  }
}

export function getCalculatorBySlug(slug) {
  const filePath = path.join(calculatorsDir, `${slug}.json`);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getCalculatorSlugs() {
  try {
    return fs.readdirSync(calculatorsDir)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));
  } catch {
    return [];
  }
}
