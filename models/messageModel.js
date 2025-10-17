import db from "../config/db.js";

export const getAllMessages = async () => {
  const [rows] = await db.query("SELECT * FROM messages ORDER BY sent_at DESC");
  return rows;
};

export const getMessageById = async (id) => {
  const [rows] = await db.query("SELECT * FROM messages WHERE id = ?", [id]);
  return rows[0];
};

export const createMessage = async (data) => {
  const { name, email, subject, message } = data;
  const [result] = await db.query(
    "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
    [name, email, subject, message]
  );
  return { id: result.insertId, ...data };
};

export const deleteMessage = async (id) => {
  await db.query("DELETE FROM messages WHERE id = ?", [id]);
  return { message: "Message supprimé" };
};
