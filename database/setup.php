<?php
$host = '127.0.0.1';
$user = 'root';
$password = '';
$database = 'portfolio';

$mysqli = new mysqli($host, $user, $password);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Create database
$mysqli->query("CREATE DATABASE IF NOT EXISTS $database");
echo "Database '$database' created or already exists\n";

// Select database
$mysqli->select_db($database);

// Create tables
$tables = [
    "CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS projects (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        tech_stack JSON NOT NULL,
        image VARCHAR(500),
        live_url VARCHAR(500),
        github_url VARCHAR(500),
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS messages (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS skills (
        id INT PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        icon VARCHAR(100),
        proficiency INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )"
];

foreach ($tables as $sql) {
    $mysqli->query($sql);
}
echo "Tables created\n";

// Insert admin user
$hashed_password = password_hash('admin123', PASSWORD_BCRYPT);
$stmt = $mysqli->prepare("INSERT IGNORE INTO users (email, password, name, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $admin_email, $hashed_password, $admin_name, $admin_role);
$admin_email = 'admin@portfolio.com';
$admin_name = 'Admin';
$admin_role = 'admin';
$stmt->execute();
echo "Admin user created\n";

// Insert sample skills
$skills = [
    ['React', 'frontend', 'react', 95],
    ['JavaScript', 'frontend', 'javascript', 95],
    ['TypeScript', 'frontend', 'typescript', 90],
    ['HTML5', 'frontend', 'html5', 95],
    ['CSS3', 'frontend', 'css3', 90],
    ['Tailwind CSS', 'frontend', 'tailwind', 92],
    ['Node.js', 'backend', 'nodejs', 92],
    ['Express.js', 'backend', 'express', 90],
    ['MySQL', 'database', 'mysql', 85],
    ['MongoDB', 'database', 'mongodb', 88],
    ['Git', 'tools', 'git', 95],
    ['Docker', 'tools', 'docker', 80]
];

$stmt = $mysqli->prepare("INSERT IGNORE INTO skills (name, category, icon, proficiency) VALUES (?, ?, ?, ?)");
foreach ($skills as $skill) {
    $stmt->bind_param("sssi", $skill[0], $skill[1], $skill[2], $skill[3]);
    $stmt->execute();
}
echo "Skills inserted\n";

// Insert sample projects
$projects = [
    ['E-Commerce Platform', 'A full-featured e-commerce platform with shopping cart, payment integration, admin dashboard.', 'fullstack', '["React", "Node.js", "Express", "MongoDB"]', 'https://demo-ecommerce.com', 'https://github.com/demo', 1],
    ['Task Management App', 'Collaborative task management application with real-time updates and Kanban boards.', 'fullstack', '["React", "TypeScript", "Firebase"]', 'https://taskapp.com', 'https://github.com/demo', 1],
    ['Portfolio Website', 'Personal portfolio with smooth animations, dark mode, and responsive design.', 'frontend', '["React", "Tailwind CSS", "Framer Motion"]', 'https://myfolio.dev', 'https://github.com/demo', 0]
];

$stmt = $mysqli->prepare("INSERT IGNORE INTO projects (title, description, category, tech_stack, live_url, github_url, featured) VALUES (?, ?, ?, ?, ?, ?, ?)");
foreach ($projects as $proj) {
    $stmt->bind_param("ssssssi", $proj[0], $proj[1], $proj[2], $proj[3], $proj[4], $proj[5], $proj[6]);
    $stmt->execute();
}
echo "Projects inserted\n";

$mysqli->close();
echo "\nDatabase setup complete!";
?>
