import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer" aria-label="Rodape do site">
      <div className="site-footer__container">
        <span className="site-footer__brand">@Helena Augusta 2026</span>

        <div className="site-footer__links" aria-label="Links do rodape">
          <Link className="site-footer__text-link" to="/contact">
            Contato
          </Link>

          <a
            className="site-footer__text-link"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir LinkedIn"
          >
            LinkedIn
          </a>

          <a
            className="site-footer__text-link"
            href="https://www.instagram.com/helenaaugustacomunicacao/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir Instagram"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
