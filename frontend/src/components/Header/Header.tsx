import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const logoText = 'OLATU';
const MENU_ANIMATION_MS = 550;

type MenuState = 'closed' | 'opening' | 'open' | 'closing';

const Header = () => {
  const location = useLocation();
  const [menuState, setMenuState] = useState<MenuState>('closed');
  const [isOverLightSection, setIsOverLightSection] = useState<boolean>(location.pathname !== '/');

  const isMenuVisible = menuState !== 'closed';
  const isMenuOpen = menuState === 'opening' || menuState === 'open';

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

  const openMenu = () => setMenuState('opening');

  const closeMenu = () => {
    if (menuState === 'closed' || menuState === 'closing') {
      return;
    }

    setMenuState('closing');
  };

  return (
    <>
      <Link
        to="/"
        className={`site-header__logo ${isOverLightSection ? 'is-over-light' : ''} ${isMenuOpen ? 'is-menu-open' : ''} ${menuState === 'closing' ? 'is-menu-closing' : ''}`}
        onClick={closeMenu}
      >
        <span className="site-header__logo-word" aria-hidden="true">
          {logoText.split('').map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="site-header__logo-letter"
              data-char={char}
              style={{ '--i': index } as CSSProperties}
            >
              {char}
            </span>
          ))}
        </span>
        <span className="site-header__sr-only">{logoText}</span>
      </Link>

      <button
        type="button"
        className={`site-header__menu-button ${isOverLightSection ? 'is-over-light' : ''}`}
        aria-label="Abrir menu"
        onClick={openMenu}
      >
        <span />
        <span />
        <span />
      </button>

      {isMenuVisible && (
        <div className={`site-menu ${menuState === 'closing' ? 'is-closing' : ''}`} role="dialog" aria-modal="true">
          <button
            type="button"
            className="site-menu__close"
            aria-label="Fechar menu"
            onClick={closeMenu}
          >
            ✕
          </button>

          <nav className="site-menu__nav">
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/sobre" onClick={closeMenu}>
              Sobre
            </Link>
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
