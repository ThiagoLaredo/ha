import type { Project } from '../types/project';
import { caseMetadataByFolder, defaultCaseMetadata } from '../data/caseMetadata';

type CasesManifestEntry = {
  folderName: string;
  files: string[];
};

type CasesManifest = {
  generatedAt: string;
  cases: CasesManifestEntry[];
};

const toSlug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const encodePathSegment = (segment: string) => encodeURIComponent(segment).replace(/%2B/g, '+');

const encodePathSegments = (...segments: string[]) =>
  segments.map((segment) => encodePathSegment(segment)).join('/');

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch('/images/Cases/manifest.json', { cache: 'no-cache' });

  if (!response.ok) {
    throw new Error('Erro ao carregar cases. Verifique o arquivo public/images/Cases/manifest.json.');
  }

  const manifest = (await response.json()) as CasesManifest;

  return manifest.cases.map((entry, index) => {
    const metadata = caseMetadataByFolder[entry.folderName] ?? defaultCaseMetadata;
    const images = entry.files.map(
      (fileName) => `/${encodePathSegments('images', 'Cases', entry.folderName, fileName)}`
    );

    return {
      id: index + 1,
      slug: toSlug(entry.folderName),
      title: entry.folderName,
      description: metadata.description,
      image: images[0] ?? '',
      images,
      segment: metadata.segment,
      service: metadata.service,
      featuredOnHome: metadata.featuredOnHome,
    };
  });
};
