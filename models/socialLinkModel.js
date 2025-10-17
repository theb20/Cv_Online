import db from "../config/db.js";

export const getAllLinks = async () => {
  const [rows] = await db.query("SELECT * FROM social_links");
  return rows;
};

export const getLinkById = async (id) => {
  const [rows] = await db.query("SELECT * FROM social_links WHERE id = ?", [id]);
  return rows[0];
};

export const createLink = async (data) => {
  const { platform, url, icon } = data;
  const [result] = await db.query(
    "INSERT INTO social_links (platform, url, icon) VALUES (?, ?, ?)",
    [platform, url, icon]
  );
  return { id: result.insertId, ...data };
};

export const updateLink = async (id, data) => {
  const { platform, url, icon } = data;
  await db.query("UPDATE social_links SET platform=?, url=?, icon=? WHERE id=?", [
    platform,
    url,
    icon,
    id,
  ]);
  return { id, ...data };
};

export const deleteLink = async (id) => {
  await db.query("DELETE FROM social_links WHERE id=?", [id]);
  return { message: "Lien supprimé" };
};
