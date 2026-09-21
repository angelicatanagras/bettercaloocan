import MiniSearch from 'minisearch';
import {
  serviceCategories,
  governmentCategories,
  getCategoryIndexSync,
  isNestedCategory,
  type CategoryData,
} from '../data/yamlLoader';

export const SEARCH_RESULT_TYPES = ['service', 'government'] as const;
export type SearchResultType = (typeof SEARCH_RESULT_TYPES)[number];

/* Must stay compatible with Meilisearch's SearchHit. */
export interface SiteSearchHit {
  id: string;
  title: string;
  description: string;
  type: SearchResultType;
  category: string;
  url: string;
  kind?: 'category' | 'page';
}

interface SearchDoc extends SiteSearchHit {
  keywords: string;
}

/* Lazy glob: only the file paths are bundled, not the markdown */
const CONTENT_PREFIX = '../../content/';
const WRITTEN_PAGES = new Set(
  Object.keys(
    import.meta.glob('../../content/{services,government}/*/*.md', {
      query: '?raw',
    })
  ).map(path => path.slice(CONTENT_PREFIX.length).replace(/\.md$/, ''))
);

const SECTIONS: {
  type: SearchResultType;
  dir: 'services' | 'government';
  data: CategoryData;
}[] = [
  { type: 'service', dir: 'services', data: serviceCategories },
  { type: 'government', dir: 'government', data: governmentCategories },
];

const SEARCH_DOCS: SearchDoc[] = SECTIONS.flatMap(({ type, dir, data }) =>
  data.categories
    .filter(c => isNestedCategory(c.slug))
    .flatMap(c => [
      {
        id: `${dir}/${c.slug}`,
        title: c.category,
        description: c.description,
        type,
        category: c.category,
        url: `/${dir}/${c.slug}`,
        kind: 'category' as const,
        keywords: '',
      },
      ...getCategoryIndexSync(c.slug)
        .pages.filter(
          p =>
            WRITTEN_PAGES.has(`${dir}/${c.slug}/${p.slug}`) ||
            /* Nested listings (e.g. legislative) have no .md but still render */
            isNestedCategory(p.slug)
        )
        .map(p => ({
          id: `${dir}/${c.slug}/${p.slug}`,
          title: p.name,
          description: p.description ?? '',
          type,
          category: c.category,
          url: `/${dir}/${c.slug}/${p.slug}`,
          kind: 'page' as const,
          keywords: (p.keywords ?? []).join(' '),
        })),
    ])
);

const searchIndex = new MiniSearch<SearchDoc>({
  fields: ['title', 'keywords', 'category', 'description'],
  storeFields: ['title', 'description', 'type', 'category', 'url', 'kind'],
  searchOptions: {
    boost: { title: 3, keywords: 2, category: 1.5 },
    prefix: true,
    fuzzy: 0.2,
    combineWith: 'AND',
  },
});
searchIndex.addAll(SEARCH_DOCS);

const EXACT_PHRASE_BOOST = 2;

export function searchSite(query: string, limit?: number): SiteSearchHit[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const phrase = trimmed.toLowerCase();
  const results = searchIndex.search(trimmed, {
    boostDocument: (_id, _term, stored) =>
      String(stored?.title).toLowerCase().includes(phrase)
        ? EXACT_PHRASE_BOOST
        : 1,
  });
  return results.slice(0, limit).map(r => ({
    id: r.id as string,
    title: r.title as string,
    description: r.description as string,
    type: r.type as SearchResultType,
    category: r.category as string,
    url: r.url as string,
    kind: r.kind as SiteSearchHit['kind'],
  }));
}

export const SEARCH_TYPE_LABELS: Record<SearchResultType, string> = {
  service: 'Services',
  government: 'Government',
};

export function hitContext(hit: SiteSearchHit): string {
  return hit.kind === 'category' ? SEARCH_TYPE_LABELS[hit.type] : hit.category;
}

export function searchUrl(query: string): string {
  return `/search?${new URLSearchParams({ q: query.trim() })}`;
}

export const POPULAR_SEARCHES = [
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
