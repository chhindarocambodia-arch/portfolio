import pool from '../config/db.js';

export default class Settings {
  static async findBySection(section) {
    const [rows] = await pool.execute('SELECT * FROM site_settings WHERE section = ?', [section]);
    if (rows[0]) {
      rows[0].data = JSON.parse(rows[0].data);
    }
    return rows[0];
  }

  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM site_settings');
    return rows.map(row => ({
      ...row,
      data: JSON.parse(row.data)
    }));
  }

  static async upsert(section, data) {
    const jsonData = JSON.stringify(data);
    await pool.execute(
      'INSERT INTO site_settings (section, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = ?',
      [section, jsonData, jsonData]
    );
    return section;
  }

  static async delete(section) {
    await pool.execute('DELETE FROM site_settings WHERE section = ?', [section]);
    return section;
  }
}
