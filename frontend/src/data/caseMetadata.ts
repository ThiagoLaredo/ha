import type { ProjectSegment, ProjectService } from '../types/project';

type CaseMetadata = {
  segment: ProjectSegment;
  service: ProjectService;
  description: string;
  featuredOnHome?: boolean;
};

export const defaultCaseMetadata: CaseMetadata = {
  segment: 'Moda e Lifestyle',
  service: 'Marcas',
  description: 'Case com direcao visual, narrativa e execucao voltadas para visibilidade da marca.',
};

export const caseMetadataByFolder: Record<string, CaseMetadata> = {
  'ADCOS + Isis Valverde': {
    segment: 'Beleza e Saúde',
    service: 'Produto',
    description: 'Ativação visual e narrativa para ampliar a presença editorial do case.',
  },
  'Buba + Fernanda Paes Leme': {
    segment: 'Moda e Lifestyle',
    service: 'Marcas',
    description: 'Construção de imagem com desdobramentos de imprensa, marca e conteúdo.',
  },
  'Camila Fremder - Nóia Ao Vivo': {
    segment: 'Artes e Cultura',
    service: 'Eventos',
    description: 'Cobertura e desdobramento de um lançamento com foco em repercussão e audiência.',
  },
  'Carolina Ferraz - Livro': {
    segment: 'Artes e Cultura',
    service: 'Mídia',
    description: 'Case editorial com estratégia de visibilidade para reforçar narrativa e alcance.',
  },
  elbo: {
    segment: 'Moda e Lifestyle',
    service: 'Marcas',
    description: 'Posicionamento de marca com imagens que traduzem repertório, desejo e contexto.',
  },
  'Geração Glamour': {
    segment: 'Moda e Lifestyle',
    service: 'Eventos',
    description: 'Ativação pensada para gerar presença, conversa e reconhecimento de marca.',
  },
  'Givaudan + CCXP': {
    segment: 'Design',
    service: 'Eventos',
    description: 'Experiência de marca desenhada para amplificar impacto visual e cultural.',
  },
  LBP: {
    segment: 'Moda e Lifestyle',
    service: 'Marcas',
    description: 'Projeto de comunicação com foco em consolidação de marca e desejabilidade.',
  },
  'LENVIE + MASP': {
    segment: 'Beleza e Saúde',
    service: 'Eventos',
    description: 'Encontro entre produto, repertório cultural e visibilidade de marca.',
  },
  'Laces + Bioma': {
    segment: 'Beleza e Saúde',
    service: 'Produto',
    description: 'Apresentação de produto com linguagem visual alinhada à percepção premium.',
    featuredOnHome: true,
  },
  'Laces + COP': {
    segment: 'Beleza e Saúde',
    service: 'Eventos',
    description: 'Ação de relacionamento e imagem com foco em experiência e conversa qualificada.',
  },
  Mustela: {
    segment: 'Beleza e Saúde',
    service: 'Produto',
    description: 'Estrutura de comunicação visual para destacar produto, contexto e afinidade.',
  },
  'ORIGEM PATACHO': {
    segment: 'Moda e Lifestyle',
    service: 'Marcas',
    description: 'Narrativa de marca orientada por atmosfera, território e construção de desejo.',
  },
  'Piloto Milano': {
    segment: 'Moda e Lifestyle',
    service: 'Marcas',
    description: 'Material de case voltado a reforçar assinatura, posicionamento e memória de marca.',
  },
  Puma: {
    segment: 'Moda e Lifestyle',
    service: 'Eventos',
    description: 'Case de alta energia com ativação orientada a impacto, audiência e repercussão.',
  },
  'Santista Jeanswear + Leandra Medine': {
    segment: 'Moda e Lifestyle',
    service: 'Produto',
    description: 'Lançamento com apelo de produto e construção de conversa em torno da coleção.',
  },
  'Uma + Pedro Vinicio': {
    segment: 'Moda e Lifestyle',
    service: 'Eventos',
    description: 'Ação de visibilidade com direção criativa e foco em experiência de marca.',
  },
};
