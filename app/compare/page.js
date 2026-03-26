import { getAllProjects, getProjectSlugsWithData, getFullProjectData } from '@/app/lib/projects';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import ComparisonTool from '@/app/components/ComparisonTool';

export const metadata = {
  title: 'Compare Home Projects Side by Side',
  description:
    'Compare costs, timelines, and ROI for 2-3 home improvement projects side by side. See which renovation gives you the most value for your budget.',
  openGraph: {
    title: 'Compare Home Projects Side by Side | Home Project Cost Guide',
    description:
      'Compare costs, timelines, and ROI for 2-3 home improvement projects side by side.',
  },
};

export default function ComparePage() {
  const allProjects = getAllProjects();
  const projectSlugs = getProjectSlugsWithData();

  // Pre-load all full project data so the client component has everything it needs
  const allFullData = {};
  for (const slug of projectSlugs) {
    const data = getFullProjectData(slug);
    if (data) {
      allFullData[slug] = data;
    }
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Compare Projects' },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-site mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
            Compare Home Projects Side by Side
          </h1>
          <p className="text-muted text-lg max-w-2xl">
            Trying to decide between two renovations? Pick up to three projects
            and compare costs, timelines, DIY feasibility, and more - all in one
            view.
          </p>
        </div>

        <ComparisonTool
          projects={allProjects}
          projectSlugs={projectSlugs}
          allFullData={allFullData}
        />
      </div>
    </div>
  );
}
