import Link from 'next/link';

const popularLinks = [
  { href: '/projects/kitchen/', label: 'Kitchen Remodeling' },
  { href: '/projects/bathroom/', label: 'Bathroom Remodeling' },
  { href: '/projects/exterior/', label: 'Exterior & Roofing' },
  { href: '/projects/flooring/', label: 'Flooring' },
  { href: '/projects/hvac-energy/', label: 'HVAC & Energy' },
  { href: '/projects/painting-walls/', label: 'Painting & Walls' },
];

const toolLinks = [
  { href: '/projects/', label: 'All Projects' },
  { href: '/calculators/', label: 'Cost Calculators' },
  { href: '/compare/', label: 'Compare Projects' },
  { href: '/cost-by-zip/', label: 'Cost by ZIP Code' },
];

const companyLinks = [
  { href: '/about/', label: 'About Us' },
  { href: '/methodology/', label: 'Our Methodology' },
  { href: '/blog/', label: 'Blog' },
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="section-width section-padding py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7" fill="none">
                <path d="M16 4L3 14h3.5v12h7.5v-7h4v7h7.5V14H29L16 4z" fill="#D4A853" />
              </svg>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white leading-tight">Home Project</span>
                <span className="text-xs font-semibold text-accent leading-tight uppercase">Cost Guide</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Free, research-backed cost guides for 200+ home improvement projects. Know what it costs before you call a contractor.
            </p>
          </div>

          <FooterColumn title="Popular Projects" links={popularLinks} />
          <FooterColumn title="Tools" links={toolLinks} />
          <FooterColumn title="Company" links={companyLinks} />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-width section-padding py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
            <p>&copy; {currentYear} Home Project Cost Guide. All rights reserved.</p>
            <p>Cost data is for informational purposes only. Actual project costs vary by location, scope, and contractor.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
