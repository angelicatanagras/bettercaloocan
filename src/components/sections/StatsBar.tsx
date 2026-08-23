interface Stat {
  label: string;
  value: string;
  unit?: string;
  caption: string;
}

const STATS: Stat[] = [
  {
    label: 'Residents',
    value: '1,712,945',
    caption: '2024 census · PSA',
  },
  {
    label: 'Income Class',
    value: '1st Class',
    caption: 'Highly urbanized city',
  },
  {
    label: 'Barangays',
    value: '193',
    caption: 'Across 3 legislative districts',
  },
  {
    label: 'Land Area',
    value: '53.3',
    unit: 'km²',
    caption: 'Two non-contiguous halves',
  },
];

export default function StatsBar() {
  return (
    <div className="bg-primary-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {STATS.map(stat => (
            <div key={stat.label}>
              <div className="text-xs font-heading font-semibold uppercase tracking-wider text-primary-200">
                {stat.label}
              </div>
              <div className="mt-1.5 font-heading text-2xl font-bold sm:text-3xl">
                {stat.value}
                {stat.unit && (
                  <span className="ml-1 text-base font-medium text-primary-200">
                    {stat.unit}
                  </span>
                )}
              </div>
              <div className="mt-1 text-xs text-primary-200">
                {stat.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
