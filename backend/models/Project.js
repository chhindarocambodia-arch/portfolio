import pool from '../config/db.js';

export default class Project {
  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM projects ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0];
  }

  static async findFeatured() {
    const [rows] = await pool.execute('SELECT * FROM projects WHERE featured = true ORDER BY created_at DESC');
    return rows;
  }

  static async create(projectData) {
    const { title, description, category, tech_stack, image, live_url, github_url, featured = false } = projectData;
    
    const [result] = await pool.execute(
      'INSERT INTO projects (title, description, category, tech_stack, image, live_url, github_url, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, category, JSON.stringify(tech_stack), image, live_url, github_url, featured]
    );
    
    return result.insertId;
  }

  static async update(id, projectData) {
    const { title, description, category, tech_stack, image, live_url, github_url, featured } = projectData;
    
    await pool.execute(
      'UPDATE projects SET title = ?, description = ?, category = ?, tech_stack = ?, image = ?, live_url = ?, github_url = ?, featured = ? WHERE id = ?',
      [title, description, category, JSON.stringify(tech_stack), image, live_url, github_url, featured, id]
    );
    
    return id;
  }

  static async delete(id) {
    await pool.execute('DELETE FROM projects WHERE id = ?', [id]);
    return id;
  }

  static async count() {
    const [rows] = await pool.execute('SELECT COUNT(*) as count FROM projects');
    return rows[0].count;
  }
}
