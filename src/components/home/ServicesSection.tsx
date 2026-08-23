import Section from '../ui/Section';
import * as LucideIcons from 'lucide-react';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from '../../hooks/useTranslation';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Link } from 'react-router';

import { serviceCategories, getCategoryIndexSync } from '../../data/yamlLoader';

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

export default function ServicesSection({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  const { t } = useTranslation();

  const getIcon = (category: string) => {
    const IconComponent = LucideIcons[
      category as keyof typeof LucideIcons
    ] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  const displayedCategories = serviceCategories.categories as Category[];

  const getServiceCount = (slug: string) =>
    getCategoryIndexSync(slug).pages.length;

  return (
    <Section>
      <p className="font-heading text-xs font-semibold uppercase tracking-widest text-primary-500 mb-2">
        01 &mdash; Services
      </p>
      <Heading level={2}>{title || t('services.title')}</Heading>
      <Text className="text-gray-600 mb-6">
        {description || t('services.description')}
      </Text>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedCategories.map(category => (
          <Card
            key={category.slug}
            hoverable
            className="group border-t-4 border-primary-500 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <Link
              to={`/services/${category.slug}`}
              className="mt-auto text-primary-600 hover:text-primary-700 font-medium transition-colors inline-flex items-center"
            >
              <CardContent className="flex flex-col h-full p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary-100 text-primary-600 p-2.5 rounded-md shrink-0 transition-colors group-hover:bg-primary-200">
                    {getIcon(category.icon)}
                  </div>

                  <h3 className="text-base font-semibold text-gray-900">
                    {category.category}
                  </h3>
                </div>
                <Text className="text-sm text-gray-500 mb-0">
                  {getServiceCount(category.slug)}{' '}
                  {getServiceCount(category.slug) === 1
                    ? 'service'
                    : 'services'}
                </Text>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </Section>
  );
}
