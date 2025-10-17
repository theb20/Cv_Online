import db from "../config/db.js";

export const getAllSkills = async () => {
  const [rows] = await db.query(`
    SELECT s.*, c.name AS category_name 
    FROM skills s 
    LEFT JOIN categories c ON s.category_id = c.id
    ORDER BY s.name ASC
  `);
  return rows;
};

export const getSkillById = async (id) => {
  const [rows] = await db.query("SELECT * FROM skills WHERE id=?", [id]);
  return rows[0];
};

export const createSkill = async (data) => {
  const { name, level, icon, category_id } = data;
  const [result] = await db.query(
    "INSERT INTO skills (name, level, icon, category_id) VALUES (?, ?, ?, ?)",
    [name, level, icon, category_id]
  );
  return { id: result.insertId, ...data };
};

export const updateSkill = async (id, data) => {
  const { name, level, icon, category_id } = data;
  await db.query(
    "UPDATE skills SET name=?, level=?, icon=?, category_id=? WHERE id=?",
    [name, level, icon, category_id, id]
  );
  return { id, ...data };
};

export const deleteSkill = async (id) => {
  await db.query("DELETE FROM skills WHERE id=?", [id]);
  return { message: "Compétence supprimée avec succès" };
};
