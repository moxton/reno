import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'data', 'blog');

export function getAllPosts() {
  try {
    const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.json'));
    return files
      .map(f => {
        const raw = fs.readFileSync(path.join(blogDir, f), 'utf-8');
        return JSON.parse(raw);
      })
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
  } catch {
    return [];
  }
}

export function getPostBySlug(slug) {
  const filePath = path.join(blogDir, `${slug}.json`);
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getPostSlugs() {
  try {
    return fs.readdirSync(blogDir)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));
  } catch {
    return [];
  }
}

export function getPostsByCategory(category) {
  return getAllPosts().filter(p => p.category === category);
}

export function getBlogCategories() {
  const posts = getAllPosts();
  const cats = new Set(posts.map(p => p.category));
  return Array.from(cats);
}
