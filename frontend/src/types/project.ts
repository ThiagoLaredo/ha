export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
  segment: 'Artes e Cultura' | 'Beleza e Saúde' | 'Design' | 'Moda e Lifestyle';
  service: 'Marcas' | 'Eventos' | 'Produto' | 'Mídia';
};
