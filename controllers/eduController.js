import {
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../models/eduModel.js";

// 🔹 Récupérer toutes les formations
export const getEducations = async (req, res) => {
  try {
    const educations = await getAllEducation();
    res.json(educations);
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 🔹 Récupérer une formation par ID
export const getEducation = async (req, res) => {
  try {
    const education = await getEducationById(req.params.id);
    if (!education) return res.status(404).json({ message: "Formation non trouvée" });
    res.json(education);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 🔹 Ajouter une formation
export const addEducation = async (req, res) => {
  try {
    const newEducation = await createEducation(req.body);
    res.status(201).json(newEducation);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 🔹 Modifier une formation
export const editEducation = async (req, res) => {
  try {
    const updatedEducation = await updateEducation(req.params.id, req.body);
    res.json(updatedEducation);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// 🔹 Supprimer une formation
export const removeEducation = async (req, res) => {
  try {
    const response = await deleteEducation(req.params.id);
    res.json(response);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
