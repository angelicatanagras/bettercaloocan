import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '../components/SEO';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { BARANGAYS, BARANGAY_NOTES, type Barangay } from '../data/barangays';

const DISTRICT_LABELS: Record<Barangay['district'], string> = {
  1: '1st District',
  2: '2nd District',
  3: '3rd District',
};

function groupByZoneThenDistrict(barangays: Barangay[]) {
  const zones: Record<string, Record<number, Barangay[]>> = {
    South: {},
    North: {},
  };
  for (const b of barangays) {
    zones[b.zone][b.district] = zones[b.zone][b.district] || [];
    zones[b.zone][b.district].push(b);
  }
  return zones;
}

const Barangays: React.FC = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return BARANGAYS;
    return BARANGAYS.filter(b => b.number.toLowerCase().includes(q));
  }, [query]);

  const grouped = useMemo(() => groupByZoneThenDistrict(filtered), [filtered]);

  return (
    <>
      <SEO
        title="Barangays"
        description={`Directory of all ${BARANGAY_NOTES.totalCount} barangays of ${import.meta.env.VITE_GOVERNMENT_NAME}, grouped by legislative district and geographic zone.`}
        keywords="barangay, barangay directory, Caloocan barangays, North Caloocan, South Caloocan"
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Heading>Barangays</Heading>
        <Text className="text-gray-600 mb-4 max-w-3xl">
          {import.meta.env.VITE_GOVERNMENT_NAME} is divided into{' '}
          {BARANGAY_NOTES.totalCount} barangays across 3 legislative districts.
          Most barangays are identified by number only — few have separate
          names. Barangay {BARANGAY_NOTES.zeroPopulationBarangay} is the only
          barangay with zero recorded population (2024 census), and former
          Barangay {BARANGAY_NOTES.splitBarangay.former} was split into six
          barangays ({BARANGAY_NOTES.splitBarangay.into.join(', ')}) following a
          plebiscite on {BARANGAY_NOTES.splitBarangay.date}.
        </Text>

        <div className="relative max-w-sm mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by barangay number (e.g. 176-A)"
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600"
          />
        </div>

        {filtered.length === 0 ? (
          <Text className="text-gray-600">No barangay matches "{query}".</Text>
        ) : (
          (['South', 'North'] as const).map(zone => {
            const districts = grouped[zone];
            const districtKeys = Object.keys(districts)
              .map(Number)
              .sort((a, b) => a - b) as Barangay['district'][];
            if (districtKeys.length === 0) return null;

            return (
              <div key={zone} className="mb-10">
                <Heading level={2}>{zone} Caloocan</Heading>
                {districtKeys.map(district => (
                  <div key={district} className="mb-6">
                    <Heading level={4}>
                      {DISTRICT_LABELS[district]}{' '}
                      <span className="text-gray-400 font-normal text-base">
                        ({districts[district].length} barangays)
                      </span>
                    </Heading>
                    <Card>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {districts[district].map(b => (
                            <span
                              key={b.number}
                              className="inline-block px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-800"
                            >
                              Brgy. {b.number}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            );
          })
        )}
      </Section>
    </>
  );
};

export default Barangays;
