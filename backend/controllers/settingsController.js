import { validationResult } from 'express-validator';
import Settings from '../models/Settings.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllSettings = async (req, res, next) => {
  try {
    const settings = await Settings.findAll();
    const formatted = {};
    settings.forEach(s => {
      formatted[s.section] = s.data;
    });
    res.json(formatted);
  } catch (error) {
    next(error);
  }
};

export const getSetting = async (req, res, next) => {
  try {
    const { section } = req.params;
    const setting = await Settings.findBySection(section);
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.json(setting.data);
  } catch (error) {
    next(error);
  }
};

export const updateSetting = async (req, res, next) => {
  try {
    const { section } = req.params;
    let data;
    
    if (req.file) {
      data = { image: `/uploads/${req.file.filename}` };
    } else if (req.body.data) {
      data = JSON.parse(req.body.data);
    } else {
      data = req.body;
    }
    
    const existing = await Settings.findBySection(section);
    let mergedData = { ...existing?.data, ...data };
    
    await Settings.upsert(section, mergedData);
    const setting = await Settings.findBySection(section);
    
    res.json(setting.data);
  } catch (error) {
    next(error);
  }
};

export const uploadImage = async (req, res, next) => {
  try {
    const { section } = req.params;
    const field = req.query.field || 'image';
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const existing = await Settings.findBySection(section);
    const filePath = `/uploads/${req.file.filename}`;
    
    if (existing?.data?.[field]) {
      const oldPath = path.join(__dirname, '..', existing.data[field]);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }
    
    const mergedData = { ...existing?.data, [field]: filePath };
    await Settings.upsert(section, mergedData);
    
    res.json({ [field]: filePath });
  } catch (error) {
    next(error);
  }
};
