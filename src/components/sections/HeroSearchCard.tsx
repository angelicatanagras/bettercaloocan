import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { serviceCategories } from '../../data/yamlLoader';

interface Category {
  category: string;
  slug: string;
  description: string;
  icon: string;
}

// A representative subset of real service categories shown as quick links.
const POPULAR_SLUGS = [
  'business',
  'health-services',
  'education',
  'garbage-waste-disposal',
  'social-welfare',
  'housing-land-use',
];

function getIcon(name: string) {
  const IconComponent = LucideIcons[
    name as keyof typeof LucideIcons
  ] as React.ComponentType<{ className?: string }>;
  return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
}

export default function HeroSearchCard() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const categories = serviceCategories.categories as Category[];

  const popular = useMemo(
    () =>
      POPULAR_SLUGS.map(slug => categories.find(c => c.slug === slug)).filter(
        (c): c is Category => Boolean(c)
      ),
    [categories]
  );

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return categories
      .filter(
        c =>
          c.category.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matches[0]) {
      navigate(`/services/${matches[0].slug}`);
    }
  };

  return (
    <Card className="bg-white text-gray-900 border-t-4 border-primary-300">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Search className="h-5 w-5 text-primary-600" />
          Search Services
        </h3>

        <form onSubmit={handleSubmit} className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for a service…"
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600"
          />
        </form>

        {matches.length > 0 ? (
          <div className="space-y-1 mb-2">
            {matches.map(m => (
              <Link
                key={m.slug}
                to={`/services/${m.slug}`}
                className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
              >
                {m.category}
              </Link>
            ))}
          </div>
        ) : (
          <>
            <p className="text-xs tracking-wide text-gray-500 uppercase mb-3">
              Popular Services
            </p>
            <div className="grid grid-cols-3 gap-3">
              {popular.map(c => (
                <Link
                  key={c.slug}
                  to={`/services/${c.slug}`}
                  className="flex flex-col items-center text-center gap-2 p-3 border border-gray-200 rounded-md hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  <span className="bg-primary-100 text-primary-600 p-2 rounded-md">
                    {getIcon(c.icon)}
                  </span>
                  <span className="text-xs font-medium text-gray-800">
                    {c.category}
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
