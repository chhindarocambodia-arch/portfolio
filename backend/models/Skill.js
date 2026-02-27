import pool from '../config/db.js';

export default class Skill {
  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM skills ORDER BY category, proficiency DESC');
    return rows;
  }

  static async findByCategory(category) {
    const [rows] = await pool.execute('SELECT * FROM skills WHERE category = ? ORDER BY proficiency DESC', [category]);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM skills WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(skillData) {
    const { name, category, icon = '', proficiency = 0 } = skillData;
    
    const [result] = await pool.execute(
      'INSERT INTO skills (name, category, icon, proficiency) VALUES (?, ?, ?, ?)',
      [name, category, icon, proficiency]
    );
    
    return result.insertId;
  }

  static async update(id, skillData) {
    const { name, category, icon, proficiency } = skillData;
    
    await pool.execute(
      'UPDATE skills SET name = ?, category = ?, icon = ?, proficiency = ? WHERE id = ?',
      [name, category, icon, proficiency, id]
    );
    
    return id;
  }

  static async delete(id) {
    await pool.execute('DELETE FROM skills WHERE id = ?', [id]);
    return id;
  }
}
