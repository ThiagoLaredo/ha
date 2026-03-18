export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Site Institucional para Empresa X',
    description: 'Desenvolvimento de site responsivo com React e Node.js.',
    image: '/images/projeto1.jpg',
    link: 'https://empresax.com',
    technologies: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: 2,
    title: 'E-commerce para Loja Y',
    description: 'Plataforma de vendas online com pagamento integrado.',
    image: '/images/projeto2.jpg',
    link: 'https://lojay.com.br',
    technologies: ['Next.js', 'Stripe', 'PostgreSQL']
  },
  {
    id: 3,
    title: 'Aplicativo de Delivery',
    description: 'App mobile para pedidos de comida, com React Native e Firebase.',
    image: '/images/projeto3.jpg',
    link: 'https://github.com/olatu/delivery-app',
    technologies: ['React Native', 'Firebase', 'Redux']
  }
];