import Hero from '../components/sections/Hero';
import StatsBar from '../components/sections/StatsBar';
import ServicesSection from '../components/home/ServicesSection';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import WeatherMapSection from '../components/home/WeatherMapSection';
import ZoneSelectorSection from '../components/home/ZoneSelectorSection';
import HistorySection from '../components/home/HistorySection';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Official website of your local government. Access government services, information, and resources."
        keywords="government, local government, services, public services, civic services"
      />
      <main className="flex-grow">
        <Hero />
        <StatsBar />
        <ServicesSection />
        <WeatherMapSection />
        <ZoneSelectorSection />
        <HistorySection />
        <GovernmentActivitySection />
      </main>
    </>
  );
};

export default Home;
