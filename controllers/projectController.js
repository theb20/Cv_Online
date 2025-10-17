import * as Project from "../models/projectModel.js";

// GET all
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.getAllProjects();
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération des projets." });
  }
};

// GET by ID
export const getProject = async (req, res) => {
  try {
    const project = await Project.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ message: "Projet non trouvé." });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération du projet." });
  }
};

// POST
export const createProjectController = async (req, res) => {
  try {
    const project = await Project.createProject(req.body);
    res.status(201).json({ message: "Projet créé avec succès.", project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création du projet." });
  }
};

// PUT
export const updateProjectController = async (req, res) => {
  try {
    const project = await Project.updateProject(req.params.id, req.body);
    if (!project) return res.status(404).json({ message: "Projet non trouvé." });
    res.json({ message: "Projet mis à jour.", project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la mise à jour du projet." });
  }
};

// DELETE
export const deleteProjectController = async (req, res) => {
  try {
    const success = await Project.deleteProject(req.params.id);
    if (!success) return res.status(404).json({ message: "Projet non trouvé." });
    res.json({ message: "Projet supprimé avec succès." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la suppression du projet." });
  }
};
