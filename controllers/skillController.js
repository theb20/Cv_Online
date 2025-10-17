import {
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} from "../models/skillModel.js";

export const getSkills = async (req, res) => {
  try {
    res.json(await getAllSkills());
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getSkill = async (req, res) => {
  try {
    const skill = await getSkillById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Compétence non trouvée" });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const addSkill = async (req, res) => {
  try {
    res.status(201).json(await createSkill(req.body));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const editSkill = async (req, res) => {
  try {
    res.json(await updateSkill(req.params.id, req.body));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const removeSkill = async (req, res) => {
  try {
    res.json(await deleteSkill(req.params.id));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
