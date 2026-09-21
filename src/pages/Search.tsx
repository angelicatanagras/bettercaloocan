import { useMemo } from 'react';
import { Link } from 'react-router';
import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { Search as SearchIcon } from 'lucide-react';
import SEO from '../components/SEO';
import { useSiteSearch } from '../hooks/useSiteSearch';
import {
  hitContext,
  POPULAR_SEARCHES,
  SEARCH_RESULT_TYPES,
  SEARCH_TYPE_LABELS,
  type SearchResultType,
} from '../lib/siteSearch';
import { cn } from '../lib/utils';

const TYPE_BADGES: Record<
  SearchResultType,
  { label: string; className: string }
> = {
  service: { label: 'Service', className: 'bg-primary-100 text-primary-800' },
  government: {
    label: 'Government',
    className: 'bg-accent-100 text-accent-800',
  },
};

export default function Search() {
  const [query, setQuery] = useQueryState('q', { defaultValue: '' });
  const [typeFilter, setTypeFilter] = useQueryState(
    'type',
    parseAsStringLiteral(SEARCH_RESULT_TYPES)
  );
  const trimmedQuery = query.trim();
  const { hits, isLoading, error } = useSiteSearch(trimmedQuery);

  const counts = useMemo(() => {
    const byType: Record<SearchResultType, number> = {
      service: 0,
      government: 0,
    };
    for (const hit of hits) byType[hit.type]++;
    return byType;
  }, [hits]);

  const visibleHits = typeFilter
    ? hits.filter(hit => hit.type === typeFilter)
    : hits;

  const filters: { value: SearchResultType | null; label: string }[] = [
    { value: null, label: 'All' },
    ...SEARCH_RESULT_TYPES.filter(
      type => counts[type] > 0 || typeFilter === type
    ).map(type => ({ value: type, label: SEARCH_TYPE_LABELS[type] })),
  ];

  const hasResults = !error && !isLoading && hits.length > 0;
  const noResults = !error && !isLoading && trimmedQuery && hits.length === 0;
  const isFilteredOut = hasResults && visibleHits.length === 0;

  const statusMessage = !hasResults
    ? ''
    : isFilteredOut && typeFilter
      ? `No ${TYPE_BADGES[typeFilter].label.toLowerCase()} results for “${trimmedQuery}”.`
      : `${visibleHits.length} ${visibleHits.length === 1 ? 'result' : 'results'} for “${trimmedQuery}”`;

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <SEO
        title={trimmedQuery ? `Search: ${trimmedQuery}` : 'Search'}
        description="Search City of Caloocan services and government information."
      />
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Search</h1>

      <form
        role="search"
        onSubmit={e => e.preventDefault()}
        className="relative mb-6"
      >
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" />
        <input
          type="search"
          aria-label="Search services and government information"
          value={query}
          onChange={e => setQuery(e.target.value || null)}
          placeholder="Search services, departments, guides..."
          className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </form>

      {hasResults ? (
        <div
          role="group"
          aria-label="Filter results by type"
          className="flex flex-wrap gap-2 mb-4"
        >
          {filters.map(filter => {
            const count = filter.value ? counts[filter.value] : hits.length;
            const isActive = typeFilter === filter.value;
            return (
              <button
                key={filter.label}
                type="button"
                aria-pressed={isActive}
                onClick={() => setTypeFilter(filter.value)}
                className={cn(
                  'rounded-full border px-3 py-1 text-sm transition-colors',
                  isActive
                    ? 'border-primary-700 bg-primary-700 text-white'
                    : 'border-gray-300 text-gray-700 hover:border-primary-300 hover:bg-primary-50'
                )}
              >
                {filter.label} <span className="opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      ) : null}

      <p role="status" className="text-sm text-gray-700 mb-4">
        {statusMessage}
      </p>

      {isFilteredOut ? (
        <button
          type="button"
          onClick={() => setTypeFilter(null)}
          className="text-sm font-medium text-primary-700 hover:underline"
        >
          Show all {hits.length} results
        </button>
      ) : null}

      {error ? (
        <div className="text-center py-12 text-red-500 text-sm">{error}</div>
      ) : null}

      {!error && isLoading ? (
        <div className="text-center py-12 text-gray-700 text-sm">
          Searching...
        </div>
      ) : null}

      {hasResults ? (
        <ul className="space-y-3">
          {visibleHits.map(hit => (
            <li key={hit.id}>
              <Link to={hit.url} className="block group">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:bg-primary-50 transition-colors">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={cn(
                        'text-xs font-medium px-2 py-0.5 rounded-full',
                        TYPE_BADGES[hit.type].className
                      )}
                    >
                      {TYPE_BADGES[hit.type].label}
                    </span>
                    <span className="text-xs text-gray-700">
                      {hitContext(hit)}
                    </span>
                  </div>
                  <h2 className="text-base font-semibold text-gray-900 group-hover:text-primary-700">
                    {hit.title}
                  </h2>
                  {hit.description ? (
                    <p className="text-sm text-gray-700 mt-1">
                      {hit.description}
                    </p>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {noResults ? (
        <div className="py-10 text-center">
          <p className="text-gray-700">
            No results for{' '}
            <span className="font-medium">&ldquo;{trimmedQuery}&rdquo;</span>
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Check the spelling, try fewer or different words, or browse{' '}
            <Link to="/services" className="text-primary-700 hover:underline">
              all services
            </Link>{' '}
            and{' '}
            <Link to="/government" className="text-primary-700 hover:underline">
              government
            </Link>
            .
          </p>
        </div>
      ) : null}

      {!trimmedQuery ? (
        <div className="py-10 text-center">
          <p className="text-sm text-gray-700">
            Search across services and government information
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-gray-700">Popular:</span>
            {POPULAR_SEARCHES.map(item => (
              <Link
                key={item.label}
                to={item.href}
                className="rounded-full border border-primary-200 px-3 py-1 text-xs text-primary-700 transition-colors hover:bg-primary-50"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}
