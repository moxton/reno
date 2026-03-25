import categoriesData from '@/data/categories.json';

export function getAllCategories() {
  return categoriesData;
}

export function getCategoryBySlug(slug) {
  return categoriesData.find(c => c.slug === slug) || null;
}

export function getCategorySlugs() {
  return categoriesData.map(c => c.slug);
}
