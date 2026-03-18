import { useEffect, useState } from 'react';
import './Home.css';
import AboutSection from '../components/HomeSections/AboutSection';
import HeroSection from '../components/HomeSections/HeroSection';
import RecentWorksSection from '../components/HomeSections/RecentWorksSection';
import ServicesSection from '../components/HomeSections/ServicesSection';

const Home = () => {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error('Erro na resposta da API');
        return res.json();
      })
      .then((data) => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const apiStatus = loading
    ? 'Conectando ao servidor...'
    : error
      ? `Erro na API: ${error}`
      : `API ativa: ${message}`;

  return (
    <>
      <HeroSection apiStatus={apiStatus} />
      <RecentWorksSection />
      <AboutSection />
      <ServicesSection />
    </>
  );
};

export default Home;