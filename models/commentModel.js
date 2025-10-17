import db from "../config/db.js";

export const getAllComments = async () => {
  const [rows] = await db.query("SELECT * FROM comments ORDER BY created_at DESC");
  return rows;
};

export const getCommentById = async (id) => {
  const [rows] = await db.query("SELECT * FROM comments WHERE id=?", [id]);
  return rows[0];
};

export const createComment = async (data) => {
  const { user_name, user_email, item_type, item_id, content, rating, status } = data;
  const [result] = await db.query(
    "INSERT INTO comments (user_name, user_email, item_type, item_id, content, rating, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [user_name, user_email, item_type, item_id, content, rating, status]
  );
  return { id: result.insertId, ...data };
};

export const updateComment = async (id, data) => {
  const { content, rating, status } = data;
  await db.query(
    "UPDATE comments SET content=?, rating=?, status=?, updated_at=NOW() WHERE id=?",
    [content, rating, status, id]
  );
  return { id, ...data };
};

export const deleteComment = async (id) => {
  await db.query("DELETE FROM comments WHERE id=?", [id]);
  return { message: "Commentaire supprimé" };
};
