export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
  segment: 'Artes e Cultura' | 'Beleza e Saúde' | 'Design' | 'Moda e Lifestyle';
  service: 'Marcas' | 'Eventos' | 'Produto' | 'Mídia';
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Blumi',
    description: 'Posicionamento de marca com estratégia de imprensa e presença digital.',
    image: '/images/home/hero-carousel/slide-1.jpg',
    link: 'https://empresax.com',
    technologies: ['Relações Públicas', 'Branding', 'Conteúdo'],
    segment: 'Moda e Lifestyle',
    service: 'Marcas'
  },
  {
    id: 2,
    title: 'Adcos',
    description: 'Estratégia de visibilidade para lançamento de produto e relacionamento com mídia.',
    image: '/images/home/hero-carousel/slide-2.jpg',
    link: 'https://lojay.com.br',
    technologies: ['Relações Públicas', 'Produto', 'Imprensa'],
    segment: 'Beleza e Saúde',
    service: 'Produto'
  },
  {
    id: 3,
    title: 'Manifesto Criativo',
    description: 'Narrativa institucional e presença editorial para um projeto de design autoral.',
    image: '/images/home/hero-carousel/slide-3.jpg',
    link: 'https://github.com/olatu/delivery-app',
    technologies: ['Editorial', 'Design', 'Narrativa'],
    segment: 'Design',
    service: 'Mídia'
  },
  {
    id: 4,
    title: 'Lançamento de Coleção Premium',
    description: 'Estratégia de relações públicas com ativações de imprensa, creators e eventos proprietários para maximizar reputação e conversão.',
    image: '/images/home/hero-carousel/slide-4.jpg',
    link: 'https://helenaaugusta.com',
    technologies: ['Relações Públicas', 'Influência', 'Eventos'],
    segment: 'Artes e Cultura',
    service: 'Eventos'
  }
];