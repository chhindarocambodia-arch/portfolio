import { validationResult } from 'express-validator';
import Project from '../models/Project.js';

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    const projectsWithSkills = projects.map(p => ({
      ...p,
      tech_stack: JSON.parse(p.tech_stack || '[]')
    }));
    res.json(projectsWithSkills);
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({
      ...project,
      tech_stack: JSON.parse(project.tech_stack || '[]')
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProjects = async (req, res, next) => {
  try {
    const projects = await Project.findFeatured();
    const projectsWithSkills = projects.map(p => ({
      ...p,
      tech_stack: JSON.parse(p.tech_stack || '[]')
    }));
    res.json(projectsWithSkills);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, category, tech_stack, live_url, github_url, featured } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    
    let techStackArray = [];
    if (tech_stack) {
      techStackArray = tech_stack.split(',').map(t => t.trim());
    }

    const projectId = await Project.create({
      title,
      description,
      category,
      tech_stack: techStackArray,
      image,
      live_url,
      github_url,
      featured
    });

    const project = await Project.findById(projectId);
    res.status(201).json({
      ...project,
      tech_stack: JSON.parse(project.tech_stack || '[]')
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, category, tech_stack, live_url, github_url, featured } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const existingProject = await Project.findById(req.params.id);
    if (!existingProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    let techStackArray = [];
    if (tech_stack) {
      techStackArray = tech_stack.split(',').map(t => t.trim());
    }

    await Project.update(req.params.id, {
      title,
      description,
      category,
      tech_stack: techStackArray,
      image: image || existingProject.image,
      live_url,
      github_url,
      featured
    });

    const project = await Project.findById(req.params.id);
    res.json({
      ...project,
      tech_stack: JSON.parse(project.tech_stack || '[]')
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await Project.delete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getProjectStats = async (req, res, next) => {
  try {
    const count = await Project.count();
    res.json({ count });
  } catch (error) {
    next(error);
  }
};
