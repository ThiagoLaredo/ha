"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectByIdData = exports.getProjectsData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const casesDir = path_1.default.resolve(__dirname, '../../../frontend/public/images/Cases');
const caseMetadataByFolder = {
    'ADCOS + Isis Valverde': {
        segment: 'Beleza e Saúde',
        service: 'Produto',
        description: 'Ativacao visual e narrativa para ampliar a presenca editorial do case.'
    },
    'Buba + Fernanda Paes Leme': {
        segment: 'Moda e Lifestyle',
        service: 'Marcas',
        description: 'Construcao de imagem com desdobramentos de imprensa, marca e conteudo.'
    },
    'Camila Fremder - Nóia Ao Vivo': {
        segment: 'Artes e Cultura',
        service: 'Eventos',
        description: 'Cobertura e desdobramento de um lancamento com foco em repercussao e audiencia.'
    },
    'Carolina Ferraz - Livro': {
        segment: 'Artes e Cultura',
        service: 'Mídia',
        description: 'Case editorial com estrategia de visibilidade para reforcar narrativa e alcance.'
    },
    'elbo': {
        segment: 'Moda e Lifestyle',
        service: 'Marcas',
        description: 'Posicionamento de marca com imagens que traduzem repertorio, desejo e contexto.'
    },
    'Geração Glamour': {
        segment: 'Moda e Lifestyle',
        service: 'Eventos',
        description: 'Ativacao pensada para gerar presenca, conversa e reconhecimento de marca.'
    },
    'Givaudan + CCXP': {
        segment: 'Design',
        service: 'Eventos',
        description: 'Experiencia de marca desenhada para amplificar impacto visual e cultural.'
    },
    'LBP': {
        segment: 'Moda e Lifestyle',
        service: 'Marcas',
        description: 'Projeto de comunicacao com foco em consolidacao de marca e desejabilidade.'
    },
    'LENVIE + MASP': {
        segment: 'Beleza e Saúde',
        service: 'Eventos',
        description: 'Encontro entre produto, repertorio cultural e visibilidade de marca.'
    },
    'Laces + Bioma': {
        segment: 'Beleza e Saúde',
        service: 'Produto',
        description: 'Apresentacao de produto com linguagem visual alinhada a percepcao premium.'
    },
    'Laces + COP': {
        segment: 'Beleza e Saúde',
        service: 'Eventos',
        description: 'Acao de relacionamento e imagem com foco em experiencia e conversa qualificada.'
    },
    'Mustela': {
        segment: 'Beleza e Saúde',
        service: 'Produto',
        description: 'Estrutura de comunicacao visual para destacar produto, contexto e afinidade.'
    },
    'ORIGEM PATACHO': {
        segment: 'Moda e Lifestyle',
        service: 'Marcas',
        description: 'Narrativa de marca orientada por atmosfera, territorio e construcao de desejo.'
    },
    'Piloto Milano': {
        segment: 'Moda e Lifestyle',
        service: 'Marcas',
        description: 'Material de case voltado a reforcar assinatura, posicionamento e memoria de marca.'
    },
    'Puma': {
        segment: 'Moda e Lifestyle',
        service: 'Eventos',
        description: 'Case de alta energia com ativacao orientada a impacto, audiencia e repercussao.'
    },
    'Santista Jeanswear + Leandra Medine': {
        segment: 'Moda e Lifestyle',
        service: 'Produto',
        description: 'Lancamento com apelo de produto e construcao de conversa em torno da colecao.'
    },
    'Uma + Pedro Vinicio': {
        segment: 'Moda e Lifestyle',
        service: 'Eventos',
        description: 'Acao de visibilidade com direcao criativa e foco em experiencia de marca.'
    }
};
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const toSlug = (value) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
const encodePathSegments = (...segments) => segments.map((segment) => encodeURIComponent(segment)).join('/');
const isImageFile = (fileName) => imageExtensions.has(path_1.default.extname(fileName).toLowerCase());
const getProjectsData = () => {
    if (!fs_1.default.existsSync(casesDir)) {
        return [];
    }
    return fs_1.default
        .readdirSync(casesDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .sort((left, right) => left.name.localeCompare(right.name, 'pt-BR'))
        .map((entry, index) => {
        const folderName = entry.name;
        const folderPath = path_1.default.join(casesDir, folderName);
        const metadata = caseMetadataByFolder[folderName] ?? {
            segment: 'Moda e Lifestyle',
            service: 'Marcas',
            description: 'Case com direcao visual, narrativa e execucao voltadas para visibilidade da marca.'
        };
        const images = fs_1.default
            .readdirSync(folderPath, { withFileTypes: true })
            .filter((fileEntry) => fileEntry.isFile() && isImageFile(fileEntry.name))
            .map((fileEntry) => fileEntry.name)
            .sort((left, right) => left.localeCompare(right, 'pt-BR'))
            .map((fileName) => `/${encodePathSegments('images', 'Cases', folderName, fileName)}`);
        return {
            id: index + 1,
            slug: toSlug(folderName),
            title: folderName,
            description: metadata.description,
            image: images[0] ?? '',
            images,
            segment: metadata.segment,
            service: metadata.service
        };
    })
        .filter((project) => project.images.length > 0);
};
exports.getProjectsData = getProjectsData;
const getProjectByIdData = (id) => (0, exports.getProjectsData)().find((project) => project.id === id);
exports.getProjectByIdData = getProjectByIdData;
