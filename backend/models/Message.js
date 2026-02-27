import pool from '../config/db.js';

export default class Message {
  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM messages ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM messages WHERE id = ?', [id]);
    return rows[0];
  }

  static async findUnread() {
    const [rows] = await pool.execute('SELECT * FROM messages WHERE is_read = false ORDER BY created_at DESC');
    return rows;
  }

  static async create(messageData) {
    const { name, email, subject, message } = messageData;
    
    const [result] = await pool.execute(
      'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );
    
    return result.insertId;
  }

  static async markAsRead(id) {
    await pool.execute('UPDATE messages SET is_read = true WHERE id = ?', [id]);
    return id;
  }

  static async delete(id) {
    await pool.execute('DELETE FROM messages WHERE id = ?', [id]);
    return id;
  }

  static async count() {
    const [rows] = await pool.execute('SELECT COUNT(*) as count FROM messages');
    return rows[0].count;
  }

  static async countUnread() {
    const [rows] = await pool.execute('SELECT COUNT(*) as count FROM messages WHERE is_read = false');
    return rows[0].count;
  }
}
