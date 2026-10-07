export type ProjectSegment = 'Artes e Cultura' | 'Beleza e Saúde' | 'Design' | 'Moda e Lifestyle';
export type ProjectService = 'Marcas' | 'Eventos' | 'Produto' | 'Mídia';

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  segment: ProjectSegment;
  service: ProjectService;
  featuredOnHome?: boolean;
  link?: string;
  technologies?: string[];
};
