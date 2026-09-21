import { useEffect, useMemo, useState } from 'react';
import { isMeilisearchEnabled, searchMeilisearch } from '../lib/meilisearch';
import { searchSite, type SiteSearchHit } from '../lib/siteSearch';

const DEBOUNCE_MS = 300;

export interface SiteSearchState {
  hits: SiteSearchHit[];
  isLoading: boolean;
  error: string | null;
}

const EMPTY_STATE: SiteSearchState = {
  hits: [],
  isLoading: false,
  error: null,
};

export function useSiteSearch(query: string): SiteSearchState {
  const localHits = useMemo(
    () => (isMeilisearchEnabled ? [] : searchSite(query)),
    [query]
  );
  const [remote, setRemote] = useState(EMPTY_STATE);

  useEffect(() => {
    if (!isMeilisearchEnabled || !query) return;

    const timer = setTimeout(async () => {
      setRemote(s => ({ ...s, isLoading: true, error: null }));
      try {
        const hits = await searchMeilisearch(query);
        setRemote({ hits, isLoading: false, error: null });
      } catch {
        setRemote({
          ...EMPTY_STATE,
          error: 'Search is unavailable. Please try again later.',
        });
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isMeilisearchEnabled) return { ...EMPTY_STATE, hits: localHits };
  return query ? remote : EMPTY_STATE;
}
