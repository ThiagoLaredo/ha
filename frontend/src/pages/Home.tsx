import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import './Home.css';

const carouselImages = [
  {
    src: '/images/home/hero-carousel/slide-1.jpg',
    desktopPosition: '50% 50%',
    mobilePosition: '56% 50%',
  },
  {
    src: '/images/home/hero-carousel/slide-2.jpg',
    desktopPosition: '50% 45%',
    mobilePosition: '52% 42%',
  },
  {
    src: '/images/home/hero-carousel/slide-3.jpg',
    desktopPosition: '50% 50%',
    mobilePosition: '48% 50%',
  },
  {
    src: '/images/home/hero-carousel/slide-4.jpg',
    desktopPosition: '48% 50%',
    mobilePosition: '44% 50%',
  },
  {
    src: '/images/home/hero-carousel/slide-5.jpg',
    desktopPosition: '50% 52%',
    mobilePosition: '50% 48%',
  },
];

const clientFiles = [
  'Adcos.jpg',
  'Anny Meisler.jpg',
  'Blumi.jpg',
  'Buba.png',
  'ByPam.jpg',
  'Calma.jpeg',
  'Camila Fremder.jpg',
  'Cris Dios Organics.jpg',
  'Elbo.jpg',
  'Enredo.jpg',
  'Feel.jpg',
  'Fran by Franciny Ehlke.jpg',
  'Givaudan.jpg',
  'Glamour.jpg',
  'Karen Bachini Beauty.jpg',
  "L'envie.jpg",
  'Laces.jpeg',
  'LCS.jpg',
  'Lenvie.jpg',
  'Luz da lua.png',
  'Mart.jpg',
  'Paula Martins.jpg',
  'Urban Arts.jpg',
] as const;

const content = {
  pt: {
    title: 'Mais do que contar histórias, criamos reputação.',
    sectionTitle: 'Somos contadores de histórias.',
    sectionParagraphs: [
      'Somos uma consultoria de imprensa lifestyle em moda, beleza, decoração, gastronomia, hospitalidade, mídia, inovação e corporativo.',
      'Temos paixão em ajudar nossos clientes a comunicar suas marcas e projetos.',
      'Vamos contar sua história juntos?',
      'Nos divertimos trabalhando.',
    ],
    servicesTitle: 'O que fazemos?',
    servicesItems: [
      {
        title: 'Marcas',
        description: 'Lançamos ou reposicionamos sua marca.',
      },
      {
        title: 'Produto',
        description:
          'Enviamos seus produtos para as pessoas certas: jornalistas, stylists, influenciadores e celebridades.',
      },
      {
        title: 'Eventos',
        description: 'Nós realizamos o seu evento.',
      },
      {
        title: 'Mídia',
        description: 'Colocamos sua marca na mídia, seja em texto, imagem ou vídeo.',
      },
    ],
    clientsTitle: 'Clientes',
  },
  en: {
    title: 'More than telling stories, we build reputation.',
    sectionTitle: 'We are storytellers.',
    sectionParagraphs: [
      'We are an advisory of lifestyle press - fashion, beauty, decoration, gastronomy, hospitality; media, innovation and corporate.',
      'We have passion in helping our clients communicate their brands and projects.',
      'Let’s tell your story together?',
      'We have fun working.',
    ],
    servicesTitle: 'What do we do?',
    servicesItems: [
      {
        title: 'Brands',
        description: 'We launch or reposition your brand.',
      },
      {
        title: 'Product',
        description:
          'We send your products to the right people: journalists, stylists, social media influencers and celebrities.',
      },
      {
        title: 'Events',
        description: 'We make your event happen.',
      },
      {
        title: 'Media',
        description: 'We place your brand in the media, through text, imagery, or video.',
      },
    ],
    clientsTitle: 'Clients',
  },
} as const;

const SLIDE_INTERVAL_MS = 5800;
const AUTO_PLAY_PAUSE_MS = SLIDE_INTERVAL_MS * 2;

const Home = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [isStoryVisible, setIsStoryVisible] = useState<boolean>(false);
  const [activeClientIndex, setActiveClientIndex] = useState<number>(0);
  const pauseAutoPlayUntil = useRef<number>(0);
  const storyRef = useRef<HTMLElement | null>(null);
  const clientNamesRef = useRef<HTMLUListElement | null>(null);
  const clientItemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const activeClientIndexRef = useRef<number>(0);

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
    const intervalId = window.setInterval(() => {
      if (Date.now() < pauseAutoPlayUntil.current) {
        return;
      }

      setActiveSlide((previousSlide) => (previousSlide + 1) % carouselImages.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!storyRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) {
          return;
        }

        if (entry.isIntersecting) {
          setIsStoryVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.24 }
    );

    observer.observe(storyRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    activeClientIndexRef.current = activeClientIndex;
  }, [activeClientIndex]);

  useEffect(() => {
    const namesContainer = clientNamesRef.current;
    if (!namesContainer) {
      return;
    }

    let rafId = 0;
    let lastWheelTime = 0;
    let isProgrammaticScroll = false;

    const scrollItemIntoView = (index: number) => {
      const itemElements = clientItemRefs.current.filter(Boolean) as HTMLLIElement[];
      const targetItem = itemElements[index];
      if (!targetItem) {
        return;
      }

      isProgrammaticScroll = true;
      targetItem.scrollIntoView({ block: 'nearest' });

      window.setTimeout(() => {
        isProgrammaticScroll = false;
      }, 140);
    };

    const updateActiveFromScroll = () => {
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      if (!mediaQuery.matches) {
        return;
      }

      if (isProgrammaticScroll) {
        return;
      }

      const itemElements = clientItemRefs.current.filter(Boolean) as HTMLLIElement[];
      if (!itemElements.length) {
        return;
      }

      const maxScrollTop = Math.max(namesContainer.scrollHeight - namesContainer.clientHeight, 0);
      const ratio = maxScrollTop === 0 ? 0 : namesContainer.scrollTop / maxScrollTop;
      const clampedRatio = Math.min(Math.max(ratio, 0), 1);
      const nextIndex = Math.min(
        itemElements.length - 1,
        Math.max(0, Math.round(clampedRatio * (itemElements.length - 1)))
      );

      setActiveClientIndex((previousIndex) => (previousIndex === nextIndex ? previousIndex : nextIndex));
    };

    const onWheel = (event: WheelEvent) => {
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      if (!mediaQuery.matches) {
        return;
      }

      if (Math.abs(event.deltaY) < 1) {
        return;
      }

      const now = Date.now();
      if (now - lastWheelTime < 80) {
        return;
      }

      const itemElements = clientItemRefs.current.filter(Boolean) as HTMLLIElement[];
      if (!itemElements.length) {
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const currentIndex = activeClientIndexRef.current;
      const nextIndex = Math.min(itemElements.length - 1, Math.max(0, currentIndex + direction));

      if (nextIndex === currentIndex) {
        return;
      }

      event.preventDefault();
      lastWheelTime = now;
      activeClientIndexRef.current = nextIndex;
      setActiveClientIndex(nextIndex);
      scrollItemIntoView(nextIndex);
    };

    const onScroll = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        updateActiveFromScroll();
        rafId = 0;
      });
    };

    updateActiveFromScroll();

    namesContainer.addEventListener('scroll', onScroll, { passive: true });
    namesContainer.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', updateActiveFromScroll);

    return () => {
      namesContainer.removeEventListener('scroll', onScroll);
      namesContainer.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', updateActiveFromScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const text = useMemo(() => content[language], [language]);
  const clients = useMemo(
    () =>
      clientFiles.map((fileName) => ({
        name: fileName.replace(/\.[^/.]+$/, ''),
        src: `/images/home/clients/${encodeURIComponent(fileName)}`,
      })),
    []
  );
  const activeClient = clients[activeClientIndex] ?? clients[0];

  const goToSlide = (slideIndex: number) => {
    pauseAutoPlayUntil.current = Date.now() + AUTO_PLAY_PAUSE_MS;
    setActiveSlide(slideIndex);
  };

  return (
    <main>
      <section className="home-hero" aria-label="Hero">
        <div className="home-hero__carousel" aria-hidden="true">
          {carouselImages.map((image, index) => (
            <div
              key={image.src}
              className={`home-hero__slide ${index === activeSlide ? 'is-active' : ''}`}
              style={
                {
                  backgroundImage: `url(${image.src})`,
                  '--slide-pos-desktop': image.desktopPosition,
                  '--slide-pos-mobile': image.mobilePosition,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="home-hero__overlay" />

        <div className="home-hero__content">
          <div className="home-section__container home-hero__inner">
            <h1>{text.title}</h1>
          </div>
        </div>

        <div className="home-hero__indicators" role="tablist" aria-label="Slides da hero">
          {carouselImages.map((_, index) => (
            <button
              key={`indicator-${index}`}
              type="button"
              className={`home-hero__indicator ${index === activeSlide ? 'is-active' : ''}`}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={index === activeSlide}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section
        id="who"
        ref={storyRef}
        className={`home-story ${isStoryVisible ? 'is-visible' : ''}`}
        aria-labelledby="who-title"
      >
        <div className="home-story__container">
          <h2 id="who-title">{text.sectionTitle}</h2>

          <div className="home-story__content">
            {text.sectionParagraphs.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <div className="home-divider-shell" aria-hidden="true">
        <div className="home-divider" />
      </div>

      <section id="what-do-we-do" className="home-services" aria-labelledby="what">
        <div className="home-services__container">
          <h2 id="what">{text.servicesTitle}</h2>

          <ul className="home-services__list">
            {text.servicesItems.map((item) => (
              <li key={item.title}>
                <p>
                  <strong>{item.title}</strong>
                </p>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="home-divider-shell" aria-hidden="true">
        <div className="home-divider" />
      </div>

      <section id="clients" className="home-clients" aria-labelledby="clients-title">
        <div className="home-clients__container">
          <h2 id="clients-title">{text.clientsTitle}</h2>

          <div className="home-clients__gallery">
            <ul className="home-clients__names" ref={clientNamesRef}>
              {clients.map((client, index) => (
                <li
                  key={client.src}
                  ref={(element) => {
                    clientItemRefs.current[index] = element;
                  }}
                  data-index={index}
                  className="home-clients__item"
                >
                  <button
                    type="button"
                    className={`home-clients__name ${index === activeClientIndex ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveClientIndex(index)}
                    onFocus={() => setActiveClientIndex(index)}
                    onClick={() => setActiveClientIndex(index)}
                  >
                    {client.name}
                  </button>
                </li>
              ))}
            </ul>

            <figure className="home-clients__preview">
              <img src={activeClient.src} alt={`Cliente ${activeClient.name}`} loading="lazy" decoding="async" />
            </figure>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;