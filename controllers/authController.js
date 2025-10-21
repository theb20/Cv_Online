import * as UserModel from "../models/authModel.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET;
const OTP_TTL_MINUTES = parseInt(process.env.OTP_TTL_MINUTES);


// GET /users
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /users/:id
export const getUser = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /users
export const createUser = async (req, res) => {
  try {
    const newUser = await UserModel.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /users/:id
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserModel.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /users/:id
export const deleteUser = async (req, res) => {
  try {
    await UserModel.deleteUser(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const googleAuth = async (req, res) => {
  try {
    if (!GOOGLE_CLIENT_ID) {
      return res.status(500).json({ error: "GOOGLE_CLIENT_ID manquant côté serveur" });
    }
    const { token } = req.body;
    // Vérifier le token Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = await ticket.getPayload();
    const { email, email_verified, name, picture } = payload;
    if (!email_verified) {
      return res.status(403).json({ error: "Email non vérifié" });
    }
   // Crée ou récupère l'utilisateur Google
    const user = await registerOrLoginGoogleUser({
      google_id: sub,
      email,
      name,
      first_name: given_name,
      avatar_url: picture,
    });

    // Générer JWT
    const jwtToken = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        avatar: user.avatar_url,
        name: user.name,
        firstname: user.first_name,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "3d" },
    );

    // Réponse
    res.status(200).json({
      message: "Connexion / Inscription Google réussie",
      token: jwtToken,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar_url,
      },
    });



  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// logout
export const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.clearCookie("connect.sid"); // Assurez-vous d'utiliser le même nom de cookie que vous avez configuré
      res.json({ message: "Déconnexion réussie" });
    }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};