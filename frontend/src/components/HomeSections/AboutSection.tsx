import './AboutSection.css';

const AboutSection = () => {
  return (
    <section className="home-section home-section--muted" aria-labelledby="about-title">
      <div className="home-section__container about-section">
        <div>
          <h2 id="about-title">Quem somos</h2>
          <p>
            Somos uma equipe focada em estratégia, design e desenvolvimento para
            transformar ideias em produtos digitais de valor.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
