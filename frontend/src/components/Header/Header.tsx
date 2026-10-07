import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const MENU_ANIMATION_MS = 550;

type MenuState = 'closed' | 'opening' | 'open' | 'closing';

const menuLinks = {
  pt: [
    { label: 'Quem somos', to: '/about', ariaLabel: 'Ir para página Quem somos' },
    { label: 'O que fazemos', to: '/#o-que-fazemos', ariaLabel: 'Ir para seção O que fazemos' },
    { label: 'Cases', to: '/cases', ariaLabel: 'Ir para página Cases' },
    { label: 'Clientes', to: '/#clients', ariaLabel: 'Ir para seção Clientes' },
    { label: 'Contato', to: '/#contact', ariaLabel: 'Ir para seção Contato' },
  ],
  en: [
    { label: 'Who', to: '/about', ariaLabel: 'Go to Who page' },
    { label: 'What we do', to: '/#o-que-fazemos', ariaLabel: 'Go to What we do section' },
    { label: 'Cases', to: '/cases', ariaLabel: 'Go to Cases page' },
    { label: 'Clients', to: '/#clients', ariaLabel: 'Go to Clients section' },
    { label: 'Contact', to: '/#contact', ariaLabel: 'Go to Contact section' },
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
  const [hasStartedScroll, setHasStartedScroll] = useState<boolean>(false);
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');

  const isMenuVisible = menuState !== 'closed';
  const isMenuOpen = menuState === 'opening' || menuState === 'open';
  const labels = uiLabels[language];

  useEffect(() => {
    if (!isMenuVisible) {
      return;
    }

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = 'hidden';
    documentElement.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isMenuVisible]);

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
    let ticking = false;
    let rafHandle: number;

    const updateHeaderTheme = () => {
      setHasStartedScroll(window.scrollY > 0);

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

      const shouldUseWhiteHeader = ['#clients', '.home-clients', '.home-beyond', '#contact', '.site-footer'].some((selector) => {
        const section = document.querySelector<HTMLElement>(selector);

        if (!section) {
          return false;
        }

        const rect = section.getBoundingClientRect();
        return rect.top <= headerTrigger && rect.bottom >= headerTrigger;
      });

      if (shouldUseWhiteHeader) {
        setIsOverLightSection(false);
        return;
      }

      setIsOverLightSection(heroBottom <= headerTrigger);
    };

    const onScrollThrottled = () => {
      if (!ticking) {
        ticking = true;
        rafHandle = requestAnimationFrame(() => {
          updateHeaderTheme();
          ticking = false;
        });
      }
    };

    updateHeaderTheme();
    window.addEventListener('scroll', onScrollThrottled, { passive: true });
    window.addEventListener('resize', updateHeaderTheme);

    return () => {
      if (rafHandle) cancelAnimationFrame(rafHandle);
      window.removeEventListener('scroll', onScrollThrottled);
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

  const reducedLogoSrc = isOverLightSection ? '/logo-preto.svg' : '/logo-branco.svg';
  const initialLogoSrc = ['/about', '/contact', '/cases', '/portfolio'].includes(location.pathname)
    ? '/logo-extendido-escuro.svg'
    : '/logo-extendido-branco.svg';
  const logoSrc = hasStartedScroll ? reducedLogoSrc : initialLogoSrc;

  return (
    <>
      <Link
        to="/"
        className={`site-header__logo ${isOverLightSection ? 'is-over-light' : ''} ${hasStartedScroll ? 'is-scrolled' : ''} ${isMenuOpen ? 'is-menu-open' : ''} ${menuState === 'closing' ? 'is-menu-closing' : ''}`}
        onClick={closeMenu}
      >
        <img
          className="site-header__logo-image"
          src={logoSrc}
          alt="Helena Augusta"
        />
      </Link>

      <div
        className={`site-header__language-switch ${isOverLightSection ? 'is-over-light' : ''} ${isMenuOpen ? 'is-menu-open' : ''}`}
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
        className={`site-header__menu-button ${isOverLightSection ? 'is-over-light' : ''} ${isMenuOpen ? 'is-menu-open' : ''}`}
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
