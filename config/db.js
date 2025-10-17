import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Fonction de logging simple (remplacez par votre logger si vous en avez un)
const logger = {
  info: (msg) => console.log(`[INFO] ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${msg}`),
  error: (msg, err) => console.error(`[ERROR] ${msg}`, err)
};

// Validation des variables d'environnement Railway
const requiredEnvVars = [
  "MYSQLHOST",
  "MYSQLUSER", 
  "MYSQLPASSWORD",
  "MYSQL_DATABASE"
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(
    `❌ Variables d'environnement Railway manquantes : ${missingVars.join(", ")}\n` +
    "Vérifiez la configuration de votre service MySQL sur Railway"
  );
}

// Configuration sécurisée du pool de connexions pour Railway
export const db = mysql.createPool({
  // Connexion Railway
  host: process.env.MYSQLHOST,
  port: parseInt(process.env.MYSQLPORT || "3306", 10),
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE,
  
  // SSL/TLS (Railway utilise des connexions sécurisées)
  ssl: process.env.NODE_ENV === "production" 
    ? {
        rejectUnauthorized: false,
      }
    : false,
  
  // Pool de connexions optimisé pour Railway
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || "5", 10), // Railway: limite réduite
  maxIdle: parseInt(process.env.DB_MAX_IDLE || "5", 10),
  idleTimeout: 60000, // 60 secondes
  queueLimit: parseInt(process.env.DB_QUEUE_LIMIT || "0", 10),
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000, // 10 secondes pour Railway
  
  // Timeouts adaptés pour Railway (connexions réseau potentiellement plus lentes)
  connectTimeout: 20000, // 20 secondes
  acquireTimeout: 20000, // 20 secondes
  
  // Sécurité CRITIQUE
  multipleStatements: false, // ⚠️ IMPORTANT : Empêche les injections SQL multiples
  
  // Charset et timezone
  charset: "utf8mb4", // Support complet Unicode (emojis, caractères spéciaux)
  timezone: "Z", // UTC
  
  // Formats de date
  dateStrings: false,
  
  // Gestion des nombres décimaux
  supportBigNumbers: true,
  bigNumberStrings: false,
  
  // Noms de colonnes avec placeholders nommés
  namedPlaceholders: true, // Permet :placeholder au lieu de ?
});

// Test de connexion au démarrage avec retry
export async function testConnection(maxRetries = 5) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const connection = await db.getConnection();
      await connection.ping();
      
      // Informations de connexion (sans le mot de passe)
      const [rows] = await connection.query("SELECT DATABASE() as db, VERSION() as version");
      connection.release();
      
      logger.info(`✅ Connexion à Railway MySQL établie avec succès`);
      logger.info(`📊 Base de données: ${rows[0].db} | Version MySQL: ${rows[0].version}`);
      return true;
    } catch (error) {
      logger.error(`❌ Tentative ${attempt}/${maxRetries} de connexion échouée:`, error.message);
      
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000); // Exponential backoff
        logger.warn(`⏳ Nouvelle tentative dans ${delay/1000}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw new Error(`Impossible de se connecter à Railway MySQL après ${maxRetries} tentatives: ${error.message}`);
      }
    }
  }
}

// Fonction pour exécuter des requêtes sécurisées avec retry
export async function executeQuery(query, params = [], options = {}) {
  const { maxRetries = 3, retryDelay = 1000 } = options;
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const [rows] = await db.execute(query, params);
      return rows;
    } catch (error) {
      lastError = error;
      
      // Log l'erreur (sans exposer les données sensibles)
      logger.warn(`Erreur requête (tentative ${attempt}/${maxRetries}): ${error.code}`);
      
      // Erreurs à ne PAS réessayer
      const noRetryErrors = [
        "ER_DUP_ENTRY",           // Entrée dupliquée
        "ER_NO_REFERENCED_ROW",   // Contrainte de clé étrangère
        "ER_BAD_FIELD_ERROR",     // Champ inexistant
        "ER_PARSE_ERROR",         // Erreur de syntaxe SQL
        "ER_NO_SUCH_TABLE",       // Table inexistante
        "ER_BAD_DB_ERROR",        // Base de données inexistante
      ];
      
      if (noRetryErrors.includes(error.code)) {
        throw error;
      }
      
      // Retry pour les erreurs temporaires (réseau, connexion, etc.)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
      }
    }
  }
  
  throw lastError;
}

// Transaction sécurisée
export async function executeTransaction(callback) {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    logger.error("❌ Transaction annulée (rollback):", error.message);
    throw error;
  } finally {
    connection.release();
  }
}

// Helpers de requêtes sécurisées (CRUD simplifié)
export const dbHelpers = {
  // SELECT avec pagination et filtres
  async findMany(table, conditions = {}, options = {}) {
    const { 
      limit = 50, 
      offset = 0, 
      orderBy = "id", 
      order = "DESC",
      select = "*" 
    } = options;
    
    // Validation du nom de table (sécurité)
    if (!/^[a-zA-Z0-9_]+$/.test(table)) {
      throw new Error("Nom de table invalide");
    }
    
    const whereClause = Object.keys(conditions).length > 0
      ? "WHERE " + Object.keys(conditions).map(key => `${mysql.escapeId(key)} = ?`).join(" AND ")
      : "";
    
    const query = `
      SELECT ${select === "*" ? "*" : select}
      FROM ${mysql.escapeId(table)}
      ${whereClause}
      ORDER BY ${mysql.escapeId(orderBy)} ${order === "ASC" ? "ASC" : "DESC"}
      LIMIT ? OFFSET ?
    `;
    
    const params = [...Object.values(conditions), limit, offset];
    return executeQuery(query, params);
  },
  
  // SELECT un seul enregistrement
  async findOne(table, conditions = {}) {
    if (!/^[a-zA-Z0-9_]+$/.test(table)) {
      throw new Error("Nom de table invalide");
    }
    
    const whereClause = Object.keys(conditions).length > 0
      ? "WHERE " + Object.keys(conditions).map(key => `${mysql.escapeId(key)} = ?`).join(" AND ")
      : "";
    
    const query = `SELECT * FROM ${mysql.escapeId(table)} ${whereClause} LIMIT 1`;
    const rows = await executeQuery(query, Object.values(conditions));
    return rows[0] || null;
  },
  
  // INSERT avec retour de l'ID
  async insertOne(table, data) {
    if (!/^[a-zA-Z0-9_]+$/.test(table)) {
      throw new Error("Nom de table invalide");
    }
    
    if (Object.keys(data).length === 0) {
      throw new Error("Aucune donnée à insérer");
    }
    
    const columns = Object.keys(data);
    const placeholders = columns.map(() => "?").join(", ");
    
    const query = `
      INSERT INTO ${mysql.escapeId(table)}
      (${columns.map(col => mysql.escapeId(col)).join(", ")})
      VALUES (${placeholders})
    `;
    
    const result = await executeQuery(query, Object.values(data));
    return result.insertId;
  },
  
  // INSERT multiple (bulk insert)
  async insertMany(table, dataArray) {
    if (!/^[a-zA-Z0-9_]+$/.test(table)) {
      throw new Error("Nom de table invalide");
    }
    
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      throw new Error("Données invalides pour insertion multiple");
    }
    
    const columns = Object.keys(dataArray[0]);
    const placeholders = dataArray.map(() => 
      `(${columns.map(() => "?").join(", ")})`
    ).join(", ");
    
    const values = dataArray.flatMap(obj => Object.values(obj));
    
    const query = `
      INSERT INTO ${mysql.escapeId(table)}
      (${columns.map(col => mysql.escapeId(col)).join(", ")})
      VALUES ${placeholders}
    `;
    
    const result = await executeQuery(query, values);
    return result.affectedRows;
  },
  
  // UPDATE
  async updateOne(table, data, conditions) {
    if (!/^[a-zA-Z0-9_]+$/.test(table)) {
      throw new Error("Nom de table invalide");
    }
    
    if (Object.keys(data).length === 0) {
      throw new Error("Aucune donnée à mettre à jour");
    }
    
    if (Object.keys(conditions).length === 0) {
      throw new Error("Conditions WHERE requises pour UPDATE (sécurité)");
    }
    
    const setClause = Object.keys(data)
      .map(key => `${mysql.escapeId(key)} = ?`)
      .join(", ");
    
    const whereClause = Object.keys(conditions)
      .map(key => `${mysql.escapeId(key)} = ?`)
      .join(" AND ");
    
    const query = `
      UPDATE ${mysql.escapeId(table)}
      SET ${setClause}
      WHERE ${whereClause}
    `;
    
    const params = [...Object.values(data), ...Object.values(conditions)];
    const result = await executeQuery(query, params);
    return result.affectedRows;
  },
  
  // DELETE
  async deleteOne(table, conditions) {
    if (!/^[a-zA-Z0-9_]+$/.test(table)) {
      throw new Error("Nom de table invalide");
    }
    
    if (Object.keys(conditions).length === 0) {
      throw new Error("Conditions WHERE requises pour DELETE (sécurité)");
    }
    
    const whereClause = Object.keys(conditions)
      .map(key => `${mysql.escapeId(key)} = ?`)
      .join(" AND ");
    
    const query = `DELETE FROM ${mysql.escapeId(table)} WHERE ${whereClause}`;
    const result = await executeQuery(query, Object.values(conditions));
    return result.affectedRows;
  },
  
  // COUNT
  async count(table, conditions = {}) {
    if (!/^[a-zA-Z0-9_]+$/.test(table)) {
      throw new Error("Nom de table invalide");
    }
    
    const whereClause = Object.keys(conditions).length > 0
      ? "WHERE " + Object.keys(conditions).map(key => `${mysql.escapeId(key)} = ?`).join(" AND ")
      : "";
    
    const query = `SELECT COUNT(*) as count FROM ${mysql.escapeId(table)} ${whereClause}`;
    const rows = await executeQuery(query, Object.values(conditions));
    return parseInt(rows[0]?.count || 0);
  },
  
  // EXISTS (vérifier si un enregistrement existe)
  async exists(table, conditions) {
    const count = await this.count(table, conditions);
    return count > 0;
  }
};

// Monitoring de la santé de la base de données
export async function checkDatabaseHealth() {
  try {
    const connection = await db.getConnection();
    const start = Date.now();
    await connection.ping();
    const latency = Date.now() - start;
    connection.release();
    
    const stats = db.pool.config;
    
    return {
      status: "healthy",
      latency: `${latency}ms`,
      connections: {
        active: db.pool._allConnections.length,
        idle: db.pool._freeConnections.length,
        limit: stats.connectionLimit
      }
    };
  } catch (error) {
    return {
      status: "unhealthy",
      error: error.message
    };
  }
}

// Nettoyage propre à la fermeture
export async function closeDatabase() {
  try {
    await db.end();
    logger.info("🔌 Connexion Railway MySQL fermée proprement");
  } catch (error) {
    logger.error("❌ Erreur lors de la fermeture:", error.message);
  }
}

// Fonction pour afficher toutes les tables de la base
export async function showAllTables() {
  try {
    const [rows] = await db.query("SHOW TABLES");
    const tables = rows.map(row => Object.values(row)[0]);
    
    console.log("📋 Tables disponibles dans la base :");
    tables.forEach((table, i) => console.log(`${i + 1}. ${table}`));

    return tables;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des tables :", error.message);
    throw error;
  }
}

// Gestion de la fermeture propre (SIGINT/SIGTERM)
const gracefulShutdown = async (signal) => {
  logger.info(`📡 Signal ${signal} reçu, fermeture propre en cours...`);
  await closeDatabase();
  process.exit(0);
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

// Gestion des erreurs non capturées
process.on("unhandledRejection", (reason, promise) => {
  logger.error("❌ Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  logger.error("❌ Uncaught Exception:", error);
  gracefulShutdown("UNCAUGHT_EXCEPTION");
});

// Export par défaut
export default db;