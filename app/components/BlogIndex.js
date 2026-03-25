'use client';

import { useState } from 'react';
import Link from 'next/link';

const categoryLabels = {
  'how-much': 'How Much',
  'comparison': 'Comparisons',
  'roi': 'ROI & Worth It',
  'decision-guide': 'Decision Guides',
  'seasonal': 'Seasonal & Trends',
};

export default function BlogIndex({ posts, categories }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  return (
    <div className="py-10 sm:py-14">
      <div className="section-width section-padding">
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span className="text-muted-light">&gt;</span>
          <span className="text-primary font-medium">Blog</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">Home Renovation Blog</h1>
          <p className="mt-2 text-lg text-muted max-w-2xl">
            In-depth guides on renovation costs, ROI analysis, material comparisons, and money-saving strategies to help you make smarter home improvement decisions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-primary text-white'
                : 'bg-white text-muted border border-gray-200 hover:border-accent hover:text-accent'
            }`}
          >
            All Posts ({posts.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-white text-muted border border-gray-200 hover:border-accent hover:text-accent'
              }`}
            >
              {categoryLabels[cat] || cat} ({posts.filter(p => p.category === cat).length})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden card-hover"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-accent bg-accent-50 px-2 py-0.5 rounded-full">
                    {categoryLabels[post.category] || post.category}
                  </span>
                  <span className="text-xs text-muted">
                    {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-muted mt-2 line-clamp-3">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span className="text-muted">{post.readTime} min read</span>
                  <span className="text-accent font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 ml-auto">
                    Read more
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
