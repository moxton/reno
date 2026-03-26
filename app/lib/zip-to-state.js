/**
 * Maps US ZIP code prefixes (first 3 digits) to state abbreviations.
 * Based on USPS ZIP code prefix allocation tables.
 *
 * Usage:
 *   import { getStateFromZip } from '@/app/lib/zip-to-state';
 *   getStateFromZip('02115'); // 'MA'
 */

// Each entry is [startPrefix, endPrefix, stateCode].
// Ranges are inclusive on both ends.
const ZIP_PREFIX_RANGES = [
  // Connecticut
  [60, 69, 'CT'],
  // Massachusetts
  [10, 27, 'MA'],
  // Rhode Island
  [28, 29, 'RI'],
  // New Hampshire
  [30, 38, 'NH'],
  // Maine
  [39, 49, 'ME'],
  // Vermont
  [50, 59, 'VT'],
  // New Jersey
  [70, 89, 'NJ'],
  // Military (APO/FPO) - AE
  [90, 98, 'NY'], // PR & VI handled below; 090-098 are military but mapped to NY area
  // Puerto Rico & Virgin Islands (skip for contiguous US - map to PR)
  [900, 919, 'PR'],
  [920, 929, 'PR'],
  // New York
  [100, 149, 'NY'],
  // Pennsylvania
  [150, 196, 'PA'],
  // Delaware
  [197, 199, 'DE'],
  // District of Columbia
  [200, 205, 'DC'],
  // Virginia
  [206, 209, 'VA'],
  // Maryland
  [206, 219, 'MD'],
  // Virginia
  [220, 246, 'VA'],
  // West Virginia
  [247, 268, 'WV'],
  // North Carolina
  [269, 289, 'NC'],
  // South Carolina
  [290, 299, 'SC'],
  // Georgia
  [300, 319, 'GA'],
  // Florida
  [320, 349, 'FL'],
  // Alabama
  [350, 369, 'AL'],
  // Tennessee
  [370, 385, 'TN'],
  // Mississippi
  [386, 397, 'MS'],
  // Kentucky
  [400, 427, 'KY'],
  // Ohio
  [430, 459, 'OH'],
  // Indiana
  [460, 479, 'IN'],
  // Michigan
  [480, 499, 'MI'],
  // Iowa
  [500, 528, 'IA'],
  // Minnesota
  [530, 567, 'MN'],
  // Wisconsin
  [530, 549, 'WI'],
  // South Dakota
  [570, 577, 'SD'],
  // North Dakota
  [580, 588, 'ND'],
  // Montana
  [590, 599, 'MT'],
  // Illinois
  [600, 629, 'IL'],
  // Missouri
  [630, 658, 'MO'],
  // Kansas
  [660, 679, 'KS'],
  // Nebraska
  [680, 693, 'NE'],
  // Louisiana
  [700, 714, 'LA'],
  // Arkansas
  [716, 729, 'AR'],
  // Oklahoma
  [730, 749, 'OK'],
  // Texas
  [750, 799, 'TX'],
  // Colorado
  [800, 816, 'CO'],
  // Wyoming
  [820, 831, 'WY'],
  // Idaho
  [832, 838, 'ID'],
  // Utah
  [840, 847, 'UT'],
  // Arizona
  [850, 865, 'AZ'],
  // New Mexico
  [870, 884, 'NM'],
  // Nevada
  [889, 898, 'NV'],
  // California
  [900, 961, 'CA'],
  // Hawaii
  [967, 968, 'HI'],
  // Oregon
  [970, 979, 'OR'],
  // Washington
  [980, 994, 'WA'],
  // Alaska
  [995, 999, 'AK'],
];

/*
 * The ranges above have some overlaps for simplicity (e.g. MD/VA/DC share the 200 block).
 * For a clean, authoritative lookup we use a more precise prefix-level map below.
 * This table maps every 3-digit prefix to its correct state.
 */
const PREFIX_MAP = {};

function addRange(start, end, state) {
  for (let i = start; i <= end; i++) {
    PREFIX_MAP[i] = state;
  }
}

// Build the prefix map from authoritative USPS data
// Source: https://en.wikipedia.org/wiki/List_of_ZIP_Code_prefixes

// Connecticut 060-069
addRange(60, 69, 'CT');

// Massachusetts 010-027
addRange(10, 27, 'MA');

// Rhode Island 028-029
addRange(28, 29, 'RI');

// New Hampshire 030-038
addRange(30, 38, 'NH');

// Maine 039-049
addRange(39, 49, 'ME');

// Vermont 050-059
addRange(50, 59, 'VT');

// New Jersey 070-089
addRange(70, 89, 'NJ');

// Military APO/FPO 090-099 (treat as NY for regional pricing)
addRange(90, 99, 'NY');

// New York 100-149
addRange(100, 149, 'NY');

// Pennsylvania 150-196
addRange(150, 196, 'PA');

// Delaware 197-199
addRange(197, 199, 'DE');

// DC 200-205
addRange(200, 205, 'DC');

// Maryland 206-219 (206-209 overlap with VA; USPS assigns 206-209 to MD/DC area)
addRange(206, 219, 'MD');

// Virginia 220-246
addRange(220, 246, 'VA');

// West Virginia 247-268
addRange(247, 268, 'WV');

// North Carolina 270-289
addRange(270, 289, 'NC');

// South Carolina 290-299
addRange(290, 299, 'SC');

// Georgia 300-319, 398-399
addRange(300, 319, 'GA');
addRange(398, 399, 'GA');

// Florida 320-349
addRange(320, 349, 'FL');

// Alabama 350-369
addRange(350, 369, 'AL');

// Tennessee 370-385
addRange(370, 385, 'TN');

// Mississippi 386-397
addRange(386, 397, 'MS');

// Kentucky 400-427
addRange(400, 427, 'KY');

// Ohio 430-459
addRange(430, 459, 'OH');

// Indiana 460-479
addRange(460, 479, 'IN');

// Michigan 480-499
addRange(480, 499, 'MI');

// Iowa 500-528
addRange(500, 528, 'IA');

// Wisconsin 530-549
addRange(530, 549, 'WI');

// Minnesota 550-567
addRange(550, 567, 'MN');

// South Dakota 570-577
addRange(570, 577, 'SD');

// North Dakota 580-588
addRange(580, 588, 'ND');

// Montana 590-599
addRange(590, 599, 'MT');

// Illinois 600-629
addRange(600, 629, 'IL');

// Missouri 630-658
addRange(630, 658, 'MO');

// Kansas 660-679
addRange(660, 679, 'KS');

// Nebraska 680-693
addRange(680, 693, 'NE');

// Louisiana 700-714
addRange(700, 714, 'LA');

// Arkansas 716-729
addRange(716, 729, 'AR');

// Oklahoma 730-749
addRange(730, 749, 'OK');

// Texas 750-799
addRange(750, 799, 'TX');

// Colorado 800-816
addRange(800, 816, 'CO');

// Wyoming 820-831
addRange(820, 831, 'WY');

// Idaho 832-838
addRange(832, 838, 'ID');

// Utah 840-847
addRange(840, 847, 'UT');

// Arizona 850-865
addRange(850, 865, 'AZ');

// New Mexico 870-884
addRange(870, 884, 'NM');

// Nevada 889-898
addRange(889, 898, 'NV');

// California 900-961
addRange(900, 961, 'CA');

// Hawaii 967-968
addRange(967, 968, 'HI');

// Guam 969
addRange(969, 969, 'GU');

// Oregon 970-979
addRange(970, 979, 'OR');

// Washington 980-994
addRange(980, 994, 'WA');

// Alaska 995-999
addRange(995, 999, 'AK');

/**
 * Returns the 2-letter US state code for a given ZIP code string.
 * Returns null if the ZIP is invalid or unmapped.
 *
 * @param {string} zip - A 5-digit US ZIP code (e.g. '02115', '90210')
 * @returns {string|null} Two-letter state abbreviation or null
 */
export function getStateFromZip(zip) {
  if (!zip || typeof zip !== 'string') return null;

  // Strip whitespace, allow ZIP+4 format
  const cleaned = zip.trim().replace(/-.*$/, '');

  if (!/^\d{5}$/.test(cleaned)) return null;

  const prefix = parseInt(cleaned.substring(0, 3), 10);
  return PREFIX_MAP[prefix] || null;
}
