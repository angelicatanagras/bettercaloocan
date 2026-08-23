import Section from '../ui/Section';
import * as LucideIcons from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from '../../hooks/useTranslation';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router';

import { governmentCategories } from '../../data/yamlLoader';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
  description: string;
  icon: string;
}

interface GovernmentActivitySectionProps {
  title?: string;
  description?: string;
  eyebrow?: string;
}

export default function GovernmentActivitySection({
  title,
  description,
  eyebrow = '06 — Government',
}: GovernmentActivitySectionProps = {}) {
  const { t } = useTranslation();

  const getIcon = (category: string, className = 'h-6 w-6') => {
    const IconComponent = LucideIcons[
      category as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  const displayedCategories = governmentCategories.categories as Category[];

  return (
    <Section id="#government" tint="primary">
      <p className="font-heading text-xs font-semibold uppercase tracking-widest text-primary-500 mb-2">
        {eyebrow}
      </p>
      <Heading level={2}>{title || t('governmentActivity.title')}</Heading>
      <Text className="text-gray-600 mb-6">
        {description || t('governmentActivity.description')}
      </Text>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedCategories.map((category, i) => (
          <Card
            key={category.slug}
            hoverable
            className="overflow-hidden bg-white p-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <Link to={`/government/${category.slug}`} className="block">
              <div className="relative flex h-28 items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'radial-gradient(white 1.4px, transparent 1.4px)',
                    backgroundSize: '16px 16px',
                  }}
                />
                <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-primary-700">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/40 text-white">
                  {getIcon(category.icon, 'h-7 w-7')}
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                  {category.category}
                </h3>
                <Text className="text-sm text-gray-600 mb-0">
                  {category.description}
                </Text>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
