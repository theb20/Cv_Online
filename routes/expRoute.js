import express from "express";
import {
  getExperiences,
  getExperience,
  addExperience,
  editExperience,
  removeExperience
} from "../controllers/expController.js";

const router = express.Router();

router.get("/exp", getExperiences);        // Lire toutes les expériences
router.get("/exp/:id", getExperience);      // Lire une expérience
router.post("/exp", addExperience);        // Créer une nouvelle expérience
router.put("/exp/:id", editExperience);     // Mettre à jour une expérience
router.delete("/exp/:id", removeExperience); // Supprimer une expérience

export default router;
