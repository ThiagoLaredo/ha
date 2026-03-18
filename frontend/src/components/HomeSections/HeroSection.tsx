import { Link } from 'react-router-dom';
import './HeroSection.css';

type HeroSectionProps = {
  apiStatus: string;
};

const HeroSection = ({ apiStatus }: HeroSectionProps) => {
  return (
    <section className="home-hero">
      <div className="home-section__container">
        <div className="home-hero__content">
          <span className="home-hero__eyebrow">Agência digital criativa</span>
          <h1>Impulsione sua marca com presença digital</h1>
          <p>
            Criamos websites e experiências digitais sob medida para impulsionar
            sua presença online.
          </p>
          <div className="home-hero__actions">
            <Link className="home-hero__button home-hero__button--primary" to="/portfolio">
              Ver portfólio
            </Link>
            <Link className="home-hero__button home-hero__button--secondary" to="/contact">
              Falar com a gente
            </Link>
          </div>
          <p className="home-hero__status">{apiStatus}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
