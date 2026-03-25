import { getAllPosts, getBlogCategories } from '@/app/lib/blog';
import BlogIndex from '@/app/components/BlogIndex';

export const metadata = {
  title: 'Home Renovation Blog',
  description: 'In-depth guides on renovation costs, ROI analysis, material comparisons, and money-saving strategies for homeowners.',
};

export default function BlogPage() {
  const posts = getAllPosts().map(p => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    publishedDate: p.publishedDate,
    readTime: p.readTime,
  }));
  const categories = getBlogCategories();

  return <BlogIndex posts={posts} categories={categories} />;
}
