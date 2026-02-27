import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

export default class User {
  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT id, email, name, role, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(userData) {
    const { email, password, name, role = 'user' } = userData;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const [result] = await pool.execute(
      'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
      [email, hashedPassword, name, role]
    );
    
    return result.insertId;
  }

  static async comparePassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
