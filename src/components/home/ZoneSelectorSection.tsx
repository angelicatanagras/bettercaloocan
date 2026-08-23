import { Compass } from 'lucide-react';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';

interface ZoneInfo {
  name: string;
  accentClass: string;
  barangays: string;
  hospital: string;
}

const ZONES: ZoneInfo[] = [
  {
    name: 'South Caloocan',
    accentClass: 'border-secondary-500',
    barangays: 'Brgy. 1–4, 77–85, 132–164…',
    hospital: 'Caloocan City Medical Center',
  },
  {
    name: 'North Caloocan',
    accentClass: 'border-success-500',
    barangays: 'Brgy. 165–175, 177, 178–188…',
    hospital: 'Caloocan City North Medical Center',
  },
];

export default function ZoneSelectorSection() {
  return (
    <Section tint="accent">
      <div className="flex items-center gap-2 mb-1">
        <Compass className="h-5 w-5 text-primary-500" />
        <Text
          size="sm"
          transform="uppercase"
          className="tracking-wide text-gray-500 mb-0"
        >
          04 &mdash; Find your side of the city
        </Text>
      </div>
      <Heading level={2}>Which Caloocan Are You In?</Heading>
      <Text className="text-gray-600 mb-6 max-w-2xl">
        Caloocan is split into two areas that don&rsquo;t even share a border
        &mdash; Quezon City sits in between them. Pick your side to see
        what&rsquo;s nearby.
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ZONES.map(zone => (
          <Card
            key={zone.name}
            className={`border-t-4 ${zone.accentClass} bg-white transition-all duration-200 hover:shadow-lg`}
          >
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {zone.name}
              </h3>

              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="text-gray-500 shrink-0">Barangays</dt>
                  <dd className="text-gray-700">{zone.barangays}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-gray-500 shrink-0">Nearest hospital</dt>
                  <dd className="text-gray-700">{zone.hospital}</dd>
                </div>
              </dl>

              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Coming soon — not wired up yet"
                className="mt-5 w-full sm:w-auto px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed"
              >
                See services near me &rarr;
              </button>
              <p className="mt-1.5 text-xs text-gray-400">
                Coming soon &mdash; not wired up yet
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
