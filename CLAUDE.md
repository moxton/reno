# CLAUDE.md - Home Project Cost Guide

## PROJECT IDENTITY

**Site Name:** HomeProjectCostGuide.com (or similar - check domain availability)
**Tagline:** "Know what it costs before you call a contractor."
**Tech Stack:** Next.js 14+ static export, Tailwind CSS, deployed on Vercel
**Design Aesthetic:** Clean, trustworthy, professional. Think Consumer Reports meets NerdWallet. White/light gray backgrounds, deep navy or slate text, accent color of warm amber/gold (signals trust, money, home warmth). No stock photos of smiling contractors. Use clean icons, data visualizations, and interactive elements instead.

---

## CORE CONCEPT

A comprehensive, free, interactive cost reference site for home improvement and renovation projects. Every project page includes cost ranges by tier (budget/mid-range/premium), regional adjustment factors, interactive calculators, and detailed cost breakdowns. The site should feel like the most useful, trustworthy resource a homeowner finds before hiring a contractor.

**Why this wins:** Home improvement is a $15-25 RPM display ad niche. Interactive calculators are AI-proof (Google can't summarize a tool). The comprehensiveness of 200+ project pages creates topical authority impossible for competitors to match quickly. Lead-gen sites like Angi/HomeAdvisor are optimized to capture leads, not to genuinely help. We fill the gap.

---

## SITE ARCHITECTURE

```
/                           → Homepage (search bar, popular projects, latest guides)
/projects/                  → All Projects index (filterable by category, cost range)
/projects/[category]/       → Category pages (kitchen, bathroom, exterior, etc.)
/projects/[slug]/           → Individual project cost guides (THE CORE ASSET)
/calculators/               → All calculators index
/calculators/[slug]/        → Individual interactive calculators
/blog/                      → Blog index
/blog/[slug]/               → Individual blog posts (money pages targeting buyer intent)
/compare/                   → Project comparison tool (compare 2-3 projects side by side)
/cost-by-zip/               → Regional cost lookup tool
/about/                     → About page with author bio, methodology, sources
/methodology/               → How we research and calculate costs (E-E-A-T signal)
```

---

## PROJECT CATEGORIES (12 categories, 200+ total projects)

### Kitchen (20+ projects)
- Full kitchen remodel (budget/mid-range/upscale)
- Kitchen cabinet refacing
- Kitchen cabinet replacement
- Countertop replacement (by material: granite, quartz, marble, butcher block, laminate)
- Kitchen island installation
- Backsplash installation
- Kitchen flooring replacement
- Appliance package upgrade
- Kitchen lighting upgrade
- Pantry buildout/renovation
- Kitchen plumbing rough-in
- Kitchen electrical upgrade
- Range hood installation
- Kitchen demolition
- Open concept kitchen conversion (wall removal)

### Bathroom (18+ projects)
- Full bathroom remodel (budget/mid-range/upscale)
- Half bath addition
- Primary bathroom remodel
- Shower replacement/remodel
- Bathtub replacement
- Bathtub to shower conversion
- Tile installation (floor and wall)
- Vanity replacement
- Bathroom plumbing rough-in
- Walk-in shower installation
- Bathroom ventilation fan
- Heated bathroom floor
- Frameless glass shower door
- Toilet replacement
- Bathroom accessibility/ADA conversion

### Exterior (20+ projects)
- Roof replacement (by material: asphalt, metal, tile, slate, flat)
- Siding replacement (vinyl, fiber cement, wood, stone veneer)
- Window replacement
- Door replacement (entry, patio, French, sliding)
- Gutter installation/replacement
- Exterior painting
- Deck building (wood, composite, Trex)
- Patio installation (concrete, pavers, flagstone, stamped concrete)
- Fence installation (wood, vinyl, chain link, aluminum, wrought iron)
- Driveway replacement (concrete, asphalt, pavers, gravel)
- Garage door replacement
- Retaining wall construction
- Outdoor kitchen building
- Pergola/gazebo installation
- Exterior lighting installation
- Landscaping (basic, mid-range, full redesign)
- Sprinkler system installation
- Pressure washing (house, deck, driveway)

### Basement (12+ projects)
- Basement finishing (full)
- Basement waterproofing
- Basement egress window
- Basement bathroom addition
- Basement bar buildout
- Basement home theater
- Basement flooring (by type)
- Sump pump installation
- French drain (interior/exterior)
- Basement ceiling options (drop ceiling, drywall, exposed)
- Basement insulation
- Basement staircase remodel

### Flooring (10+ projects)
- Hardwood floor installation
- Hardwood floor refinishing
- Laminate flooring installation
- Vinyl plank flooring (LVP) installation
- Tile flooring installation
- Carpet installation
- Epoxy garage floor
- Heated floor installation (radiant)
- Staircase carpet/runner installation
- Concrete floor polishing/staining

### HVAC & Energy (15+ projects)
- Central AC installation
- Furnace replacement
- Heat pump installation
- Ductless mini-split installation
- Ductwork installation/replacement
- Thermostat installation (smart thermostat)
- Whole-house fan installation
- Attic insulation
- Wall insulation (blown-in, spray foam)
- Solar panel installation
- Tankless water heater
- Water heater replacement
- Whole-house generator installation
- EV charger installation
- Energy audit and weatherization

### Plumbing (10+ projects)
- Whole-house repiping
- Water main replacement
- Sewer line repair/replacement
- Water softener installation
- Water filtration system
- Garbage disposal installation
- Sump pump installation
- Gas line installation
- Outdoor faucet/spigot installation
- Main shut-off valve replacement

### Electrical (10+ projects)
- Electrical panel upgrade (100 to 200 amp)
- Whole-house rewiring
- Outlet/switch installation
- Ceiling fan installation
- Recessed lighting installation
- Landscape lighting
- Home security system
- Doorbell camera installation
- Smoke/CO detector installation
- Home EV charging station

### Structural (10+ projects)
- Room addition
- Second story addition
- Bump-out addition
- Load-bearing wall removal
- Foundation repair
- Crawl space encapsulation
- Chimney repair/rebuild
- Support beam replacement
- Earthquake retrofitting
- Termite damage repair

### Painting & Walls (8+ projects)
- Interior painting (per room, whole house)
- Exterior painting
- Wallpaper installation
- Wallpaper removal
- Drywall installation
- Drywall repair
- Accent wall installation
- Crown molding installation
- Wainscoting/board and batten

### Outdoor Living (10+ projects)
- Swimming pool installation (in-ground, above-ground)
- Hot tub installation
- Fire pit installation
- Outdoor fireplace
- Screen porch/sunroom addition
- Shed building
- Detached garage
- ADU/in-law suite
- Playscape/playset installation
- Tree removal

### Smart Home & Tech (6+ projects)
- Smart home wiring/infrastructure
- Whole-house audio system
- Home network/structured wiring
- Motorized window shades
- Smart lock installation
- Home automation hub setup

---

## INDIVIDUAL PROJECT PAGE TEMPLATE

Every project page must follow this exact structure. This is the core asset of the site. Each page should be 2,500-4,000 words of genuinely useful content.

### Page Structure:

```
# [Project Name] Cost in 2026: What to Expect

## Quick Answer Box (sticky/highlighted)
- National average: $X,XXX
- Typical range: $X,XXX - $XX,XXX
- Low end: $X,XXX | High end: $XX,XXX
- Cost per square foot: $XX - $XX (if applicable)

## Interactive Cost Calculator
[Embedded React calculator component - see Calculator Spec below]

## Cost Breakdown Table
| Component | Budget | Mid-Range | Premium |
|-----------|--------|-----------|---------|
| Materials | $X     | $X        | $X      |
| Labor     | $X     | $X        | $X      |
| Permits   | $X     | $X        | $X      |
| Subtotal  | $X     | $X        | $X      |

## What Drives the Cost
[3-5 key cost factors explained in detail with specific dollar impacts]

## Cost by Material/Type
[Comparison table showing different material options and their cost implications]

## Regional Cost Variations
[Table or map showing cost multipliers by region]
- Northeast: +15-25%
- West Coast: +20-35%
- Southeast: -10-15%
- Midwest: -5-15%
- Mountain West: +5-10%

## Timeline & What to Expect
[How long the project takes, what the phases look like, when to hire vs DIY]

## DIY vs Professional
[Honest assessment of DIY feasibility, cost savings, and risks]

## How to Save Money
[5-8 specific, actionable tips - not generic "get multiple quotes" filler]

## Questions to Ask Your Contractor
[5-7 specific questions with context on why they matter]

## Related Projects
[Internal links to 3-5 related project pages]

## Sources & Methodology
[Footer section with links to data sources]
```

### Data Sources for Cost Research:
- HomeAdvisor/Angi cost guides (publicly available ranges)
- HomeGuide cost data
- Homewyse calculator data (uses BLS data)
- RSMeans construction cost data (reference for methodology)
- BLS Occupational Employment and Wage Statistics (labor rates)
- Fixr.com cost guides
- This Old House / Bob Vila cost guides
- Remodeling Magazine's Cost vs. Value Report (annual)
- Local contractor quote aggregation sites

**CRITICAL: Do NOT fabricate cost data.** Every number must be sourced from at least 2 of the above sources. When sources conflict, use the range. Always cite methodology page.

---

## CALCULATOR SPECIFICATION

Each project page gets an interactive calculator built as a React component. The calculator should:

1. **Accept inputs:**
   - Project size (square footage, linear feet, or unit count depending on project)
   - Quality tier (budget / mid-range / premium)
   - Region/state (dropdown with cost multiplier)
   - Specific options (e.g., for kitchen: include appliances? include countertops? include flooring?)

2. **Output:**
   - Estimated total cost range (low - high)
   - Itemized breakdown by component
   - Cost per square foot
   - "Your estimate is X% [above/below] the national average" context line
   - Shareable/printable summary

3. **Design:**
   - Clean slider or input-based UI
   - Real-time updating (no submit button)
   - Mobile-optimized
   - Subtle animation on number changes
   - Print-friendly output

4. **Technical:**
   - Built as reusable React component with project-specific config
   - Cost formulas stored in JSON data files (easy to update)
   - No backend required - all calculation client-side
   - SEO: calculator renders server-side with default values for crawlers

---

## BLOG CONTENT STRATEGY (Money Pages)

The blog is where buyer-intent keywords live. These are the pages that drive affiliate and ad revenue. Target 50+ blog posts in year one.

### Blog Post Categories:

**"Best" / Comparison Posts (highest affiliate potential):**
- "Best kitchen countertop materials compared (2026)"
- "Best flooring for kitchens: pros, cons, and costs"
- "Best siding materials ranked by durability, cost, and looks"
- "Best roofing materials for [climate type]"
- "Best energy-efficient windows for cold climates"

**"How Much" Posts (high ad RPM):**
- "How much does it cost to build a house in 2026?"
- "How much value does a kitchen remodel add?"
- "How much should you spend on a bathroom remodel?"
- "How much does it cost to hire an architect?"
- "How much do contractors charge per hour?"

**"Is It Worth It" Posts:**
- "Is a kitchen remodel worth it? ROI by project type"
- "Is solar worth it in [state]? Calculator and breakdown"
- "Is it worth finishing your basement?"
- "Should you remodel or move?"

**Seasonal/Timely Posts:**
- "Best time of year to remodel your kitchen"
- "How to budget for a home renovation in 2026"
- "Home renovation costs: what changed this year"
- "Contractor shortage: how it affects your remodel cost"

**Decision Guide Posts:**
- "Remodel vs. move: cost comparison calculator"
- "DIY vs. hire a contractor: when each makes sense"
- "How to set a realistic renovation budget"
- "What to do when your contractor quote is too high"

---

## MONETIZATION STRATEGY

### Display Ads (primary revenue driver months 1-12):
- Target: Mediavine (requires 50K sessions/month) or Raptive
- Start with Ezoic or AdSense while building traffic
- Expected RPM: $15-25 in home improvement niche
- Aggressive ad placements: in-content, sidebar, sticky footer
- Calculator pages will have high time-on-page (good for ad revenue)

### Affiliate Revenue (layer in after launch):
- **Home Depot affiliate program** (3-8% commission)
- **Lowe's affiliate program** (2-4% commission)
- **Amazon Associates** (1-4% on home improvement)
- **Angi/HomeAdvisor** (lead gen referral)
- **Thumbtack** (contractor matching referral)
- **LendingTree** (home improvement loan affiliate - HIGH payout $30-$75/lead)
- **SoFi home improvement loans** (high payout)
- **Wayfair affiliate** (furniture/fixtures)

### Future Digital Products:
- Printable renovation budget template ($9)
- "Contractor Hiring Checklist" PDF ($5)
- Renovation project planner ($19)

---

## SEO STRATEGY

### Technical SEO:
- Static export for fast page loads
- Schema markup on every page: HowTo, FAQPage, Article
- Breadcrumb schema
- Internal linking: every project page links to 3-5 related projects
- XML sitemap with all project and blog pages
- robots.txt allowing all crawlers including GPTBot, ClaudeBot, PerplexityBot (we WANT AI citation)

### Content SEO:
- Target long-tail keywords first: "cost to install vinyl plank flooring" not "flooring"
- Each project page targets 1 primary keyword + 5-10 secondary
- Blog posts target buyer-intent and comparison keywords
- Update all cost data annually (freshness signal)
- Regional pages for top 20 metro areas (phase 2)

### Link Building:
- Create embeddable calculator widget that other sites can embed (with backlink)
- Publish annual "Cost of Home Improvement Report" with original data aggregation
- Reach out to real estate blogs, personal finance blogs for link partnerships

---

## DEVELOPMENT WORKFLOW

### Phase 1: Foundation (Week 1-2)
1. Initialize Next.js project with Tailwind
2. Build site layout: header, footer, navigation, responsive sidebar
3. Build project page template component
4. Build calculator component (reusable with config)
5. Build homepage with search, category grid, popular projects
6. Build category index pages
7. Build about/methodology pages
8. Set up Vercel deployment

### Phase 2: Content - First 50 Projects (Week 2-4)
1. Create JSON data schema for project cost data
2. Research and build data files for top 50 projects (highest search volume first):
   - Kitchen remodel, bathroom remodel, roof replacement, window replacement, siding, deck, fence, flooring (hardwood, LVP, tile, carpet), painting (interior/exterior), HVAC, water heater, garage door, driveway, basement finishing, etc.
3. Generate project pages from data files using template
4. Build internal linking system
5. Add schema markup to all pages

### Phase 3: Calculators (Week 4-5)
1. Build calculator configs for top 20 projects
2. Build standalone calculator pages
3. Build comparison tool (compare 2-3 projects)
4. Build regional cost lookup tool
5. Test all calculators on mobile

### Phase 4: Blog Launch (Week 5-8)
1. Write first 15 blog posts targeting highest-value keywords
2. Build blog index and category pages
3. Set up RSS feed
4. Cross-link blog posts with relevant project pages

### Phase 5: Scale (Ongoing)
1. Add remaining 150+ project pages
2. Publish 2-3 blog posts per week
3. Build regional/metro-specific pages
4. Add affiliate links and ad placements
5. Submit to Google Search Console, set up analytics

---

## DESIGN SYSTEM

### Colors:
- Primary: #1B2A4A (deep navy - trust, authority)
- Secondary: #D4A853 (warm gold/amber - home, warmth, money)
- Background: #FAFBFC (off-white)
- Surface: #FFFFFF (white cards)
- Text: #1F2937 (dark gray, not pure black)
- Success: #059669 (green - for "savings" indicators)
- Muted: #6B7280 (gray for secondary text)

### Typography:
- Headings: Inter or Outfit (clean, modern, trustworthy)
- Body: Inter or system fonts
- Calculator numbers: Tabular/monospace numerals for alignment
- No decorative fonts anywhere

### Components:
- Cost range badges (colored pill showing $-$$$$)
- "Quick Answer" highlight boxes (light gold background)
- Comparison tables with alternating row colors
- Calculator input sliders with real-time preview
- Project cards with category icon, name, cost range
- Breadcrumb navigation on all interior pages
- "Last Updated" timestamp on every project page (freshness signal)

---

## CONTENT VOICE & WRITING RULES

- Write like a knowledgeable friend who happens to be a contractor, not like a corporation
- No em dashes - use single hyphens or periods
- No "genuinely," "straightforward," "leverage," "game-changer," "revolutionize"
- Use "you" and "your" throughout - this is advice for the reader
- Be specific: "expect to pay $150-$250 per linear foot" not "costs vary"
- Include "why" context: don't just list prices, explain what drives them
- Acknowledge uncertainty: "costs can swing 20-30% based on your local market"
- No filler paragraphs. Every sentence should add value or be deleted
- Use hyphens for ranges: $5,000-$10,000 (not en dashes)
- Keep paragraphs to 2-3 sentences max
- Use tables and structured data wherever possible - this content begs for it

---

## CLAUDE CODE EXECUTION INSTRUCTIONS

When working on this project, Claude Code should:

1. **Research thoroughly before writing.** For each project page, search at least 3 cost data sources and cross-reference numbers before committing to ranges.

2. **Build data files first, pages second.** Create comprehensive JSON data files for each project with all cost data, then generate pages from those data files. This makes updates easy.

3. **Test calculators with edge cases.** Make sure calculators handle minimum/maximum values, zero inputs, and extreme regional multipliers gracefully.

4. **Prioritize by search volume.** Build the highest-traffic project pages first. Kitchen remodel, bathroom remodel, roof replacement, and flooring pages should be first.

5. **Internal linking is critical.** Every project page should link to at least 3 related projects. Every blog post should link to at least 2 project pages. Build a linking map.

6. **Never fabricate data.** If you can't find reliable cost data for a project, flag it and skip it. Better to have 150 accurate pages than 200 with made-up numbers.

7. **Make calculators genuinely useful.** The calculator should give results that are close to what a real contractor estimate would show. This is the site's moat - if the calculators are good, people will share and return.

8. **Mobile first.** 60%+ of home improvement searches happen on mobile. Every component must work perfectly on a phone screen.

9. **Write for E-E-A-T.** Include methodology explanations, source citations, data freshness dates, and author credentials. Google's YMYL scrutiny applies to financial advice content.

10. **Ship fast, iterate.** Get the first 50 project pages live within 2 weeks. Don't gold-plate - get it out there and improve based on what gets traffic.
