import db from "../config/db.js";

export const getAllCategories = async () => {
  const [rows] = await db.query("SELECT * FROM categories ORDER BY name ASC");
  return rows;
};

export const getCategoryById = async (id) => {
  const [rows] = await db.query("SELECT * FROM categories WHERE id=?", [id]);
  return rows[0];
};

export const createCategory = async (data) => {
  const { name, description } = data;
  const [result] = await db.query(
    "INSERT INTO categories (name, description) VALUES (?, ?)",
    [name, description]
  );
  return { id: result.insertId, ...data };
};

export const updateCategory = async (id, data) => {
  const { name, description } = data;
  await db.query("UPDATE categories SET name=?, description=? WHERE id=?", [
    name,
    description,
    id,
  ]);
  return { id, ...data };
};

export const deleteCategory = async (id) => {
  await db.query("DELETE FROM categories WHERE id=?", [id]);
  return { message: "Catégorie supprimée avec succès" };
};
