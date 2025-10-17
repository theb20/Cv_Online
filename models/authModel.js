import db from "../config/db.js";
import bcrypt from "bcryptjs"; // ✅ plus léger et compatible async

// -----------------------------
// 1️⃣ Récupérer un utilisateur par ID
// -----------------------------
export const getUserById = async (id) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] || null;
  } catch (error) {
    console.error("❌ getUserById:", error.message);
    throw new Error("Erreur lors de la récupération de l’utilisateur.");
  }
};

// -----------------------------
// 2️⃣ Récupérer tous les utilisateurs
// -----------------------------
export const getAllUsers = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error("❌ getAllUsers:", error.message);
    throw new Error("Erreur lors de la récupération des utilisateurs.");
  }
};

// -----------------------------
// 3️⃣ Inscription d’un nouvel utilisateur
// -----------------------------
export const registerUser = async (data) => {
  try {
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

    if (!fullname || !email || !password) {
      throw new Error("Nom complet, email et mot de passe sont obligatoires.");
    }

    // 🧂 Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 🕓 Date actuelle
    const now = new Date();

    // 💾 Insertion dans la base
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

    // 🧾 Retourne l’utilisateur créé (sans mot de passe)
    return {
      id: result.insertId,
      fullname,
      email,
      phone,
      google_id,
      avatar_url: avatar_url || "default.png",
      bio,
      role: role || "visitor",
      country,
      city,
      last_login: now,
    };
  } catch (error) {
    console.error("❌ registerUser:", error.message);
    throw new Error("Erreur lors de l’inscription de l’utilisateur.");
  }
};

// -----------------------------
// 4️⃣ Connexion d’un utilisateur
// -----------------------------
export const loginUser = async (email, password) => {
  try {
    // 1️⃣ Vérifier l'existence de l'utilisateur
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows.length) {
      const err = new Error("Utilisateur non trouvé.");
      err.code = "USER_NOT_FOUND";
      throw err;
    }

    const user = rows[0];

    // 2️⃣ Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Mot de passe incorrect.");
      err.code = "INVALID_PASSWORD";
      throw err;
    }

    // 3️⃣ Vérifier le statut du compte
    if (user.status !== "active") {
      const err = new Error("Votre compte est inactif ou banni. Contactez le support.");
      err.code = "ACCOUNT_INACTIVE";
      throw err;
    }

    // 4️⃣ Mettre à jour la date de dernière connexion
    const now = new Date();
    await db.query("UPDATE users SET last_login = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [
      now,
      user.id,
    ]);

    // 5️⃣ Retourner l'utilisateur sans le mot de passe
    const { password: _, ...safeUser } = user;
    return { ...safeUser, last_login: now };
  } catch (error) {
    console.error("❌ loginUser:", error.message);
    throw new Error(error.message);
  }
};

// -----------------------------
// 5️⃣ Inscription / Connexion Google
// -----------------------------
export const registerOrLoginGoogleUser = async ({
  google_id,
  email,
  fullname,
  avatar_url,
}) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? OR google_id = ?",
      [email, google_id]
    );

    const now = new Date();

    if (rows.length > 0) {
      // 🟢 Mise à jour de la dernière connexion
      await db.query("UPDATE users SET last_login = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", [
        now,
        rows[0].id,
      ]);
      return { ...rows[0], last_login: now };
    }

    // 🆕 Création d'un nouvel utilisateur Google
    const [result] = await db.query(
      `INSERT INTO users (google_id, email, fullname, avatar_url, role, last_login)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [google_id, email, fullname, avatar_url || "default.png", "visitor", now]
    );

    return {
      id: result.insertId,
      google_id,
      email,
      fullname,
      avatar_url: avatar_url || "default.png",
      role: "visitor",
      last_login: now,
    };
  } catch (error) {
    console.error("❌ registerOrLoginGoogleUser:", error.message);
    throw new Error("Erreur lors de la connexion Google.");
  }
};
