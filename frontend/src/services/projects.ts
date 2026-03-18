import type { Project } from '../types/project';

export const getProjects = async (): Promise<Project[]> => {
  const response = await fetch('/api/projects');

  if (!response.ok) {
    throw new Error('Erro ao carregar projetos');
  }

  return response.json() as Promise<Project[]>;
};
