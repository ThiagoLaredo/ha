import { useEffect, useMemo, useState } from 'react';
import './About.css';

const content = {
  pt: {
    title: 'NÓS SOMOS\nHELENA AUGUSTA.',
    paragraphs: [
      'Uma boutique de comunicação criada para marcas que entendem que reputação não se constrói apenas com exposição, se constrói com relevância.',
      'Atuamos na interseção entre comunicação, cultura, influência e negócio para transformar percepção em valor de longo prazo.',
    ],
    label: 'BOUTIQUE POR ESCOLHA.',
    items: ['Mais senioridade.', 'Mais proximidade.', 'Mais repertório.', 'Mais acesso.'],
  },
  en: {
    title: 'WE ARE\nHELENA AUGUSTA.',
    paragraphs: [
      'A communications boutique created for brands that understand reputation is not built only through exposure, but through relevance.',
      'We operate at the intersection of communication, culture, influence and business, turning perception into long-term value.',
    ],
    label: 'BOUTIQUE BY CHOICE.',
    items: ['More seniority.', 'More proximity.', 'More repertoire.', 'More access.'],
  },
} as const;

const About = () => {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');

  useEffect(() => {
    const updateLanguage = () => {
      const htmlLang = document.documentElement.lang.toLowerCase();
      setLanguage(htmlLang.startsWith('en') ? 'en' : 'pt');
    };

    updateLanguage();

    const observer = new MutationObserver(updateLanguage);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    return () => observer.disconnect();
  }, []);

  const text = useMemo(() => content[language], [language]);
  const titleLines = text.title.split('\n');

  return (
    <main className="about-page">
      <section className="about-page__hero" aria-label="We are Helena Augusta">
        <img
          src="/images/quem-somos.webp"
          alt="Equipe Helena Augusta"
          loading="eager"
          decoding="async"
        />
      </section>

      <section id="who" className="about-page__content" aria-labelledby="about-page-title">
        <div className="about-page__container">
          <h1 id="about-page-title">
            {titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>

          <div className="about-page__text">
            {text.paragraphs.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`}>{paragraph}</p>
            ))}

            <p className="about-page__label">{text.label}</p>
            <ul>
              {text.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
