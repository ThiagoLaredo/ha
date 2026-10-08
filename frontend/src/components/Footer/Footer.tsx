import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const footerContent = {
  pt: {
    title: 'VAMOS FAZER\nALGO\nRELEVANTE.',
    location: 'Sao Paulo · Brazil',
    contactLabel: 'Contato',
    linkedinLabel: 'LinkedIn',
    instagramLabel: 'Instagram',
    footerAriaLabel: 'Rodape do site',
    linksAriaLabel: 'Links do rodape',
    openLinkedinAria: 'Abrir LinkedIn',
    openInstagramAria: 'Abrir Instagram',
  },
  en: {
    title: "LET'S MAKE\nSOMETHING\nRELEVANT.",
    location: 'Sao Paulo · Brazil',
    contactLabel: 'Contact',
    linkedinLabel: 'LinkedIn',
    instagramLabel: 'Instagram',
    footerAriaLabel: 'Site footer',
    linksAriaLabel: 'Footer links',
    openLinkedinAria: 'Open LinkedIn',
    openInstagramAria: 'Open Instagram',
  },
} as const;

const Footer = () => {
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

  const text = footerContent[language];

  return (
    <footer
      id="contact"
      className="site-footer"
      data-lang={language}
      aria-labelledby="site-footer-title"
      aria-label={text.footerAriaLabel}
    >
      <div className="site-footer__container">
        <h2 id="site-footer-title" className="site-footer__title">
          {text.title.split('\n').map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </h2>

        <a href="mailto:contato@helenaaugusta.com" className="site-footer__email">
          contato@helenaaugusta.com
        </a>

        <p className="site-footer__location">{text.location}</p>

        <div className="site-footer__links" aria-label={text.linksAriaLabel}>
          <Link className="site-footer__text-link" to={language === 'pt' ? '/contato' : '/contact'}>
            {text.contactLabel}
          </Link>

          <a
            className="site-footer__text-link"
            href="https://br.linkedin.com/company/helenaaugustacomunicacao"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={text.openLinkedinAria}
          >
            {text.linkedinLabel}
          </a>

          <a
            className="site-footer__text-link"
            href="https://www.instagram.com/helenaaugustacomunicacao/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={text.openInstagramAria}
          >
            {text.instagramLabel}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
