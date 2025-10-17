import db from "../config/db.js";

export const getAllExperiences = async () => {
  const [rows] = await db.query("SELECT * FROM experiences ORDER BY start_date DESC");
  return rows;
};

export const getExperienceById = async (id) => {
  const [rows] = await db.query("SELECT * FROM experiences WHERE id = ?", [id]);
  return rows[0];
};

export const createExperience = async (experience) => {
  const { company, position, start_date, end_date, description } = experience;
  const [result] = await db.query(
    "INSERT INTO experiences (company, position, start_date, end_date, description) VALUES (?, ?, ?, ?, ?)",
    [company, position, start_date, end_date, description]
  );
  return { id: result.insertId, ...experience };
};

export const updateExperience = async (id, experience) => {
  const { company, position, start_date, end_date, description } = experience;
  await db.query(
    "UPDATE experiences SET company=?, position=?, start_date=?, end_date=?, description=? WHERE id=?",
    [company, position, start_date, end_date, description, id]
  );
  return { id, ...experience };
};

export const deleteExperience = async (id) => {
  await db.query("DELETE FROM experiences WHERE id=?", [id]);
  return { message: "Experience supprimée avec succès." };
};
