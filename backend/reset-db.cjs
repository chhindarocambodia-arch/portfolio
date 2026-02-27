const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function setup() {
  const conn = await mysql.createConnection({ host: '127.0.0.1', user: 'root', multipleStatements: true });
  await conn.query('USE portfolio');
  
  // Create settings table
  await conn.query(`CREATE TABLE IF NOT EXISTS site_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section VARCHAR(50) NOT NULL UNIQUE,
    data JSON NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);
  
  console.log('Table created');
  
  // Clear old data
  await conn.query('DELETE FROM projects');
  await conn.query('DELETE FROM skills');
  await conn.query('DELETE FROM messages');
  await conn.query('DELETE FROM site_settings');
  await conn.query('DELETE FROM users');
  
  // Create admin user
  const hashedPassword = bcrypt.hashSync('admin123', 12);
  await conn.query('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)', 
    ['admin@portfolio.com', hashedPassword, 'Admin', 'admin']);
  
  // Insert default hero settings
  await conn.query('INSERT INTO site_settings (section, data) VALUES (?, ?)', [
    'hero', 
    JSON.stringify({ 
      title: 'Full Stack Developer', 
      subtitle: 'Building modern, scalable web applications with cutting-edge technologies',
      typingTexts: ['React Expert', 'Node.js Developer', 'Problem Solver', 'UI/UX Enthusiast']
    })
  ]);
  
  // Insert default about settings
  await conn.query('INSERT INTO site_settings (section, data) VALUES (?, ?)', [
    'about',
    JSON.stringify({
      name: 'John Doe',
      title: 'Full Stack Developer',
      bio: "I'm a passionate full-stack developer with expertise in building modern web applications. I specialize in React, Node.js, and cloud technologies. With a strong foundation in computer science and years of hands-on experience, I deliver high-quality solutions.",
      yearsExperience: 5,
      projectsCompleted: 50,
      clientsSatisfied: 30,
      cvUrl: ''
    })
  ]);
  
  // Insert default social settings
  await conn.query('INSERT INTO site_settings (section, data) VALUES (?, ?)', [
    'social',
    JSON.stringify({
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'hello@developer.com',
      location: 'San Francisco, CA'
    })
  ]);
  
  // Insert default contact settings
  await conn.query('INSERT INTO site_settings (section, data) VALUES (?, ?)', [
    'contact',
    JSON.stringify({
      email: 'hello@developer.com',
      subject: 'Project Inquiry',
      message: 'Tell me about your project...'
    })
  ]);
  
  console.log('Database setup complete!');
  await conn.end();
}

setup().then(() => { console.log('Done!'); process.exit(0); })
  .catch(e => { console.error(e.message); process.exit(1); });
