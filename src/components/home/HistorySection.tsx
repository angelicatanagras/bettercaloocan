import { BookOpen, Flame, TrainFront } from 'lucide-react';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Card, CardContent } from '@bettergov/kapwa/card';

interface Milestone {
  year: string;
  text: string;
}

const MILESTONES: Milestone[] = [
  {
    year: '1762',
    text: 'Augustinian friars reach Aromahan (Libis Espina), the barrio of Tondo that would grow into Caloocan.',
  },
  {
    year: '1815',
    text: 'Caloocan separates from Tondo to become its own pueblo (town).',
  },
  {
    year: '1891',
    text: 'Caloocan station opens on the Manila–Dagupan line, one of the earliest stops on the country’s first major railway.',
  },
  {
    year: '1899',
    text: 'The Battle of Caloocan, an early clash of the Philippine–American War, is fought for control of that same rail line.',
  },
  {
    year: '1933',
    text: 'The Bonifacio Monument is inaugurated at Monumento, honoring the 1896 Katipunan uprising.',
  },
  {
    year: '1962',
    text: 'Caloocan is inaugurated as a city under Republic Act No. 3278.',
  },
];

export default function HistorySection() {
  return (
    <Section pattern="lines">
      <p className="font-heading text-xs font-semibold uppercase tracking-widest text-primary-500 mb-2">
        05 &mdash; History
      </p>
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-primary-500" />
        <Heading level={2} className="mb-0">
          Brief History of Caloocan
        </Heading>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ol className="lg:col-span-2 relative border-l-2 border-primary-200 pl-6 space-y-6">
          {MILESTONES.map(m => (
            <li key={m.year} className="relative">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-primary-500 ring-4 ring-white" />
              <span className="inline-block bg-primary-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-1.5">
                {m.year}
              </span>
              <Text className="text-gray-700 mb-0 max-w-none">{m.text}</Text>
            </li>
          ))}
        </ol>

        <div className="space-y-4">
          <Card className="bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <span className="bg-primary-100 text-primary-600 rounded-md p-2 shrink-0">
                  <Flame className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Cradle of the Cry
                  </h4>
                  <Text size="sm" className="text-gray-600 mb-0 max-w-none">
                    Before today&rsquo;s boundaries, &ldquo;Caloocan&rdquo;
                    named a much wider area that included Balintawak and Pugad
                    Lawin &mdash; the sites tied to the Katipunan&rsquo;s 1896
                    uprising against Spain.
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <span className="bg-primary-100 text-primary-600 rounded-md p-2 shrink-0">
                  <TrainFront className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    On the Main Line
                  </h4>
                  <Text size="sm" className="text-gray-600 mb-0 max-w-none">
                    Caloocan&rsquo;s station opened in 1891 on the
                    Manila&ndash;Dagupan line, the country&rsquo;s first major
                    railway &mdash; exactly why U.S. forces fought to take it in
                    1899.
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}
