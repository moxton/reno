import { getCategorySlugs } from '@/app/lib/categories';
import { getProjectSlugsWithData, getFullProjectData } from '@/app/lib/projects';
import { getCalculatorSlugs } from '@/app/lib/calculators';
import { getPostSlugs } from '@/app/lib/blog';

export default function sitemap() {
  const baseUrl = 'https://homeprojectcostguide.com';
  const categorySlugs = getCategorySlugs();

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/projects/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/calculators/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/methodology/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const categoryPages = categorySlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const projectPages = getProjectSlugsWithData().map((slug) => {
    const data = getFullProjectData(slug);
    return {
      url: `${baseUrl}/projects/${data.category}/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    };
  });

  const calculatorPages = getCalculatorSlugs().map((slug) => ({
    url: `${baseUrl}/calculators/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogPages = getPostSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...projectPages, ...calculatorPages, ...blogPages];
}
