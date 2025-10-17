// server.js
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import db, { testConnection, showAllTables, closeDatabase } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT ;
const IP = process.env.IP ;

// Middleware essentiels
app.use(helmet()); // sécurise les headers HTTP
app.use(cors()); // autorise toutes les origines (à restreindre en prod)
app.use(express.json()); // parse le JSON
app.use(express.urlencoded({ extended: true })); // parse les formulaires
app.use(morgan("combined")); // logs HTTP détaillés

// Test connexion DB simple
app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS result");
    res.json({ success: true, result: rows[0].result });
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    res.status(500).json({ success: false, error: "Database connection failed" });
  }
});

// Route racine
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Server is running!",
    environment: process.env.NODE_ENV,
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

// Route 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


// Démarrage serveur avec vérification DB
const startServer = async () => {
  try {
    console.log("🔎 Vérification de la connexion à la base de données...");
    await db.query("SELECT 1"); // test simple
    console.log("✅ Connexion à la base réussie !");
    (async () => {
        try {
            await testConnection();
            await showAllTables();
        } catch (err) {
            console.error("Erreur :", err.message);
        }
        })();
    
    app.listen(IP, PORT, () => {
      console.log(`🚀 http://${IP}:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Impossible de se connecter à la base :", err.message);
    process.exit(1); // stoppe le serveur si DB KO
  }
};

startServer();
