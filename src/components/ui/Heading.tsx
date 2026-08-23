import React from 'react';
import { cn } from '../../lib/utils';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const headingStyles = {
  1: 'text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-4 leading-tight tracking-tight text-balance',
  2: 'text-xl md:text-2xl lg:text-3xl font-heading font-bold mb-4 leading-tight tracking-tight text-balance',
  3: 'text-lg md:text-xl lg:text-2xl font-heading font-semibold mb-4 leading-snug',
  4: 'text-base md:text-lg lg:text-xl font-heading font-semibold mb-4 leading-snug',
  5: 'text-sm md:text-base lg:text-lg font-heading font-semibold mb-4 leading-snug',
  6: 'text-sm md:text-base font-heading font-semibold mb-4 leading-snug',
};

export function Heading({ level = 1, children, className }: HeadingProps) {
  const baseClasses = headingStyles[level];
  const combinedClasses = cn(baseClasses, className);

  const HeadingTag = `h${level}`;

  return React.createElement(
    HeadingTag,
    { className: combinedClasses },
    children
  );
}
