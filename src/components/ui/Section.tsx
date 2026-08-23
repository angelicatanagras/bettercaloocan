import { cn } from '../../lib/utils';

type SectionTint = 'plain' | 'primary' | 'accent' | 'dark';
type SectionPattern = 'none' | 'dots' | 'lines';

const tintClasses: Record<SectionTint, string> = {
  plain: 'bg-[#fbf9f6]',
  primary: 'bg-primary-50',
  accent: 'bg-accent-50',
  dark: 'bg-primary-900 text-white',
};

const patternStyle: Record<
  Exclude<SectionPattern, 'none'>,
  React.CSSProperties
> = {
  dots: {
    backgroundImage: 'radial-gradient(currentColor 1.6px, transparent 1.6px)',
    backgroundSize: '20px 20px',
  },
  lines: {
    backgroundImage:
      'repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 32px)',
  },
};

const patternOpacity: Record<Exclude<SectionPattern, 'none'>, string> = {
  dots: 'opacity-[0.14]',
  lines: 'opacity-[0.05]',
};

export default function Section({
  children,
  className,
  id,
  tint = 'plain',
  pattern = 'none',
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tint?: SectionTint;
  pattern?: SectionPattern;
}) {
  return (
    <section
      className={cn(
        'relative py-12 overflow-hidden',
        tintClasses[tint],
        className
      )}
      id={id}
    >
      {pattern !== 'none' && (
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0',
            patternOpacity[pattern],
            tint === 'dark' ? 'text-white' : 'text-primary-900'
          )}
          style={patternStyle[pattern]}
        />
      )}
      <div className={cn('container relative mx-auto px-4', className)}>
        {children}
      </div>
    </section>
  );
}
