import { useMemo, useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { serviceCategories } from '../../data/yamlLoader';

interface Category {
  category: string;
  slug: string;
  description: string;
  icon: string;
}

// A representative subset of real, specific services shown as popular
// searches — not just category names, so someone can jump straight to
// the page they actually need.
const POPULAR_SEARCHES = [
  {
    label: 'business permit',
    href: '/services/business/apply-for-barangay-clearance-and-mayors-business-permits',
  },
  {
    label: 'local hospital',
    href: '/services/health-services/go-to-the-local-hospital-for-treatment-or-confinement',
  },
  {
    label: 'scholarships',
    href: '/services/education/apply-for-local-scholarships',
  },
  {
    label: 'garbage schedule',
    href: '/services/garbage-waste-disposal/check-garbage-collection-schedules-and-request-pickup',
  },
];

export default function HeroSearchCard() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const categories = serviceCategories.categories as Category[];

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
    <div className="rounded-xl border border-white/10 bg-black/25 p-6 shadow-xl backdrop-blur-sm">
      <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-white">
        <Search className="h-5 w-5 text-accent-300" />
        Find a Service
      </h3>
      <p className="mt-2 text-sm text-white/70">
        Search every service the City of Caloocan offers &mdash; by what
        you&rsquo;re trying to do, not which office handles it.
      </p>

      <form onSubmit={handleSubmit} className="relative mt-4 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="business permit, barangay clearance, hospital…"
          className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex shrink-0 items-center justify-center rounded-md bg-accent-500 px-3.5 text-white transition-all duration-200 hover:bg-accent-400 hover:shadow-md active:scale-95"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {matches.length > 0 && (
        <div className="mt-2 space-y-1 rounded-md border border-white/10 bg-black/30 p-1">
          {matches.map(m => (
            <Link
              key={m.slug}
              to={`/services/${m.slug}`}
              className="block rounded px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              {m.category}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-white/50">Popular:</span>
        {POPULAR_SEARCHES.map(item => (
          <Link
            key={item.label}
            to={item.href}
            className="rounded-full border border-accent-400/40 px-3 py-1 text-xs text-accent-200 transition-all duration-200 hover:border-accent-300 hover:bg-accent-500/20 hover:text-accent-100"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
