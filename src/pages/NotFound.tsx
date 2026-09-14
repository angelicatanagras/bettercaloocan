import { Link } from 'react-router';
import { ArrowRight, Home } from 'lucide-react';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist or may have been moved."
      />
      <main className="flex-grow">
        <Section tint="accent">
          <p className="font-heading text-xs font-semibold uppercase tracking-widest text-primary-600 mb-3">
            Error 404
          </p>
          <Heading>Page not found</Heading>
          <Text className="text-gray-600 max-w-2xl">
            The page you are looking for does not exist or may have been moved.
            Check the address, or use the links below to find what you need.
          </Text>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              <Home className="h-4 w-4" />
              Go to Home
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-md border border-primary-600 px-5 py-2.5 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Browse all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>
      </main>
    </>
  );
};

export default NotFound;
