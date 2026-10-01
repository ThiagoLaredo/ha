import { Request, Response } from 'express';
import { getProjectByIdData, getProjectsData } from '../data/mockProjects';

// GET /api/projects
export const getProjects = (req: Request, res: Response) => {
  res.json(getProjectsData());
};

// GET /api/projects/:id
export const getProjectById = (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id), 10);
  const project = getProjectByIdData(id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: 'Projeto não encontrado' });
  }
};