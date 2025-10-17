import db from "../config/db.js";

// 🔹 Récupérer toutes les certifications
export const getAllCertifications = async () => {
  const [rows] = await db.query("SELECT * FROM certification ORDER BY start_year DESC");
  return rows;
};

// 🔹 Récupérer une certification par ID
export const getCertificationById = async (id) => {
  const [rows] = await db.query("SELECT * FROM certification WHERE id = ?", [id]);
  return rows[0];
};

// ➕ Créer une certification
export const createCertification = async (data) => {
  const { institue, diploma, status, start_year, end_year, description } = data;
  const [result] = await db.query(
    "INSERT INTO certification (institue, diploma, status, start_year, end_year, description) VALUES (?, ?, ?, ?, ?, ?)",
    [institue, diploma, status, start_year, end_year, description]
  );
  return { id: result.insertId, ...data };
};

// ✏️ Mettre à jour une certification
export const updateCertification = async (id, data) => {
  const { institue, diploma, status, start_year, end_year, description } = data;
  await db.query(
    "UPDATE certification SET institue=?, diploma=?, status=?, start_year=?, end_year=?, description=? WHERE id=?",
    [institue, diploma, status, start_year, end_year, description, id]
  );
  return { id, ...data };
};

// ❌ Supprimer une certification
export const deleteCertification = async (id) => {
  await db.query("DELETE FROM certification WHERE id=?", [id]);
  return { message: "Certification supprimée avec succès" };
};
