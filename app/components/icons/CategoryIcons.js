const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const icons = {
  kitchen: (props) => (
    <svg {...iconProps} {...props}>
      <path d="M3 6h18M3 6v12a2 2 0 002 2h14a2 2 0 002-2V6M3 6l1-3h16l1 3" />
      <path d="M8 6v4M12 6v4M16 6v4" />
      <circle cx="12" cy="14" r="2" />
    </svg>
  ),
  bathroom: (props) => (
    <svg {...iconProps} {...props}>
      <path d="M4 12h16a1 1 0 011 1v1a4 4 0 01-4 4H7a4 4 0 01-4-4v-1a1 1 0 011-1z" />
      <path d="M6 12V5a2 2 0 012-2h1a2 2 0 012 2v1" />
      <path d="M7 18v2M17 18v2" />
    </svg>
  ),
  exterior: (props) => (
    <svg {...iconProps} {...props}>
      <path d="M3 21h18M3 21V10l9-7 9 7v11" />
      <path d="M9 21v-6h6v6" />
      <path d="M1 10l11-8 11 8" />
    </svg>
  ),
  basement: (props) => (
    <svg {...iconProps} {...props}>
      <path d="M3 3h18v18H3z" />
      <path d="M3 12h18" />
      <path d="M8 12l-2 5h4l-2 5" />
      <path d="M14 3v9" />
    </svg>
  ),
  flooring: (props) => (
    <svg {...iconProps} {...props}>
      <path d="M3 3h18v18H3z" />
      <path d="M3 9h18M3 15h18" />
      <path d="M9 3v6M15 9v6M9 15v6" />
    </svg>
  ),
  hvac: (props) => (
    <svg {...iconProps} {...props}>
      <path d="M12 9a4 4 0 100 8 4 4 0 000-8z" />
      <path d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
      <path d="M12 12v2" />
    </svg>
  ),
  plumbing: (props) => (
    <svg {...iconProps} {...props}>
      <path d="M10 3v4a2 2 0 01-2 2H4" />
      <path d="M14 3v4a2 2 0 002 2h4" />
      <path d="M10 7v3a5 5 0 004 0V7" />
      <path d="M12 13v5" />
      <circle cx="12" cy="20" r="1" />
    </svg>
  ),
  electrical: (props) => (
    <svg {...iconProps} {...props}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  structural: (props) => (
    <svg {...iconProps} {...props}>
      <path d="M4 21V6l8-4 8 4v15" />
      <path d="M4 21h16" />
      <path d="M4 12h16" />
      <path d="M9 21V16h6v5" />
      <path d="M9 12V8h6v4" />
    </svg>
  ),
  painting: (props) => (
    <svg {...iconProps} {...props}>
      <path d="M18 4V3a1 1 0 00-1-1H5a1 1 0 00-1 1v5a1 1 0 001 1h12a1 1 0 001-1V7" />
      <path d="M4 5h14" />
      <path d="M11 9v3a1 1 0 001 1h1a1 1 0 001-1V9" />
      <path d="M12 13v5a2 2 0 01-2 2h0a2 2 0 01-2-2v-3" />
    </svg>
  ),
  outdoor: (props) => (
    <svg {...iconProps} {...props}>
      <path d="M12 3v1M5.3 5.3l.7.7M18 5.3l-.7.7M3 12h1M20 12h1" />
      <path d="M7 20h10" />
      <path d="M12 16v4" />
      <path d="M12 7a5 5 0 015 5H7a5 5 0 015-5z" />
    </svg>
  ),
  smarthome: (props) => (
    <svg {...iconProps} {...props}>
      <path d="M12 18h.01" />
      <path d="M9.17 15.17a4 4 0 015.66 0" />
      <path d="M6.34 12.34a8 8 0 0111.32 0" />
      <path d="M3.51 9.51a12 12 0 0116.98 0" />
    </svg>
  ),
};

export default function CategoryIcon({ name, className = "w-8 h-8" }) {
  const Icon = icons[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}
