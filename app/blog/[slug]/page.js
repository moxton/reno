import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import { getPostBySlug, getPostSlugs, getAllPosts } from '@/app/lib/blog';

export function generateStaticParams() {
  return getPostSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  const description = post.seo?.metaDescription || post.excerpt;
  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.publishedDate,
      url: `https://homeprojectcostguide.com/blog/${post.slug}/`,
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description,
    },
    alternates: {
      canonical: `https://homeprojectcostguide.com/blog/${post.slug}/`,
    },
  };
}

const categoryLabels = {
  'how-much': 'How Much',
  'comparison': 'Comparisons',
  'roi': 'ROI & Worth It',
  'decision-guide': 'Decision Guides',
  'seasonal': 'Seasonal & Trends',
};

export default function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug)
    .slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seo?.metaDescription || post.excerpt,
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    author: { '@type': 'Organization', name: 'Home Project Cost Guide' },
    publisher: {
      '@type': 'Organization',
      name: 'Home Project Cost Guide',
      url: 'https://homeprojectcostguide.com',
      logo: { '@type': 'ImageObject', url: 'https://homeprojectcostguide.com/favicon.svg' },
    },
    mainEntityOfPage: `https://homeprojectcostguide.com/blog/${post.slug}/`,
  };

  return (
    <div className="py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="section-width section-padding">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog/' },
            { label: post.title },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2">
          {/* Post Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-accent-700 bg-accent-50 px-2.5 py-1 rounded-full">
                {categoryLabels[post.category] || post.category}
              </span>
              <span className="text-sm text-muted">
                {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="text-sm text-muted">{post.readTime} min read</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary leading-tight">{post.title}</h1>
            {post.subtitle && (
              <p className="mt-3 text-lg text-muted">{post.subtitle}</p>
            )}
            <p className="mt-2 text-xs text-muted-light">
              Last updated: {new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Key Takeaways */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="bg-accent-50 border border-accent-200 rounded-xl p-6 mb-10">
              <h2 className="text-sm font-bold text-accent-700 uppercase tracking-wide mb-3">Key Takeaways</h2>
              <ul className="space-y-2">
                {post.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-primary">
                    <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Post Content */}
          <div className="prose-custom">
            {post.sections.map((section, i) => (
              <section key={i} className={`mb-6 ${i % 2 === 1 ? 'bg-gray-50/50 rounded-lg p-5 -mx-1' : 'py-4'}`}>
                {section.heading && (
                  <h2 id={section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')} className="text-xl sm:text-2xl font-bold text-primary mb-4 scroll-mt-24">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs && section.paragraphs.map((p, j) => (
                  <p key={j} className="text-text leading-relaxed mb-4 text-[15px] max-w-prose">{p}</p>
                ))}
                {section.table && (
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          {section.table.headers.map((h, k) => (
                            <th key={k} className="text-left py-3 pr-4 font-semibold text-primary">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="text-muted">
                        {section.table.rows.map((row, k) => (
                          <tr key={k} className="border-b border-gray-100">
                            {row.map((cell, l) => (
                              <td key={l} className={`py-3 pr-4 ${l === 0 ? 'font-medium text-text' : 'tabular-nums'}`}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {section.callout && (
                  <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 mb-4">
                    <p className="text-sm text-primary font-medium">{section.callout}</p>
                  </div>
                )}
                {section.list && (
                  <ul className="space-y-2 mb-4">
                    {section.list.map((item, k) => (
                      <li key={k} className="flex items-start gap-2 text-[15px] text-text">
                        <span className="text-accent mt-1.5 flex-shrink-0">-</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Internal Links (mobile only - shown in sidebar on desktop) */}
          {post.relatedProjects && post.relatedProjects.length > 0 && (
            <div className="border-t border-gray-200 pt-8 mt-10 lg:hidden">
              <h2 className="text-lg font-semibold text-primary mb-4">Related Cost Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {post.relatedProjects.map((proj, i) => (
                  <Link
                    key={i}
                    href={proj.href}
                    className="flex items-center justify-between bg-white rounded-lg border border-gray-100 p-4 hover:border-accent/30 hover:bg-accent-50/30 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-primary">{proj.title}</p>
                      {proj.subtitle && <p className="text-xs text-muted mt-0.5">{proj.subtitle}</p>}
                    </div>
                    <svg className="w-4 h-4 text-muted-light flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

          {/* Sidebar - Table of Contents */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              {/* Key Takeaways (sidebar version on desktop) */}
              <nav className="bg-white rounded-xl border border-gray-100 p-5 hidden lg:block">
                <h3 className="text-sm font-semibold text-primary mb-3">On This Page</h3>
                <ul className="space-y-2 text-xs text-muted">
                  {post.sections.filter(s => s.heading).map((section, i) => {
                    const id = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    return (
                      <li key={i}>
                        <a href={`#${id}`} className="hover:text-accent transition-colors block py-0.5">
                          {section.heading}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Related Cost Guides in sidebar */}
              {post.relatedProjects && post.relatedProjects.length > 0 && (
                <div className="mt-6 bg-white rounded-xl border border-gray-100 p-5 hidden lg:block">
                  <h3 className="text-sm font-semibold text-primary mb-3">Related Cost Guides</h3>
                  <ul className="space-y-2">
                    {post.relatedProjects.map((proj, i) => (
                      <li key={i}>
                        <Link href={proj.href} className="text-xs text-muted hover:text-accent transition-colors block py-0.5">
                          {proj.title}
                          {proj.subtitle && <span className="text-muted-light ml-1">- {proj.subtitle}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* More Posts - full width */}
      <div className="mt-16 border-t border-gray-200 bg-gray-50/60">
        <div className="section-width section-padding py-10">
          <h2 className="text-xl font-semibold text-primary mb-6">More from the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}/`}
                className="group bg-white rounded-xl border border-gray-100 p-5 card-hover"
              >
                <span className="text-xs font-medium text-accent-700">{categoryLabels[rp.category] || rp.category}</span>
                <h3 className="mt-1 font-semibold text-primary group-hover:text-accent transition-colors leading-snug">{rp.title}</h3>
                <p className="text-sm text-muted mt-2 line-clamp-2">{rp.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
