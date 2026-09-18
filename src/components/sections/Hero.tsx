import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { ArrowRight, Mail } from 'lucide-react';
import { Text } from '../ui/Text';
import HeroSearchCard from './HeroSearchCard';

export default function Hero() {
  const { t } = useTranslation();
  return (
    <div className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white py-14 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-white opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="container relative mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left section with title and CTAs */}
          <div className="animate-fade-in">
            <Text
              transform="uppercase"
              className="text-accent-300 font-heading text-xs font-semibold tracking-widest mb-3"
            >
              City of Caloocan · Metro Manila
            </Text>
            <h1 className="font-heading font-bold leading-[1.05] tracking-tight text-3xl md:text-4xl lg:text-5xl text-balance">
              <span className="block text-white/70 text-xl md:text-2xl font-semibold mb-1">
                Welcome to
              </span>
              City of{' '}
              <span className="text-accent-300">
                {import.meta.env.VITE_GOVERNMENT_NAME?.replace(
                  'City of ',
                  ''
                ) || 'Caloocan'}
              </span>
            </h1>
            <Text className="text-white/80 mt-4 max-w-md">
              {t('hero.subtitle')}
            </Text>

            <div className="flex flex-wrap items-center gap-3 mt-7">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-md bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-accent-400 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-300"
              >
                Browse all services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/government/departments/executive"
                className="inline-flex items-center gap-2 rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10 hover:border-white/70 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Mail className="h-4 w-4" />
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right section with quick service search */}
          <div className="animate-fade-in">
            <HeroSearchCard />
          </div>
        </div>
      </div>
    </div>
  );
}
