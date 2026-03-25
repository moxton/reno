import Breadcrumbs from '@/app/components/Breadcrumbs';
import Link from 'next/link';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Home Project Cost Guide - our mission, methodology, and commitment to providing accurate, research-backed home improvement cost data.',
};

export default function AboutPage() {
  return (
    <div className="py-10 sm:py-14">
      <div className="section-width section-padding">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">About Home Project Cost Guide</h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            We built this site because finding honest, detailed home improvement cost information shouldn&apos;t be this hard.
          </p>

          {/* Mission */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
            <div className="mt-4 space-y-4 text-text leading-relaxed">
              <p>
                Most &ldquo;cost guide&rdquo; sites exist to capture your phone number and sell it to contractors. That&apos;s not us. Home Project Cost Guide exists to give you real numbers - sourced from real data - so you can walk into a contractor conversation informed.
              </p>
              <p>
                We believe homeowners deserve better than vague ranges and generic advice. When you&apos;re about to spend $30,000 on a kitchen remodel, you should know exactly what that money buys, what drives the price up or down, and whether the quote you&apos;re looking at is reasonable for your area.
              </p>
              <p>
                Every cost guide on this site follows the same rigorous process: we cross-reference at least two independent data sources, break costs down by component, adjust for regional differences, and explain what actually drives the numbers. No fluff. No lead-gen forms.
              </p>
            </div>
          </section>

          {/* What Makes Us Different */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-primary">What Makes Us Different</h2>
            <div className="mt-6 space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Real Data, Not Guesswork</h3>
                  <p className="mt-1 text-muted leading-relaxed">
                    We source cost data from industry databases, government labor statistics (BLS), contractor surveys, and established cost references. Every number is cross-referenced.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Interactive Calculators</h3>
                  <p className="mt-1 text-muted leading-relaxed">
                    Static cost ranges only tell you so much. Our calculators let you adjust for project size, quality level, and your location - so you get an estimate that actually reflects your situation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">No Lead-Gen, No Upsells</h3>
                  <p className="mt-1 text-muted leading-relaxed">
                    We don&apos;t sell your information to contractors. We don&apos;t hide cost data behind forms. The data is free, and it&apos;s here for you to use however you need.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Editorial Standards */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-primary">Our Editorial Standards</h2>
            <div className="mt-4 space-y-4 text-text leading-relaxed">
              <p>
                Accuracy matters when you&apos;re making decisions about your home and your money. Here&apos;s how we maintain it:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted">
                <li>Every cost range cites at least two independent data sources</li>
                <li>Regional adjustments use Bureau of Labor Statistics wage data and construction cost indices</li>
                <li>All cost data is reviewed and updated at least once per year</li>
                <li>We clearly label last-updated dates on every guide so you know how fresh the data is</li>
                <li>When sources disagree, we show the full range rather than picking a single number</li>
              </ul>
              <p>
                Want the full details on how we research and calculate costs?{' '}
                <Link href="/methodology/" className="text-accent font-medium hover:underline">
                  Read our methodology
                </Link>.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mt-12 bg-white rounded-xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-primary">Get in Touch</h2>
            <p className="mt-3 text-muted leading-relaxed">
              Found an error in our data? Have a suggestion for a project we should cover? We want to hear from you. Accuracy is our top priority, and reader feedback helps us improve.
            </p>
            <p className="mt-3 text-sm text-muted-light">
              Email us at: <span className="text-primary font-medium">hello@homeprojectcostguide.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
