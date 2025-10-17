import db from "../config/db.js";

export const getLikesByComment = async (comment_id) => {
  const [rows] = await db.query("SELECT * FROM likes WHERE comment_id=?", [comment_id]);
  return rows;
};

export const createLike = async (data) => {
  const { comment_id, user_name, user_email, type } = data;
  const [result] = await db.query(
    "INSERT INTO likes (comment_id, user_name, user_email, type) VALUES (?, ?, ?, ?)",
    [comment_id, user_name, user_email, type]
  );
  return { id: result.insertId, ...data };
};

export const deleteLike = async (id) => {
  await db.query("DELETE FROM likes WHERE id=?", [id]);
  return { message: "Like supprimé" };
};
