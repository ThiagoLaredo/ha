import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/projects';
import type { Project } from '../types/project';
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

const clientsData = [
  {
    name: 'ADCOS',
    tag: 'Beauty · Science · Innovation',
    tagPt: 'Beleza · Ciência · Inovação',
    fileName: 'adcos-still-072.jpg',
  },
  {
    name: 'Anny Meisler',
    tag: 'Design · Fashion · Editorial',
    tagPt: 'Design · Moda · Editorial',
    fileName: 'anny-meisler-2-bruno-ryfer.jpg',
  },
  {
    name: 'Blumi',
    tag: 'Care · Wellness · Lifestyle',
    tagPt: 'Cuidado · Bem-estar · Estilo de vida',
    fileName: 'blumi.jpg',
  },
  {
    name: 'Buba',
    tag: 'Family · Lifestyle · Joy',
    tagPt: 'Família · Estilo de vida · Alegria',
    fileName: 'buba.png',
  },
  {
    name: 'Calma',
    tag: 'Wellness · Beauty · Ritual',
    tagPt: 'Bem-estar · Beleza · Ritual',
    fileName: 'calma-linha.jpeg',
  },
  {
    name: 'Camila Fremder',
    tag: 'Culture · Talent · Media',
    tagPt: 'Cultura · Talento · Mídia',
    fileName: 'camila-fremder-shoot54513.jpg',
  },
  {
    name: 'Carolina Ferraz',
    tag: 'Culture · Publishing · Influence',
    tagPt: 'Cultura · Publicação · Influência',
    fileName: 'carolina-ferraz.jpg',
  },
  {
    name: 'Cris Dios Organics',
    tag: 'Beauty · Organic · Wellness',
    tagPt: 'Beleza · Orgânico · Bem-estar',
    fileName: 'cris-dios-organics-alta-2421-2.jpg',
  },
  {
    name: 'Elbo',
    tag: 'Fashion · Design · Style',
    tagPt: 'Moda · Design · Estilo',
    fileName: 'elbo-agosto-4.jpg',
  },
  {
    name: 'Feel',
    tag: 'Wellness · Intimacy · Care',
    tagPt: 'Bem-estar · Intimidade · Cuidado',
    fileName: 'feel-creme-vulvar-2.jpg',
  },
  {
    name: 'Givaudan',
    tag: 'Fragrance · Innovation · Culture',
    tagPt: 'Perfumaria · Inovação · Cultura',
    fileName: 'givaudan-mayaha.jpg',
  },
  {
    name: 'Glamour',
    tag: 'Media · Beauty · Trends',
    tagPt: 'Mídia · Beleza · Tendências',
    fileName: 'glamour-1.jpg',
  },
  {
    name: 'Laces',
    tag: 'Beauty · Wellness · Sustainability',
    tagPt: 'Beleza · Bem-estar · Sustentabilidade',
    fileName: 'laces.jpeg',
  },
  {
    name: 'LCS',
    tag: 'Culture · Strategy · Brand',
    tagPt: 'Cultura · Estratégia · Marca',
    fileName: 'lcs.jpg',
  },
  {
    name: 'Lenvie',
    tag: 'Luxury · Fragrance · Lifestyle',
    tagPt: 'Luxo · Perfumaria · Estilo de vida',
    fileName: 'lenvie.jpg',
  },
  {
    name: 'Lourie',
    tag: 'Lifestyle · Fashion · Design',
    tagPt: 'Estilo de vida · Moda · Design',
    fileName: 'lourie.jpg',
  },
  {
    name: 'Luz da Lua',
    tag: 'Fashion · Craft · Brazil',
    tagPt: 'Moda · Feito à mão · Brasil',
    fileName: 'luz-da-lua.png',
  },
  {
    name: 'Mart',
    tag: 'Fashion · Design · Attitude',
    tagPt: 'Moda · Design · Atitude',
    fileName: 'mart.jpg',
  },
  {
    name: 'Paula Martins',
    tag: 'Design · Interiors · Culture',
    tagPt: 'Design · Interiores · Cultura',
    fileName: 'paula-martins-1.jpg',
  },
  {
    name: 'Urban Arts',
    tag: 'Art · City · Lifestyle',
    tagPt: 'Arte · Cidade · Estilo de vida',
    fileName: 'urban-arts.jpg',
  },
] as const;

const content = {
  pt: {
    heroTitle: 'COMUNICAÇÃO\nCOMO ATIVO.',
    heroSubtitle:
      'Estratégia, conexões e narrativas para marcas que querem ocupar espaço relevante na cultura.',
    scrollLabel: 'SCROLL ->',
    whatWeDoLabel: 'O QUE FAZEMOS',
    whatWeDoTitle: 'NÓS CRIAMOS\nRELEVÂNCIA.',
    whatWeDoPillars: [
      {
        number: '01',
        title: 'ESTRATÉGIA',
        description:
          'Posicionamento, planejamento e construção de narrativas que conectam marca, contexto e negócio.',
      },
      {
        number: '02',
        title: 'CULTURA',
        description:
          'Moda, beleza, design, gastronomia, hospitalidade, arte e comportamento como territórios de construção de marca.',
      },
      {
        number: '03',
        title: 'CONEXÕES',
        description:
          'Imprensa, creators, formadores de opinião, parceiros e pessoas que fazem a conversa acontecer.',
      },
      {
        number: '04',
        title: 'INFLUÊNCIA',
        description:
          'Reputação, visibilidade e relacionamento com os principais players do mercado.',
      },
    ],
    sectionTitle: 'WE ARE\nHELENA AUGUSTA.',
    sectionParagraphs: [
      'Uma boutique de comunicação criada para marcas que entendem que reputação não se constrói apenas com exposição, se constrói com relevância.',
      'Atuamos na interseção entre comunicação, cultura, influência e negócio para transformar percepção em valor de longo prazo.',
    ],
    boutiqueLabel: 'BOUTIQUE BY CHOICE.',
    boutiqueItems: ['Mais senioridade.', 'Mais proximidade.', 'Mais repertório.', 'Mais acesso.'],
    servicesItems: [
      {
        title: '01 - STRATEGY',
        description: 'Direção estratégica para posicionar marcas com clareza, diferencial e valor cultural.',
      },
      {
        title: '02 - CULTURE',
        description: 'Leitura de contexto e repertório para conectar marcas com assuntos que importam agora.',
      },
      {
        title: '03 - CONNECTIONS',
        description: 'Relações qualificadas com mídia, creators, talentos e players que ampliam relevância.',
      },
      {
        title: '04 - INFLUENCE',
        description: 'Narrativas e ativações que transformam presença em reputação e oportunidade de negócio.',
      },
    ],
    clientsLabel: 'CLIENTES',
    clientsTitle: 'MARCAS EM\nQUE ACREDITAMOS.',
    clientsShowAll: 'VER TODOS',
    clientsShowLess: 'VER MENOS',
    selectedWorkLabel: 'CASES',
    selectedWorkTitle: 'CASES EM\nDESTAQUE.',
    selectedWorkCta: 'VER TODOS OS CASES ->',
    selectedWorkEmpty: 'Atualize o manifest para visualizar o case destaque aqui.',
    augustaTitle: 'THE AUGUSTA EDIT',
    augustaSubtitle: 'Insights para um mundo em movimento.',
    augustaItems: [
      {
        category: 'CULTURA',
        title: 'Como relevância cultural vira ativo de marca.',
        summary: 'Leituras de comportamento, contexto e timing para marcas que querem liderar conversas.',
      },
      {
        category: 'BELEZA',
        title: 'O novo luxo brasileiro: sensorial, local e autoral.',
        summary: 'Um olhar sobre o encontro entre design, origem e desejo na construção de reputação.',
      },
      {
        category: 'NEGÓCIOS',
        title: 'PR is only the starting point.',
        summary: 'Comunicação integrada para gerar impacto de negócio, e não apenas visibilidade.',
      },
    ],
    beyondTitle: 'PR É SÓ\nO PONTO DE PARTIDA.',
    beyondLabel: 'ALÉM DO PR',
    beyondText:
      'Construímos estratégias que conectam comunicação, cultura, influência e negócio.',
    beyondItems: [
      'Posicionamento de marca',
      'Estratégia de mídia',
      'Influência e criadores',
      'Lançamentos',
      'Eventos e experiências',
      'Parcerias estratégicas',
      'Conexões culturais',
    ],
    networkLabel: 'NOSSA REDE',
    networkTitle: 'PESSOAS FAZEM\nCULTURA.',
    networkParagraph: 'Nossa força está nas relações que construímos através de uma ponte única.',
    networkNodes: ['MÍDIA', 'CRIADORES', 'TALENTOS', 'MARCAS', 'AGENTES CULTURAIS', 'NEGÓCIOS'],
  },
  en: {
    heroTitle: 'COMMUNICATION\nAS AN ASSET.',
    heroSubtitle:
      'Strategy, connections and narratives for brands that want to occupy relevant space in culture.',
    scrollLabel: 'SCROLL ->',
    whatWeDoLabel: 'WHAT WE DO',
    whatWeDoTitle: 'WE CREATE\nRELEVANCE.',
    whatWeDoPillars: [
      {
        number: '01',
        title: 'STRATEGY',
        description:
          'Positioning, planning and narrative-building that connect brand, context and business.',
      },
      {
        number: '02',
        title: 'CULTURE',
        description:
          'Fashion, beauty, design, gastronomy, hospitality, art and behavior as territories for brand-building.',
      },
      {
        number: '03',
        title: 'CONNECTIONS',
        description:
          'Press, creators, opinion leaders, partners and the people who make the conversation happen.',
      },
      {
        number: '04',
        title: 'INFLUENCE',
        description:
          'Reputation, visibility and relationships with the market\'s key players.',
      },
    ],
    sectionTitle: 'WE ARE\nHELENA AUGUSTA.',
    sectionParagraphs: [
      'A communications boutique created for brands that understand reputation is not built only through exposure, but through relevance.',
      'We operate at the intersection of communication, culture, influence and business, turning perception into long-term value.',
    ],
    boutiqueLabel: 'BOUTIQUE BY CHOICE.',
    boutiqueItems: ['More seniority.', 'More proximity.', 'More repertoire.', 'More access.'],
    servicesItems: [
      {
        title: '01 - STRATEGY',
        description: 'Strategic direction to position brands with clarity, distinction and cultural value.',
      },
      {
        title: '02 - CULTURE',
        description: 'Context reading and repertoire to connect brands with the conversations that matter now.',
      },
      {
        title: '03 - CONNECTIONS',
        description: 'Qualified relationships with media, creators, talents and cultural players.',
      },
      {
        title: '04 - INFLUENCE',
        description: 'Narratives and activations that turn presence into reputation and business opportunities.',
      },
    ],
    clientsLabel: 'CLIENTS',
    clientsTitle: 'BRANDS WE\nBELIEVE IN.',
    clientsShowAll: 'VIEW ALL',
    clientsShowLess: 'VIEW LESS',
    selectedWorkLabel: 'CASES',
    selectedWorkTitle: 'FEATURED\nCASES.',
    selectedWorkCta: 'VIEW ALL CASES ->',
    selectedWorkEmpty: 'Update the manifest to display the featured case.',
    augustaTitle: 'THE AUGUSTA EDIT',
    augustaSubtitle: 'Insights for a world in motion.',
    augustaItems: [
      {
        category: 'CULTURE',
        title: 'How cultural relevance becomes a brand asset.',
        summary: 'Behavioral and strategic reading for brands that want to shape meaningful conversations.',
      },
      {
        category: 'BEAUTY',
        title: 'The new Brazilian luxury: sensory, local and authored.',
        summary: 'A perspective on design, origin and desire in reputation-building.',
      },
      {
        category: 'BUSINESS',
        title: 'PR is only the starting point.',
        summary: 'Integrated communication built for business impact, not only visibility.',
      },
    ],
    beyondTitle: 'PR IS ONLY\nTHE STARTING POINT.',
    beyondLabel: 'BEYOND PR',
    beyondText:
      'We build strategies that connect communication, culture, influence and business.',
    beyondItems: [
      'Brand positioning',
      'Media strategy',
      'Influence & creators',
      'Launches',
      'Events & experiences',
      'Strategic partnerships',
      'Cultural connections',
    ],
    networkLabel: 'OUR NETWORK',
    networkTitle: 'PEOPLE MAKE\nCULTURE.',
    networkParagraph: 'Our strength is in the relationships we build through a unique bridge.',
    networkNodes: ['MEDIA', 'CREATORS', 'TALENTS', 'BRANDS', 'CULTURAL PLAYERS', 'BUSINESS'],
  },
} as const;

const SLIDE_INTERVAL_MS = 5800;
const AUTO_PLAY_PAUSE_MS = SLIDE_INTERVAL_MS * 2;
const networkNodeLayout = [
  { className: 'home-network__node--media', delay: '240ms', angle: '-90deg' },
  { className: 'home-network__node--creators', delay: '320ms', angle: '-30deg' },
  { className: 'home-network__node--talents', delay: '400ms', angle: '30deg' },
  { className: 'home-network__node--brands', delay: '480ms', angle: '90deg' },
  { className: 'home-network__node--cultural', delay: '560ms', angle: '150deg' },
  { className: 'home-network__node--business', delay: '640ms', angle: '210deg' },
] as const;

const Home = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAllClients, setShowAllClients] = useState<boolean>(false);
  const [loadedClientImages, setLoadedClientImages] = useState<Set<string>>(new Set());
  const pauseAutoPlayUntil = useRef<number>(0);

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
    getProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch(() => {
        setProjects([]);
      });
  }, []);

  const text = useMemo(() => content[language], [language]);
  const clients = useMemo(
    () =>
      clientsData.map((client) => ({
        name: client.name,
        tag: language === 'pt' ? client.tagPt : client.tag,
        src: `/images/home/clientes/${encodeURIComponent(client.fileName)}`,
      })),
    [language]
  );
  const visibleClients = showAllClients ? clients : clients.slice(0, 6);
  const selectedProjects = useMemo(() => {
    if (!projects.length) {
      return [] as Project[];
    }

    const withImage = projects.filter((project) => Boolean(project.images[0] || project.image));
    const featured = withImage.filter((project) => project.featuredOnHome);
    const fallback = withImage.filter((project) => !project.featuredOnHome);

    return [...featured, ...fallback].slice(0, 3);
  }, [projects]);
  const heroTitleLines = text.heroTitle.split('\n');
  const whatWeDoTitleLines = text.whatWeDoTitle.split('\n');
  const clientsTitleLines = text.clientsTitle.split('\n');
  const selectedWorkTitleLines = text.selectedWorkTitle.split('\n');

  const goToSlide = (slideIndex: number) => {
    pauseAutoPlayUntil.current = Date.now() + AUTO_PLAY_PAUSE_MS;
    setActiveSlide(slideIndex);
  };

  const handleToggleClients = (isExpanding: boolean) => {
    setShowAllClients(isExpanding);
    
    if (!isExpanding) {
      // Scroll para o topo da seção de clientes quando fechar
      setTimeout(() => {
        const clientsSection = document.querySelector('#clients');
        if (clientsSection) {
          clientsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
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
            <div className="home-hero__copy">
              <h1>
                {heroTitleLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h1>
              <p>{text.heroSubtitle}</p>
              <span className="home-hero__scroll">{text.scrollLabel}</span>
            </div>
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

      <section id="o-que-fazemos" className="home-services" aria-labelledby="o-que-fazemos-title">
        <div className="home-services__container">
          <div className="home-services__heading">
            <p className="home-services__eyebrow">{text.whatWeDoLabel}</p>
            <h2 id="o-que-fazemos-title">
              {whatWeDoTitleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>

          <ol className="home-services__list">
            {text.whatWeDoPillars.map((item) => (
              <li key={item.number} className="home-services__item">
                <span className="home-services__number">{item.number}</span>
                <h3 className="home-services__name">{item.title}</h3>
                <span className="home-services__arrow" aria-hidden="true">→</span>
                <p className="home-services__description">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className="home-divider-shell" aria-hidden="true">
        <div className="home-divider" />
      </div>

      <section id="clients" className="home-clients" aria-labelledby="clients-title">
        <div className="home-clients__container">
          <div className="home-clients__header">
            <p className="home-clients__eyebrow">{text.clientsLabel}</p>
            <h2 id="clients-title">
              {clientsTitleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>

          <div className="home-clients__grid">
            {visibleClients.map((client, index) => {
              const isLoaded = loadedClientImages.has(client.src);
              const isExpandable = index >= 6;
              
              return (
                <article 
                  key={client.src} 
                  className="home-clients__card"
                  data-loaded={isLoaded}
                  data-is-expandable={isExpandable}
                >
                  <img
                    className="home-clients__card-image"
                    src={client.src}
                    alt={`Cliente ${client.name}`}
                    loading={index < 6 ? 'eager' : 'lazy'}
                    fetchPriority={index < 3 ? 'high' : index < 6 ? 'low' : 'auto'}
                    decoding="async"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    onLoad={(e) => {
                      const url = e.currentTarget.src;
                      setLoadedClientImages((prev) => new Set([...prev, url]));
                    }}
                  />
                  <div className="home-clients__card-overlay" aria-hidden="true" />
                  <div className="home-clients__card-copy">
                    <strong>{client.name}</strong>
                    <span>{client.tag}</span>
                  </div>
                </article>
              );
            })}
          </div>

          {clients.length > 6 ? (
            <button
              type="button"
              className="home-clients__toggle"
              onClick={() => handleToggleClients(!showAllClients)}
              aria-expanded={showAllClients}
            >
              {showAllClients ? text.clientsShowLess : text.clientsShowAll}
            </button>
          ) : null}
        </div>
      </section>

      <section id="cases" className="home-selected" aria-labelledby="selected-work-title">
        <div className="home-selected__container">
          <div className="home-selected__header">
            <p className="home-selected__eyebrow">{text.selectedWorkLabel}</p>
            <h2 id="selected-work-title">
              {selectedWorkTitleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
          </div>

          {!selectedProjects.length ? (
            <p className="home-selected__empty">{text.selectedWorkEmpty}</p>
          ) : (
            <>
              <div className="home-selected__list">
                {selectedProjects.map((project) => (
                  <article key={project.slug} className="home-selected__card">
                    <img
                      className="home-selected__card-image"
                      src={project.images[0] || project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="home-selected__card-overlay" aria-hidden="true" />
                    <div className="home-selected__card-copy">
                      <p className="home-selected__meta">{project.segment} · {project.service}</p>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <Link to="/cases" className="home-selected__all-link">
                {text.selectedWorkCta}
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="home-beyond" aria-labelledby="beyond-title">
        <div className="home-beyond__container">
          <div className="home-beyond__heading">
            <p className="home-beyond__eyebrow">{text.beyondLabel}</p>
            <h2 id="beyond-title">{text.beyondTitle}</h2>
          </div>
          <div className="home-beyond__content">
            <p>{text.beyondText}</p>
            <ul>
              {text.beyondItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="home-network" aria-labelledby="network-title">
        <div className="home-network__container">
          <div className="home-network__intro">
            <p className="home-network__eyebrow">{text.networkLabel}</p>
            <h2 id="network-title">{text.networkTitle}</h2>
            <p className="home-network__paragraph">{text.networkParagraph}</p>
          </div>

          <div className="home-network__diagram" aria-hidden="true">
            {networkNodeLayout.map((node) => (
              <span
                key={`${node.className}-edge`}
                className="home-network__edge"
                style={{ '--angle': node.angle, '--node-delay': node.delay } as CSSProperties}
              />
            ))}
            <span className="home-network__node home-network__node--core">HA</span>
            {networkNodeLayout.map((node, index) => (
              <span
                key={node.className}
                className={`home-network__node ${node.className}`}
                style={{ '--node-delay': node.delay } as CSSProperties}
              >
                {text.networkNodes[index]}
              </span>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;