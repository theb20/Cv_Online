// server.js
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import db, { testConnection, closeDatabase } from "./config/db.js";

import authRoute from "./routes/authRoute.js";
import projectRoute from "./routes/projectRoute.js";
import expRoute from "./routes/expRoute.js";
import eduRoute from "./routes/eduRoute.js";    
import certRoute from "./routes/certRoute.js";   
import messageRoute from "./routes/messageRoute.js";  
import socialLinkRoute from "./routes/socialLinkRoute.js"; 
import categoryRoute from "./routes/categoryRoute.js"; 
import skillRoute from "./routes/skillRoute.js";
import commentRoute from "./routes/commentRoute.js";
import likeRoute from "./routes/likeRoute.js";
import aiRoutes from "./routes/aiRoute.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;
const HOST = process.env.HOST || "0.0.0.0"; // Changé de IP à HOST

// ============================================
// Configuration CORS sécurisée
// ============================================
const corsOptions = {
  origin: process.env.NODE_ENV === "production" 
    ? process.env.FRONTEND_URL || "http://localhost:55"
    : "*", // En développement, autorise tout
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// ============================================
// Middlewares
// ============================================
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false
})); // Sécurise les headers HTTP
app.use(cors(corsOptions)); // CORS configuré
app.use(express.json({ limit: "10mb" })); // Parse JSON avec limite
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Parse formulaires
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")); // Logs HTTP

// ============================================
// Health Check
// ============================================
app.get("/health", async (req, res) => {
  try {
    const start = Date.now();
    await db.query("SELECT 1");
    const dbLatency = Date.now() - start;

    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        status: "connected",
        latency: `${dbLatency}ms`
      },
      environment: process.env.NODE_ENV || "development"
    });
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      database: {
        status: "disconnected",
        error: error.message
      }
    });
  }
});

// ============================================
// Test de connexion DB (à désactiver en prod)
// ============================================
if (process.env.NODE_ENV !== "production") {
  app.get("/db-test", async (req, res) => {
    try {
      const [rows] = await db.query("SELECT 1 AS result, NOW() AS timestamp");
      res.json({ 
        success: true, 
        result: rows[0].result,
        timestamp: rows[0].timestamp,
        message: "Database connection successful!"
      });
    } catch (err) {
      console.error("❌ DB connection error:", err.message);
      res.status(500).json({ 
        success: false, 
        error: "Database connection failed",
        details: err.message 
      });
    }
  });
}

// ============================================
// Routes principales
// ============================================
app.get("/", (req, res) => {
  res.json({
    message: "🚀 API Server is running!",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    endpoints: {
      health: "/health",
      api: "/api",
      dbTest: process.env.NODE_ENV !== "production" ? "/db-test" : "disabled"
    }
  });
});
        
// Routes API
app.use("/api", authRoute, projectRoute, expRoute, eduRoute, certRoute, messageRoute, socialLinkRoute, categoryRoute, skillRoute, commentRoute, likeRoute, aiRoutes);     // Route pour les formations       
        
// ============================================
// Gestion des erreurs 404
// ============================================
app.use((req, res) => {
  res.status(404).json({ 
    status: "error",
    message: "Route not found",
    path: req.path,
    method: req.method
  });
});

// ============================================
// Gestion des erreurs globales
// ============================================
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err.stack);
  
  // Ne pas exposer les détails en production
  const errorResponse = {
    status: "error",
    message: process.env.NODE_ENV === "production" 
      ? "Internal Server Error" 
      : err.message
  };

  if (process.env.NODE_ENV !== "production") {
    errorResponse.stack = err.stack;
  }

  res.status(err.status || 500).json(errorResponse);
});

// ============================================
// Démarrage du serveur avec vérification DB
// ============================================
const startServer = async () => {
  try {
    console.log("\n╔════════════════════════════════════════╗");
    console.log("║     🚀 Démarrage du serveur API        ║");
    console.log("╚════════════════════════════════════════╝\n");

    // Test de connexion à la base de données
    console.log("🔎 Vérification de la connexion à la base de données...");
    
    try {
      await testConnection();
      console.log("✅ Connexion à la base de données établie avec succès!\n");
    } catch (dbError) {
      console.error("❌ Erreur de connexion à la base de données:", dbError.message);
      console.error("💡 Vérifiez vos variables d'environnement dans le fichier .env\n");
      throw dbError;
    }

    // Démarrage du serveur
    // CORRECTION ICI : PORT en premier, HOST en second
    app.listen(PORT, HOST, () => {
      console.log("╔════════════════════════════════════════╗");
      console.log("║        ✅ Serveur démarré!             ║");
      console.log("╚════════════════════════════════════════╝");
      console.log(`🌐 URL locale:    http://localhost:${PORT}`);
      console.log(`🌐 URL réseau:    http://${HOST}:${PORT}`);
      console.log(`📊 Environnement: ${process.env.NODE_ENV || "development"}`);
      console.log(`💾 Base de données: ${process.env.MYSQL_DATABASE || "N/A"}`);
      console.log("\n🔗 Endpoints disponibles:");
      console.log(`   • GET  /              - Page d'accueil`);
      console.log(`   • GET  /health        - Health check`);
      if (process.env.NODE_ENV !== "production") {
        console.log(`   • GET  /db-test       - Test DB (dev only)`);
      }
      console.log(`   • *    /api/*         - Routes API\n`);
      console.log("📝 Logs HTTP actifs");
      console.log("⌨️  Ctrl+C pour arrêter le serveur\n");
    });

  } catch (err) {
    console.error("\n╔════════════════════════════════════════╗");
    console.error("║     ❌ ÉCHEC DU DÉMARRAGE              ║");
    console.error("╚════════════════════════════════════════╝");
    console.error(`\n💥 Erreur: ${err.message}`);
    console.error("\n📋 Checklist de dépannage:");
    console.error("   1. Vérifiez que le fichier .env existe");
    console.error("   2. Vérifiez les variables d'environnement:");
    console.error("      - MYSQLHOST");
    console.error("      - MYSQLUSER");
    console.error("      - MYSQLPASSWORD");
    console.error("      - MYSQL_DATABASE");
    console.error("   3. Vérifiez que Railway MySQL est accessible");
    console.error("   4. Vérifiez que le port n'est pas déjà utilisé\n");
    
    process.exit(1); // Stoppe le serveur si échec
  }
};

// ============================================
// Gestion de l'arrêt propre (Graceful Shutdown)
// ============================================
const gracefulShutdown = async (signal) => {
  console.log(`\n\n📡 Signal ${signal} reçu, arrêt propre du serveur...`);
  
  try {
    // Fermeture de la base de données
    await closeDatabase();
    
    console.log("✅ Serveur arrêté proprement");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur lors de l'arrêt:", err.message);
    process.exit(1);
  }
};

// Écoute des signaux d'arrêt
process.on("SIGINT", () => gracefulShutdown("SIGINT"));   // Ctrl+C
process.on("SIGTERM", () => gracefulShutdown("SIGTERM")); // Docker/Railway stop

// Gestion des erreurs non capturées
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection:", reason);
  gracefulShutdown("UNHANDLED_REJECTION");
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  gracefulShutdown("UNCAUGHT_EXCEPTION");
});

// Démarrage
startServer();