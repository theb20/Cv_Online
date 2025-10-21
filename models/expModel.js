import db from "../config/db.js";

/**
 * Récupère toutes les expériences triées par date de début (plus récente en premier)
 */
export const getAllExperiences = async () => {
  const [rows] = await db.query(`
    SELECT
      id,
      company,
      position,
      DATE_FORMAT(start_date, '%b %Y') AS start_date_formatted,
      DATE_FORMAT(end_date, '%b %Y') AS end_date_formatted,
      description,
      country
    FROM experiences
    ORDER BY
      COALESCE(end_date, '9999-12-31') DESC,
      start_date DESC,
      id DESC
  `);

  return rows.map(exp => ({
    ...exp,
    // Si end_date est NULL, on peut afficher "En cours" pour le CV
    end_date_formatted: exp.end_date_formatted || "En cours"
  }));
};

/**
 * Récupère une expérience par son ID
 */
export const getExperienceById = async (id) => {
  const [rows] = await db.query("SELECT * FROM experiences WHERE id = ?", [id]);
  return rows[0];
};

/**
 * Crée une nouvelle expérience
 */
export const createExperience = async (experience) => {
  const { company, position, start_date, end_date, description, country } = experience;
  const [result] = await db.query(
    "INSERT INTO experiences (company, position, start_date, end_date, description, country) VALUES (?, ?, ?, ?, ?, ?)",
    [company, position, start_date, end_date, description, country]
  );
  return { id: result.insertId, ...experience };
};

/**
 * Met à jour une expérience (avec possibilité de modifier l'ID)
 * @param {number} oldId - L'ID actuel de l'expérience
 * @param {object} experience - Les nouvelles données (peut contenir un nouvel ID)
 */
export const updateExperience = async (oldId, experience) => {
  const { 
    id: newId, 
    company, 
    position, 
    start_date, 
    end_date, 
    description, 
    country 
  } = experience;

  try {
    // Si un nouvel ID est fourni et différent de l'ancien
    if (newId && newId !== oldId) {
      // Vérifier que le nouvel ID n'existe pas déjà
      const [existing] = await db.query(
        "SELECT id FROM experiences WHERE id = ? AND id != ?", 
        [newId, oldId]
      );
      
      if (existing.length > 0) {
        throw new Error(`Une expérience avec l'ID ${newId} existe déjà`);
      }
      
      // Vérifier que l'ancienne expérience existe
      const [oldExp] = await db.query("SELECT * FROM experiences WHERE id = ?", [oldId]);
      
      if (oldExp.length === 0) {
        throw new Error(`Expérience avec l'ID ${oldId} non trouvée`);
      }
      
      // Mettre à jour avec le nouvel ID
      const [result] = await db.query(
        "UPDATE experiences SET id = ?, company = ?, position = ?, start_date = ?, end_date = ?, description = ?, country = ? WHERE id = ?",
        [newId, company, position, start_date, end_date, description, country, oldId]
      );
      
      if (result.affectedRows === 0) {
        throw new Error(`Échec de la mise à jour de l'expérience ${oldId}`);
      }
      
      return { 
        id: newId, 
        company, 
        position, 
        start_date, 
        end_date, 
        description, 
        country 
      };
    }
    
    // Sinon, mise à jour normale sans changer l'ID
    const [result] = await db.query(
      "UPDATE experiences SET company = ?, position = ?, start_date = ?, end_date = ?, description = ?, country = ? WHERE id = ?",
      [company, position, start_date, end_date, description, country, oldId]
    );
    
    if (result.affectedRows === 0) {
      throw new Error(`Expérience avec l'ID ${oldId} non trouvée`);
    }
    
    return { 
      id: oldId, 
      company, 
      position, 
      start_date, 
      end_date, 
      description, 
      country 
    };
    
  } catch (error) {
    // Gérer les erreurs MySQL spécifiques
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error(`L'ID ${newId} existe déjà dans la base de données`);
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      throw new Error('Violation de contrainte de clé étrangère');
    }
    throw error;
  }
};

/**
 * Supprime une expérience
 */
export const deleteExperience = async (id) => {
  const [result] = await db.query("DELETE FROM experiences WHERE id = ?", [id]);
  
  if (result.affectedRows === 0) {
    throw new Error(`Expérience avec l'ID ${id} non trouvée`);
  }
  
  return { message: "Expérience supprimée avec succès", id };
};

/**
 * Réorganise l'ordre des expériences (si vous ajoutez un champ display_order)
 * Alternative recommandée au lieu de modifier les IDs
 */
export const reorderExperiences = async (orderUpdates) => {
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();
    
    for (const { id, order } of orderUpdates) {
      await connection.query(
        "UPDATE experiences SET display_order = ? WHERE id = ?", 
        [order, id]
      );
    }
    
    await connection.commit();
    return { message: "Ordre mis à jour avec succès" };
    
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Récupère les expériences d'un utilisateur spécifique (si vous avez un champ user_id)
 */
export const getExperiencesByUserId = async (userId) => {
  const [rows] = await db.query(
    "SELECT * FROM experiences WHERE user_id = ? ORDER BY start_date DESC", 
    [userId]
  );
  return rows;
};