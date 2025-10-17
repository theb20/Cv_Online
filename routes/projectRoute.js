import express from "express";
import {
  getProjects,
  getProject,
  createProjectController,
  updateProjectController,
  deleteProjectController
} from "../controllers/projectController.js";

const router = express.Router();

// Routes CRUD
router.get("/projects", getProjects);
router.get("/projects/:id", getProject);
router.post("/projects", createProjectController);
router.put("/projects/:id", updateProjectController);
router.delete("/projects/:id", deleteProjectController);

export default router;
