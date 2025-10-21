import db from "../config/db.js"; // ton fichier de connexion MySQL

// 📘 Récupérer toutes les formations
export const getAllEducation = async () => {
  const [rows] = await db.query(`
    SELECT
      id,
      school,
      diploma,
      description,
      status,
      start_year,
      end_year,
      country,
      CONCAT(start_year, ' - ', IFNULL(end_year, 'En cours')) AS period
    FROM education
    ORDER BY
      COALESCE(end_year, 9999) DESC,
      start_year DESC,
      id DESC
  `);

  return rows.map(edu => ({
    ...edu,
    // Pour le frontend, on peut aussi ajouter un format lisible
    period: edu.period
  }));
};


// 📘 Récupérer une formation par ID
export const getEducationById = async (id) => {
  const [rows] = await db.query("SELECT * FROM education WHERE id = ?", [id]);
  return rows[0];
};

// ➕ Ajouter une formation
export const createEducation = async (data) => {
  const { school, diploma, description, status, start_year, end_year, country } = data;
  const [result] = await db.query(
    "INSERT INTO education (school, diploma, description, status, start_year, end_year, country) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [school, diploma, description, status, start_year, end_year, country]
  );
  return { id: result.insertId, ...data };
};

// ✏️ Modifier une formation
export const updateEducation = async (id, data) => {
  const { school, diploma, description, status, start_year, end_year, country } = data;
  await db.query(
    "UPDATE education SET school=?, diploma=?, description=?, status=?, start_year=?, end_year=?, country=? WHERE id=?",
    [school, diploma, description, status, start_year, end_year, country, id]
  );
  return { id, ...data };
};

// ❌ Supprimer une formation
export const deleteEducation = async (id) => {
  await db.query("DELETE FROM education WHERE id = ?", [id]);
  return { message: "Formation supprimée avec succès" };
};
