import { validationResult } from 'express-validator';
import Skill from '../models/Skill.js';

export const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.findAll();
    res.json(skills);
  } catch (error) {
    next(error);
  }
};

export const getSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    next(error);
  }
};

export const createSkill = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, icon, proficiency } = req.body;
    const skillId = await Skill.create({ name, category, icon, proficiency });
    
    const skill = await Skill.findById(skillId);
    res.status(201).json(skill);
  } catch (error) {
    next(error);
  }
};

export const updateSkill = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, icon, proficiency } = req.body;
    
    const existingSkill = await Skill.findById(req.params.id);
    if (!existingSkill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    await Skill.update(req.params.id, { name, category, icon, proficiency });
    
    const skill = await Skill.findById(req.params.id);
    res.json(skill);
  } catch (error) {
    next(error);
  }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    await Skill.delete(req.params.id);
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    next(error);
  }
};
