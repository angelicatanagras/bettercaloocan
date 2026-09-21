import { useId, useMemo, useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import {
  searchSite,
  hitContext,
  searchUrl,
  POPULAR_SEARCHES,
} from '../../lib/siteSearch';
import { cn } from '../../lib/utils';

const MAX_SUGGESTIONS = 6;
const POPUP_CLASSNAME =
  'absolute inset-x-0 top-full z-20 mt-2 rounded-md border border-white/15 bg-primary-900 shadow-2xl';

export default function HeroSearchCard() {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isDismissed, setIsDismissed] = useState(false);
  const navigate = useNavigate();
  const headingId = useId();
  const listboxId = useId();
  const optionId = (index: number) => `${listboxId}-option-${index}`;

  const trimmedQuery = query.trim();
  const matches = useMemo(
    () => searchSite(trimmedQuery, MAX_SUGGESTIONS),
    [trimmedQuery]
  );
  const hasMatches = matches.length > 0;
  const isOpen = hasMatches && !isDismissed;
  const showNoResults = Boolean(trimmedQuery) && !hasMatches && !isDismissed;

  const handleChange = (value: string) => {
    setQuery(value);
    setActiveIndex(-1);
    setIsDismissed(false);
  };

  const dismiss = () => {
    setIsDismissed(true);
    setActiveIndex(-1);
  };

  const highlight = (index: number) => {
    setIsDismissed(false);
    setActiveIndex(index);
    document
      .getElementById(optionId(index))
      ?.scrollIntoView({ block: 'nearest' });
  };

  const submit = () => {
    const chosen = matches[activeIndex];
    if (chosen) {
      navigate(chosen.url);
    } else if (trimmedQuery) {
      navigate(searchUrl(trimmedQuery));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing) return;
      e.preventDefault();
      submit();
      return;
    }
    if (e.key === 'Escape') {
      if (isOpen || showNoResults) dismiss();
      else handleChange('');
      return;
    }
    if (!hasMatches) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlight((activeIndex + 1) % matches.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlight(activeIndex <= 0 ? matches.length - 1 : activeIndex - 1);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) dismiss();
  };

  /* Safari doesn't focus links on click, so without this the input's blur
  would close the popup before the click lands. */
  const keepInputFocus = (e: React.MouseEvent) => e.preventDefault();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  const statusMessage = !trimmedQuery
    ? ''
    : hasMatches
      ? `${matches.length} ${matches.length === 1 ? 'suggestion' : 'suggestions'} available`
      : `Nothing matches ${trimmedQuery}`;

  return (
    <div className="relative z-10 rounded-xl border border-white/10 bg-black/25 p-6 shadow-xl backdrop-blur-sm">
      <h3
        id={headingId}
        className="flex items-center gap-2 font-heading text-lg font-semibold text-white"
      >
        <Search className="h-5 w-5 text-accent-300" />
        Find a Service
      </h3>
      <p className="mt-2 text-sm text-white/70">
        Search every service the City of Caloocan offers &mdash; by what
        you&rsquo;re trying to do, not which office handles it.
      </p>

      <div className="relative mt-4" onBlur={handleBlur}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            role="combobox"
            aria-labelledby={headingId}
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-activedescendant={
              activeIndex >= 0 ? optionId(activeIndex) : undefined
            }
            autoComplete="off"
            value={query}
            onChange={e => handleChange(e.target.value)}
            onFocus={() => setIsDismissed(false)}
            onKeyDown={handleKeyDown}
            placeholder="business permit, barangay clearance, hospital…"
            className="w-full rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/60 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex shrink-0 items-center justify-center rounded-md bg-accent-500 px-3.5 text-white transition-all duration-200 hover:bg-accent-400 hover:shadow-md active:scale-95"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div role="status" className="sr-only">
          {statusMessage}
        </div>

        <div
          hidden={!isOpen}
          onMouseDown={keepInputFocus}
          className={cn(POPUP_CLASSNAME, 'flex max-h-80 flex-col')}
        >
          {/* role="option" is valid on a[href]; keeps middle-click working */}
          <div
            id={listboxId}
            role="listbox"
            aria-labelledby={headingId}
            className="min-h-0 space-y-1 overflow-y-auto p-1"
          >
            {matches.map((m, index) => (
              <Link
                key={m.id}
                id={optionId(index)}
                role="option"
                aria-selected={index === activeIndex}
                tabIndex={-1}
                to={m.url}
                /* Not onMouseEnter, arrow-key scrolling would steal the highlight */
                onMouseMove={() =>
                  index !== activeIndex && setActiveIndex(index)
                }
                className={cn(
                  'block rounded px-3 py-2 text-sm text-white/80',
                  index === activeIndex && 'bg-white/10 text-white'
                )}
              >
                {m.title}
                <span className="mt-0.5 block text-xs text-white/60">
                  {hitContext(m)}
                </span>
              </Link>
            ))}
          </div>
          <Link
            to={searchUrl(trimmedQuery)}
            className="flex shrink-0 items-center gap-1 border-t border-white/10 px-4 py-2.5 text-xs font-medium text-accent-200 transition-colors hover:text-accent-100"
          >
            See all results for &ldquo;{trimmedQuery}&rdquo;
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {showNoResults ? (
          <p
            onMouseDown={keepInputFocus}
            className={cn(POPUP_CLASSNAME, 'px-4 py-3 text-sm text-white/80')}
          >
            Nothing matches &ldquo;{trimmedQuery}&rdquo;.{' '}
            <Link
              to="/services"
              className="font-medium text-accent-200 underline-offset-2 hover:text-accent-100 hover:underline"
            >
              Browse all services
            </Link>
          </p>
        ) : null}
      </div>

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
