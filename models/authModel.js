import db from "../config/db.js";
import bcrypt from "bcryptjs";

// 🔹 Récupérer un utilisateur par ID
export const getUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows || null;
};

// 🔹 Récupérer tous les utilisateurs
export const getAllUsers = async () => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows; 
};

// 🔹 Créer un utilisateur
export const createUser = async (data) => {
  const {
    fullname,
    email,
    phone,
    password,
    google_id,
    avatar_url,
    bio,
    role,
    country,
    city,
  } = data;

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const now = new Date();

  const [result] = await db.query(
    `INSERT INTO users
      (fullname, email, phone, password, google_id, avatar_url, bio, role, country, city, last_login)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      fullname,
      email,
      phone || null,
      password_hash,
      google_id || null,
      avatar_url || "default.png",
      bio || null,
      role || "visitor",
      country || null,
      city || null,
      now,
    ]
  );

  return {
    id: result.insertId,
    fullname,
    email,
    phone,
    google_id,
    avatar_url,
    bio,
    role,
    country,
    city,
    last_login: now,
  };
};

// 🔹 Inscription / connexion Google
export const googleAuth = async ({ fullname, email, phone, google_id, avatar_url }) => {
  const now = new Date();

  // Vérifie si l'utilisateur existe déjà
  const [existing] = await db.query("SELECT * FROM users WHERE google_id = ?", [google_id]);
  if (existing.length > 0) {
    // Met à jour la date de dernière connexion
    await db.query("UPDATE users SET last_login = ? WHERE google_id = ?", [now, google_id]);
    return { ...existing[0], last_login: now };
  }

  // Crée un nouvel utilisateur Google
  const [result] = await db.query(
    `INSERT INTO users
      (fullname, email, phone, google_id, avatar_url, last_login)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      fullname,
      email,
      phone || null,
      google_id,
      avatar_url || "default.png",
      now,
    ]
  );

  return {
    id: result.insertId,
    fullname,
    email,
    phone: phone || null,
    google_id,
    avatar_url: avatar_url || "default.png",
    last_login: now,
  };
};

// 🔹 Mettre à jour un utilisateur
export const updateUser = async (id, data) => {
  const fields = [];
  const values = [];

  for (const key in data) {
    if (data[key] === undefined) continue; // Ignore undefined
    if (key === "password" && data[key]) {
      const salt = await bcrypt.genSalt(10);
      values.push(await bcrypt.hash(data[key], salt));
      fields.push(`\`${key}\` = ?`);
    } else {
      values.push(data[key]);
      fields.push(`\`${key}\` = ?`);
    }
  }

  if (fields.length === 0) return getUserById(id);

  values.push(id);

  const sql = `UPDATE users SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  
  try {
    await db.query(sql, values);
  } catch (err) {
    console.error("Erreur SQL :", err.sqlMessage);
    throw err;
  }

  return getUserById(id);
};

// 🔹 Supprimer un utilisateur
export const deleteUser = async (id) => {
  await db.query("DELETE FROM users WHERE id = ?", [id]);
  return true;
};