import express from "express";
import {
  createRequestController,
  getAllRequestsController,
  getRequestByIdController,
  updateRequestController,
  deleteRequestController,
} from "../controllers/requestController.js";

const router = express.Router();

// 🔹 Créer une demande de projet
router.post("/request", createRequestController);

// 🔹 Récupérer toutes les demandes de projet
router.get("/request", getAllRequestsController);

// 🔹 Récupérer une demande de projet par ID
router.get("/request/:id", getRequestByIdController);

// 🔹 Modifier une demande de projet
router.put("/request/:id", updateRequestController);

// 🔹 Supprimer une demande de projet
router.delete("/request/:id", deleteRequestController);

export default router;