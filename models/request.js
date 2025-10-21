import db from '../config/db.js';

// 🔹 Créer une demande
export const createRequest = async (data) => {
  const { nom, email, company, typeProjet, budget, delai, description, created_at } = data;

  // Si aucune date n’est fournie, on prend la date actuelle
  const date = created_at || new Date();

  const query = `
    INSERT INTO request (fullname, email, company, type_projet, budget, delai, description, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [nom, email, company, typeProjet, budget, delai, description, date];

  const [result] = await db.query(query, values);

  // Récupère la ligne insérée
  const [newRequest] = await db.query('SELECT * FROM request WHERE id = ?', [result.insertId]);

  return newRequest[0];
};

// 🔹 Trouver toutes les demandes
export const findAllRequests = async () => {
  const [rows] = await db.query('SELECT * FROM request ORDER BY created_at DESC;');
  return rows;
};

// 🔹 Trouver une demande par ID
export const findRequestById = async (id) => {
  const [rows] = await db.query('SELECT * FROM request WHERE id = ?;', [id]);
  return rows[0];
};

// 🔹 Mettre à jour une demande
export const updateRequest = async (id, data) => {
  const { nom, email, company, typeProjet, budget, delai, description } = data;

  const query = `
    UPDATE request 
    SET fullname = ?, email = ?, company = ?, type_projet = ?, 
        budget = ?, delai = ?, description = ?
    WHERE id = ?
  `;
  const values = [nom, email, company, typeProjet, budget, delai, description, id];
  await db.query(query, values);

  // Retourner la ligne mise à jour
  const [updated] = await db.query('SELECT * FROM request WHERE id = ?', [id]);
  return updated[0];
};

// 🔹 Supprimer une demande
export const deleteRequest = async (id) => {
  const [deleted] = await db.query('SELECT * FROM request WHERE id = ?', [id]);
  await db.query('DELETE FROM request WHERE id = ?', [id]);
  return deleted[0];
};
