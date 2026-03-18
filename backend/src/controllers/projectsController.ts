import { Request, Response } from 'express';
import { projects, Project } from '../data/mockProjects';

// GET /api/projects
export const getProjects = (req: Request, res: Response) => {
  res.json(projects);
};

// GET /api/projects/:id
export const getProjectById = (req: Request, res: Response) => {
const id = parseInt(String(req.params.id), 10);
  const project = projects.find(p => p.id === id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: 'Projeto não encontrado' });
  }
};