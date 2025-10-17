import db from "../config/db.js";

// Récupérer tous les projets
export const getAllProjects = async () => {
  const [rows] = await db.query("SELECT * FROM projects ORDER BY created_at DESC");
  return rows;
};

// Récupérer un projet par ID
export const getProjectById = async (id) => {
  const [rows] = await db.query("SELECT * FROM projects WHERE id = ?", [id]);
  return rows[0] || null;
};

// Créer un projet
export const createProject = async (data) => {
  const {
    title,
    description,
    image_url,
    project_url,
    techno_1,
    icon_url_1,
    techno_2,
    icon_url_2,
    techno_3,
    icon_url_3,
    techno_4,
    icon_url_4,
    link_url
  } = data;

  const [result] = await db.query(
    `INSERT INTO projects 
    (title, description, image_url, project_url, techno_1, icon_url_1, techno_2, icon_url_2, techno_3, icon_url_3, techno_4, icon_url_4, link_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, description, image_url, project_url, techno_1, icon_url_1, techno_2, icon_url_2, techno_3, icon_url_3, techno_4, icon_url_4, link_url]
  );

  return { id: result.insertId, ...data };
};

// Mettre à jour un projet
export const updateProject = async (id, data) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  const setQuery = keys.map(key => `${key} = ?`).join(", ");

  await db.query(`UPDATE projects SET ${setQuery}, created_at = CURRENT_TIMESTAMP WHERE id = ?`, [...values, id]);

  return getProjectById(id);
};

// Supprimer un projet
export const deleteProject = async (id) => {
  const [result] = await db.query("DELETE FROM projects WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
