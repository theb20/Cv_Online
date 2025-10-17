import db from "../config/db.js"; // ton fichier de connexion MySQL

// 📘 Récupérer toutes les formations
export const getAllEducation = async () => {
  const [rows] = await db.query("SELECT * FROM education ORDER BY start_year DESC");
  return rows;
};

// 📘 Récupérer une formation par ID
export const getEducationById = async (id) => {
  const [rows] = await db.query("SELECT * FROM education WHERE id = ?", [id]);
  return rows[0];
};

// ➕ Ajouter une formation
export const createEducation = async (data) => {
  const { school, diploma, description, status, start_year, end_year } = data;
  const [result] = await db.query(
    "INSERT INTO education (school, diploma, description, status, start_year, end_year) VALUES (?, ?, ?, ?, ?, ?)",
    [school, diploma, description, status, start_year, end_year]
  );
  return { id: result.insertId, ...data };
};

// ✏️ Modifier une formation
export const updateEducation = async (id, data) => {
  const { school, diploma, description, status, start_year, end_year } = data;
  await db.query(
    "UPDATE education SET school=?, diploma=?, description=?, status=?, start_year=?, end_year=? WHERE id=?",
    [school, diploma, description, status, start_year, end_year, id]
  );
  return { id, ...data };
};

// ❌ Supprimer une formation
export const deleteEducation = async (id) => {
  await db.query("DELETE FROM education WHERE id = ?", [id]);
  return { message: "Formation supprimée avec succès" };
};
