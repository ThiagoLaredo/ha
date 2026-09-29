"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectById = exports.getProjects = void 0;
const mockProjects_1 = require("../data/mockProjects");
// GET /api/projects
const getProjects = (req, res) => {
    res.json(mockProjects_1.projects);
};
exports.getProjects = getProjects;
// GET /api/projects/:id
const getProjectById = (req, res) => {
    const id = parseInt(String(req.params.id), 10);
    const project = mockProjects_1.projects.find(p => p.id === id);
    if (project) {
        res.json(project);
    }
    else {
        res.status(404).json({ message: 'Projeto não encontrado' });
    }
};
exports.getProjectById = getProjectById;
