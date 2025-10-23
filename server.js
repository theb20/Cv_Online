// server.js
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import db, { testConnection, closeDatabase } from "./config/db.js";

import os from "os";

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
import requestRoute from "./routes/requestRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Fonction pour obtenir l'IP locale
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Ignorer les adresses non-IPv4 et loopback
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

const LOCAL_IP = getLocalIP();

// ============================================
// Configuration CORS sécurisée
// ============================================
const allowedOrigins = [
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  `http://${LOCAL_IP}:3001`,
  "http://192.168.1.26:3001",
  // Ajoutez d'autres IPs si nécessaire
];

const corsOptions = {
  origin: (origin, callback) => {
    // Autoriser les requêtes sans origin (Postman, mobile apps)
    if (!origin) {
      return callback(null, true);
    }
    
    // En développement, autoriser toutes les IPs du réseau local
    if (process.env.NODE_ENV !== "production") {
      // Autoriser toutes les origines en développement
      if (origin.startsWith('http://192.168.') || 
          origin.startsWith('http://10.') || 
          origin.startsWith('http://172.') ||
          origin.includes('localhost') ||
          origin.includes('127.0.0.1')) {
        return callback(null, true);
      }
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`❌ CORS bloqué pour: ${origin}`);
      // En dev, on autorise quand même mais on log
      if (process.env.NODE_ENV !== "production") {
        console.log(`⚠️  Origine non listée mais autorisée en mode dev`);
        return callback(null, true);
      }
      callback(new Error(`CORS not allowed for origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
  maxAge: 86400,
};

// ============================================
// Middlewares
// ============================================
app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === "production" ? undefined : false
}));
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.static('public'))

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
      network: {
        localIP: LOCAL_IP,
        port: PORT
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

// Fallback préflight OPTIONS
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(204);
  }
  next();
});

// ============================================
// Test de connexion DB
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
    network: {
      localIP: LOCAL_IP,
      port: PORT,
      allowedOrigins: allowedOrigins
    },
    endpoints: {
      health: "/health",
      api: "/api",
      dbTest: process.env.NODE_ENV !== "production" ? "/db-test" : "disabled"
    }
  });
});
        
// Routes API
app.use("/api", authRoute, projectRoute, expRoute, eduRoute, certRoute, messageRoute, socialLinkRoute, categoryRoute, skillRoute, commentRoute, likeRoute, aiRoutes, requestRoute);
        
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

app.get("/favicon.ico", (req, res) => {
  
  res.status(204)._construct;
  res.setHeader('Content-Type', 'image/x-icon');
  res.send(favicon);
});

// ============================================
// Démarrage du serveur
// ============================================
const startServer = async () => {
  try {
    console.log("\n╔════════════════════════════════════════╗");
    console.log("║     🚀 Démarrage du serveur API        ║");
    console.log("╚════════════════════════════════════════╝\n");

    console.log("🔎 Vérification de la connexion à la base de données...");
    
    try {
      await testConnection();
      console.log("✅ Connexion à la base de données établie avec succès!\n");
    } catch (dbError) {
      console.error("❌ Erreur de connexion à la base de données:", dbError.message);
      console.error("💡 Vérifiez vos variables d'environnement dans le fichier .env\n");
      throw dbError;
    }

    // IMPORTANT: Écouter sur 0.0.0.0 pour accepter les connexions de toutes les interfaces
    app.listen(PORT, "0.0.0.0", () => {
      console.log("╔════════════════════════════════════════╗");
      console.log("║        ✅ Serveur démarré!             ║");
      console.log("╚════════════════════════════════════════╝");
      console.log(`🌐 URL locale:       http://localhost:${PORT}`);
      console.log(`🌐 URL réseau local: http://${LOCAL_IP}:${PORT}`);
      console.log(`📊 Environnement: ${process.env.NODE_ENV || "development"}`);
      console.log(`💾 Base de données: ${process.env.MYSQL_DATABASE || "N/A"}`);
      console.log("\n🔗 Endpoints disponibles:");
      console.log(`   • GET  /              - Page d'accueil`);
      console.log(`   • GET  /health        - Health check`);
      if (process.env.NODE_ENV !== "production") {
        console.log(`   • GET  /db-test       - Test DB (dev only)`);
      }
      console.log(`   • *    /api/*         - Routes API\n`);
      console.log("📝 Origines CORS autorisées:");
      allowedOrigins.forEach(origin => console.log(`   • ${origin}`));
      console.log("\n⌨️  Ctrl+C pour arrêter le serveur\n");
    });

  } catch (err) {
    console.error("\n╔════════════════════════════════════════╗");
    console.error("║     ❌ ÉCHEC DU DÉMARRAGE              ║");
    console.error("╚════════════════════════════════════════╝");
    console.error(`\n💥 Erreur: ${err.message}`);
    console.error("\n📋 Checklist de dépannage:");
    console.error("   1. Vérifiez que le fichier .env existe");
    console.error("   2. Vérifiez les variables d'environnement");
    console.error("   3. Vérifiez que Railway MySQL est accessible");
    console.error("   4. Vérifiez que le port n'est pas déjà utilisé");
    console.error("   5. Vérifiez votre pare-feu Windows/Mac\n");
    console.error("❌ Arrêt du serveur avec code d'erreur 1");
    
    process.exit(1);
  }
};

// ============================================
// Gestion de l'arrêt propre
// ============================================
const gracefulShutdown = async (signal) => {
  console.log(`\n\n📡 Signal ${signal} reçu, arrêt propre du serveur...`);
  
  try {
    await closeDatabase();
    console.log("✅ Serveur arrêté proprement");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur lors de l'arrêt:", err.message);
    process.exit(1);
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection:", reason);
  gracefulShutdown("UNHANDLED_REJECTION");
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  gracefulShutdown("UNCAUGHT_EXCEPTION");
});

startServer();