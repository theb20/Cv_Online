// insert_portfolio.js
// Script pour insérer les données dans la base distante Railway

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// ⚠️ Remplace par tes infos Railway
const dbConfig = {
   host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQLPORT || 3306,
};

async function insertData() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    console.log("Connexion réussie à la base...");

    // =========================
    // 1️⃣ Categories
    // =========================
    const categories = [
      ['Frontend','Compétences liées au développement frontend'],
      ['Backend','Compétences liées au développement backend'],
      ['Base de données','Compétences liées aux bases de données et SQL'],
      ['Outils & DevOps','Compétences liées aux outils de développement et déploiement']
    ];

    for(const cat of categories){
      await connection.execute('INSERT INTO categories (name, description) VALUES (?, ?)', cat);
    }

    // =========================
    // 2️⃣ Skills
    // =========================
    const skills = [
      ['React','Avancé','icons/react.png',1],
      ['Node.js','Intermédiaire','icons/node.png',2],
      ['MySQL','Intermédiaire','icons/mysql.png',3],
      ['Docker','Débutant','icons/docker.png',4],
      ['Tailwind CSS','Avancé','icons/tailwind.png',1],
      ['Bootstrap','Avancé','icons/bootstrap.png',1]
    ];

    for(const skill of skills){
      await connection.execute('INSERT INTO skills (name, level, icon, category_id) VALUES (?, ?, ?, ?)', skill);
    }

    // =========================
    // 3️⃣ Projects
    // =========================
    const projects = [
      ['FilterFinder','Application web de filtrage avancé de données','images/filterfinder.png','https://monportfolio.com/filterfinder','React','icons/react.png','Node.js','icons/node.png','MySQL','icons/mysql.png','Tailwind','icons/tailwind.png','https://github.com/moncompte/filterfinder'],
      ['StreamingApp','Application de streaming avec backend Node.js et frontend React','images/streamingapp.png','https://monportfolio.com/streamingapp','React','icons/react.png','Node.js','icons/node.png','MAMP','icons/mysql.png','Bootstrap','icons/bootstrap.png','https://github.com/moncompte/streamingapp']
    ];

    for(const proj of projects){
      await connection.execute(`INSERT INTO projects 
        (title, description, image_url, project_url, techno_1, icon_url_1, techno_2, icon_url_2, techno_3, icon_url_3, techno_4, icon_url_4, link_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, proj);
    }

    // =========================
    // 4️⃣ Experiences
    // =========================
    const experiences = [
      ['Digital Company','Freelance en développement web','2024-01-01',null,'Création de sites web et gestion de campagnes Facebook Business pour des clients en France et en Côte d’Ivoire'],
      ['Horizon Quincaillerie','Assistant comptable & développeur SI','2025-03-01','2025-06-01','Mise en place d’un mini système d’information comptable avec base de données MySQL']
    ];

    for(const exp of experiences){
      await connection.execute('INSERT INTO experiences (company, position, start_date, end_date, description) VALUES (?, ?, ?, ?, ?)', exp);
    }

    // =========================
    // 5️⃣ Education
    // =========================
    const education = [
      ['Université de Finance et Gestion','Licence en Finance','Projet de fin d’année : mise en place d’un système d’information comptable','end',2022,2025],
      ['Cours en ligne OpenClassrooms','Certificat Développeur Web','Formation complète sur le développement web front et back','progress',2024,2025]
    ];

    for(const edu of education){
      await connection.execute('INSERT INTO education (school, diploma, description, status, start_year, end_year) VALUES (?, ?, ?, ?, ?, ?)', edu);
    }

    // =========================
    // 6️⃣ Certification
    // =========================
    const certifications = [
      ['OpenClassrooms','Développeur Web Full Stack','progress',2024,2025,'Certification sur la création d’applications web complètes avec React et Node.js'],
      ['Coursera','Introduction à Docker','end',2025,2025,'Acquisition des bases de Docker pour le développement et le déploiement']
    ];

    for(const cert of certifications){
      await connection.execute('INSERT INTO certification (institue, diploma, status, start_year, end_year, description) VALUES (?, ?, ?, ?, ?, ?)', cert);
    }

    // =========================
    // 7️⃣ Social Links
    // =========================
    const socials = [
      ['LinkedIn','https://linkedin.com/in/monprofil','icons/linkedin.png'],
      ['GitHub','https://github.com/moncompte','icons/github.png'],
      ['Facebook','https://facebook.com/monprofil','icons/facebook.png']
    ];

    for(const s of socials){
      await connection.execute('INSERT INTO social_links (platform, url, icon) VALUES (?, ?, ?)', s);
    }

    console.log("Toutes les données ont été insérées avec succès !");
  } catch(err) {
    console.error("Erreur lors de l'insertion :", err);
  } finally {
    await connection.end();
  }
}

insertData();
