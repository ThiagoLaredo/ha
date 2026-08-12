import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const MENU_ANIMATION_MS = 550;

type MenuState = 'closed' | 'opening' | 'open' | 'closing';

const menuLinks = {
  pt: [
    { label: 'O que fazemos?', to: '/#what-do-we-do', ariaLabel: 'Ir para seção O que fazemos' },
    { label: 'O quê', to: '/#what', ariaLabel: 'Ir para seção O quê' },
    { label: 'Quem somos', to: '/#who', ariaLabel: 'Ir para seção Quem somos' },
    { label: 'Contato', to: '/contact', ariaLabel: 'Ir para página de contato' },
  ],
  en: [
    { label: 'What do we do?', to: '/#what-do-we-do', ariaLabel: 'Go to What do we do section' },
    { label: 'What', to: '/#what', ariaLabel: 'Go to What section' },
    { label: 'Who', to: '/#who', ariaLabel: 'Go to Who section' },
    { label: 'Contact', to: '/contact', ariaLabel: 'Go to contact page' },
  ],
} as const;

const uiLabels = {
  pt: {
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    menuDialog: 'Menu principal',
    languageSwitcher: 'Seleção de idioma',
    setPortuguese: 'Mudar idioma para português',
    setEnglish: 'Mudar idioma para inglês',
  },
  en: {
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menuDialog: 'Main menu',
    languageSwitcher: 'Language selection',
    setPortuguese: 'Set language to Portuguese',
    setEnglish: 'Set language to English',
  },
} as const;

const Header = () => {
  const location = useLocation();
  const [menuState, setMenuState] = useState<MenuState>('closed');
  const [isOverLightSection, setIsOverLightSection] = useState<boolean>(location.pathname !== '/');
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');

  const isMenuVisible = menuState !== 'closed';
  const isMenuOpen = menuState === 'opening' || menuState === 'open';
  const labels = uiLabels[language];

  useEffect(() => {
    if (menuState === 'opening') {
      const openTimeout = setTimeout(() => setMenuState('open'), MENU_ANIMATION_MS);
      return () => clearTimeout(openTimeout);
    }

    if (menuState === 'closing') {
      const closeTimeout = setTimeout(() => setMenuState('closed'), MENU_ANIMATION_MS);
      return () => clearTimeout(closeTimeout);
    }
  }, [menuState]);

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

  useEffect(() => {
    const updateHeaderTheme = () => {
      if (location.pathname !== '/') {
        setIsOverLightSection(true);
        return;
      }

      const heroSection = document.querySelector<HTMLElement>('.home-hero');

      if (!heroSection) {
        setIsOverLightSection(true);
        return;
      }

      const heroBottom = heroSection.getBoundingClientRect().bottom;
      const headerTrigger = 80;
      setIsOverLightSection(heroBottom <= headerTrigger);
    };

    updateHeaderTheme();
    window.addEventListener('scroll', updateHeaderTheme, { passive: true });
    window.addEventListener('resize', updateHeaderTheme);

    return () => {
      window.removeEventListener('scroll', updateHeaderTheme);
      window.removeEventListener('resize', updateHeaderTheme);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) {
      return;
    }

    const targetId = location.hash.replace('#', '');

    requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      if (!target) {
        return;
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [location.pathname, location.hash]);

  const openMenu = () => setMenuState('opening');

  const closeMenu = () => {
    if (menuState === 'closed' || menuState === 'closing') {
      return;
    }

    setMenuState('closing');
  };

  const changeLanguage = (nextLanguage: 'pt' | 'en') => {
    const nextLangAttribute = nextLanguage === 'pt' ? 'pt-BR' : 'en';
    document.documentElement.lang = nextLangAttribute;
    setLanguage(nextLanguage);
  };

  return (
    <>
      <Link
        to="/"
        className={`site-header__logo ${isOverLightSection ? 'is-over-light' : ''} ${isMenuOpen ? 'is-menu-open' : ''} ${menuState === 'closing' ? 'is-menu-closing' : ''}`}
        onClick={closeMenu}
      >
        <img
          className="site-header__logo-image"
          src={isOverLightSection ? '/logo-preto.svg' : '/logo-branco.svg'}
          alt="Helena Augusta"
        />
      </Link>

      <div
        className={`site-header__language-switch ${isOverLightSection ? 'is-over-light' : ''}`}
        role="group"
        aria-label={labels.languageSwitcher}
      >
        <button
          type="button"
          className={`site-header__language-button ${language === 'pt' ? 'is-active' : ''}`}
          aria-label={labels.setPortuguese}
          aria-pressed={language === 'pt'}
          onClick={() => changeLanguage('pt')}
        >
          PT
        </button>

        <button
          type="button"
          className={`site-header__language-button ${language === 'en' ? 'is-active' : ''}`}
          aria-label={labels.setEnglish}
          aria-pressed={language === 'en'}
          onClick={() => changeLanguage('en')}
        >
          EN
        </button>
      </div>

      <button
        type="button"
        className={`site-header__menu-button ${isOverLightSection ? 'is-over-light' : ''}`}
        aria-label={isMenuOpen ? labels.closeMenu : labels.openMenu}
        aria-expanded={isMenuOpen}
        onClick={isMenuOpen ? closeMenu : openMenu}
      >
        <span />
        <span />
        <span />
      </button>

      {isMenuVisible && (
        <div
          className={`site-menu ${menuState === 'closing' ? 'is-closing' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label={labels.menuDialog}
        >
          <button
            type="button"
            className="site-menu__close"
            aria-label={labels.closeMenu}
            onClick={closeMenu}
          >
            ✕
          </button>

          <nav className="site-menu__nav">
            {menuLinks[language].map((item) => (
              <Link key={item.label} to={item.to} onClick={closeMenu} aria-label={item.ariaLabel}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
