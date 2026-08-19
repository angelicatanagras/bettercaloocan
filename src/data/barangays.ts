// Barangay directory data for the City of Caloocan.
//
// Source: Wikipedia "Caloocan" article, "Barangays" section (PSA-cited),
// cross-checked against the article's population table and infobox
// (193 barangays total; https://en.wikipedia.org/wiki/Caloocan).
// District/number ranges reconcile exactly against the cited totals:
// 1st District 64, 2nd District 118, 3rd District 11 = 193.
//
// Most barangays are identified by number only — per the source article,
// "all barangays have corresponding numbers but only a few — mostly in
// Caloocan's northern part — have corresponding names." No invented names
// are included here; only the number/district/zone facts that are verified.

export type CaloocanZone = 'South' | 'North';

export interface Barangay {
  /** e.g. "1", "85", "176-C" */
  number: string;
  district: 1 | 2 | 3;
  zone: CaloocanZone;
}

function range(start: number, end: number): number[] {
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

function makeBarangays(
  numbers: (number | string)[],
  district: 1 | 2 | 3,
  zone: CaloocanZone
): Barangay[] {
  return numbers.map(n => ({ number: String(n), district, zone }));
}

export const BARANGAYS: Barangay[] = [
  // 1st District — South Caloocan portion: 1-4, 77-85, 132-164 (46 barangays)
  ...makeBarangays(range(1, 4), 1, 'South'),
  ...makeBarangays(range(77, 85), 1, 'South'),
  ...makeBarangays(range(132, 164), 1, 'South'),
  // 1st District — North Caloocan portion: 165-175, 177, and the six
  // barangays created from the August 31, 2024 split of Barangay 176
  // (formerly Bagong Silang, once the most populous barangay in the
  // Philippines). 11 + 6 + 1 = 18 barangays.
  ...makeBarangays(range(165, 175), 1, 'North'),
  ...makeBarangays(
    ['176-A', '176-B', '176-C', '176-D', '176-E', '176-F'],
    1,
    'North'
  ),
  ...makeBarangays([177], 1, 'North'),
  // Total 1st District: 46 + 18 = 64 ✓

  // 2nd District — all South Caloocan: 5-76, 86-131 (72 + 46 = 118 barangays)
  ...makeBarangays(range(5, 76), 2, 'South'),
  ...makeBarangays(range(86, 131), 2, 'South'),

  // 3rd District — all North Caloocan: 178-188 (11 barangays)
  // Created in 2021 (Republic Act No. 11545) from territory formerly
  // part of the 1st District.
  ...makeBarangays(range(178, 188), 3, 'North'),
];

export const BARANGAY_NOTES = {
  totalCount: 193,
  southPopulation2024: 602818,
  northPopulation2024: 1110127,
  zeroPopulationBarangay: '76',
  splitBarangay: {
    former: '176 (Bagong Silang)',
    into: ['176-A', '176-B', '176-C', '176-D', '176-E', '176-F'],
    date: 'August 31, 2024',
  },
};
