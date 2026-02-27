import pool from './config/db.js';
import bcrypt from 'bcryptjs';

async function setup() {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    await pool.execute(
      'INSERT IGNORE INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
      ['admin@portfolio.com', hashedPassword, 'Admin', 'admin']
    );
    
    console.log('Admin user created/verified!');
    
    // Check if skills exist
    const [skills] = await pool.execute('SELECT COUNT(*) as count FROM skills');
    console.log(`Skills count: ${skills[0].count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

setup();
