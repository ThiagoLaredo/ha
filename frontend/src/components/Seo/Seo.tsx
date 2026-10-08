import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Language = 'pt' | 'en';
type PageKey = 'home' | 'about' | 'portfolio' | 'contact';

type SeoConfig = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  canonicalPath: string;
};

const seoContent: Record<Language, Record<PageKey, SeoConfig>> = {
  pt: {
    home: {
      title: 'Helena Augusta | Comunicação como ativo',
      description:
        'Boutique de comunicação em São Paulo que conecta estratégia, cultura e influência para fortalecer marcas e reputação.',
      image: '/images/seo/helena-augusta-share.jpg',
      imageAlt: 'Helena Augusta - boutique de comunicação',
      canonicalPath: '/',
    },
    about: {
      title: 'Quem Somos | Helena Augusta',
      description:
        'Conheça a Helena Augusta, boutique de comunicação especializada em posicionamento, reputação e relacionamento com marcas.',
      image: '/images/seo/helena-augusta-share.jpg',
      imageAlt: 'Helena Augusta - boutique de comunicação',
      canonicalPath: '/quem-somos',
    },
    portfolio: {
      title: 'Cases | Helena Augusta',
      description:
        'Veja uma seleção de cases de comunicação, influência e estratégia desenvolvidos para marcas que buscam relevância.',
      image: '/images/Cases/LBP/geral.webp',
      imageAlt: 'Case LBP da Helena Augusta',
      canonicalPath: '/cases',
    },
    contact: {
      title: 'Contato | Helena Augusta',
      description:
        'Fale com a Helena Augusta para discutir estratégia, posicionamento, lançamentos e oportunidades de colaboração.',
      image: '/images/seo/helena-augusta-share.jpg',
      imageAlt: 'Helena Augusta - boutique de comunicação',
      canonicalPath: '/contato',
    },
  },
  en: {
    home: {
      title: 'Helena Augusta | Communication as an asset',
      description:
        'A communications boutique in São Paulo connecting strategy, culture and influence to strengthen brands and reputation.',
      image: '/images/seo/helena-augusta-share.jpg',
      imageAlt: 'Helena Augusta - communications boutique',
      canonicalPath: '/',
    },
    about: {
      title: 'Who We Are | Helena Augusta',
      description:
        'Meet Helena Augusta, a communications boutique focused on positioning, reputation and brand relationships.',
      image: '/images/seo/helena-augusta-share.jpg',
      imageAlt: 'Helena Augusta - communications boutique',
      canonicalPath: '/who',
    },
    portfolio: {
      title: 'Cases | Helena Augusta',
      description:
        'Explore a selection of communication, influence and strategy cases built for brands seeking relevance.',
      image: '/images/Cases/LBP/geral.webp',
      imageAlt: 'LBP case by Helena Augusta',
      canonicalPath: '/cases',
    },
    contact: {
      title: 'Contact | Helena Augusta',
      description:
        'Get in touch with Helena Augusta to discuss strategy, positioning, launches and collaboration opportunities.',
      image: '/images/seo/helena-augusta-share.jpg',
      imageAlt: 'Helena Augusta - communications boutique',
      canonicalPath: '/contact',
    },
  },
};

const routeAliases: Record<string, PageKey> = {
  '/': 'home',
  '/about': 'about',
  '/sobre': 'about',
  '/quem-somos': 'about',
  '/who': 'about',
  '/cases': 'portfolio',
  '/portfolio': 'portfolio',
  '/contact': 'contact',
  '/contato': 'contact',
};

const setMetaTag = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);

  if (!element) {
    element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const removeLinkBySelector = (selector: string) => {
  const element = document.head.querySelector(selector);
  if (element) {
    element.remove();
  }
};

const Seo = () => {
  const location = useLocation();
  const [language, setLanguage] = useState<Language>('pt');

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

  const seo = useMemo(() => {
    const pageKey = routeAliases[location.pathname] ?? 'home';
    return seoContent[language][pageKey];
  }, [language, location.pathname]);

  useEffect(() => {
    const origin = window.location.origin;
    const canonicalUrl = new URL(seo.canonicalPath, origin).toString();
    const shareImage = new URL(seo.image, origin).toString();
    const ptUrl = new URL(seoContent.pt[routeAliases[location.pathname] ?? 'home'].canonicalPath, origin).toString();
    const enUrl = new URL(seoContent.en[routeAliases[location.pathname] ?? 'home'].canonicalPath, origin).toString();

    document.title = seo.title;

    setMetaTag('meta[name="description"]', { name: 'description', content: seo.description });
    setMetaTag('meta[name="robots"]', { name: 'robots', content: 'index,follow' });

    setMetaTag('meta[property="og:site_name"]', { property: 'og:site_name', content: 'Helena Augusta' });
    setMetaTag('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setMetaTag('meta[property="og:locale"]', {
      property: 'og:locale',
      content: language === 'en' ? 'en_US' : 'pt_BR',
    });
    setMetaTag('meta[property="og:title"]', { property: 'og:title', content: seo.title });
    setMetaTag('meta[property="og:description"]', { property: 'og:description', content: seo.description });
    setMetaTag('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    setMetaTag('meta[property="og:image"]', { property: 'og:image', content: shareImage });
    setMetaTag('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' });
    setMetaTag('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' });
    setMetaTag('meta[property="og:image:alt"]', { property: 'og:image:alt', content: seo.imageAlt });

    setMetaTag('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMetaTag('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title });
    setMetaTag('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description });
    setMetaTag('meta[name="twitter:image"]', { name: 'twitter:image', content: shareImage });
    setMetaTag('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: seo.imageAlt });

    setMetaTag('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });
    setMetaTag('link[rel="alternate"][hreflang="pt-BR"]', { rel: 'alternate', hreflang: 'pt-BR', href: ptUrl });
    setMetaTag('link[rel="alternate"][hreflang="en"]', { rel: 'alternate', hreflang: 'en', href: enUrl });
    setMetaTag('link[rel="alternate"][hreflang="x-default"]', { rel: 'alternate', hreflang: 'x-default', href: ptUrl });

    return () => {
      removeLinkBySelector('link[rel="alternate"][hreflang="pt-BR"]');
      removeLinkBySelector('link[rel="alternate"][hreflang="en"]');
      removeLinkBySelector('link[rel="alternate"][hreflang="x-default"]');
    };
  }, [language, location.pathname, seo]);

  return null;
};

export default Seo;