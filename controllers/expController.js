import {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
} from "../models/expModel.js";

export const getExperiences = async (req, res) => {
  try {
    const experiences = await getAllExperiences();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExperience = async (req, res) => {
  try {
    const experience = await getExperienceById(req.params.id);
    if (!experience) return res.status(404).json({ message: "Expérience non trouvée" });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addExperience = async (req, res) => {
  try {
    const newExp = await createExperience(req.body);
    res.status(201).json(newExp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editExperience = async (req, res) => {
  try {
    const updatedExp = await updateExperience(req.params.id, req.body);
    res.json(updatedExp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeExperience = async (req, res) => {
  try {
    const result = await deleteExperience(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
