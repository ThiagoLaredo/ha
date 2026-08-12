import { Link } from 'react-router-dom';
import './HeroSection.css';

type HeroSectionProps = {
  apiStatus: string;
};

const HeroSection = ({ apiStatus }: HeroSectionProps) => {
  return (
    <section className="home-hero">
      <video
        className="home-hero__video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/background-landing.jpeg"
        aria-hidden="true"
      >
        <source src="/optimized/home-hero.mp4" type="video/mp4" />
      </video>
      <div className="home-hero__overlay" aria-hidden="true" />

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

        <a className="home-hero__scroll" href="#recent-works-title" aria-label="Rolar para trabalhos recentes">
          <span className="home-hero__scroll-label">Scroll</span>
          <span className="home-hero__scroll-icon" aria-hidden="true">
            <span className="home-hero__scroll-dot" />
          </span>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
