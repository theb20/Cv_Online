import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from "../models/categoryModel.js";

export const getCategories = async (req, res) => {
  try {
    res.json(await getAllCategories());
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ message: "Catégorie non trouvée" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const addCategory = async (req, res) => {
  try {
    res.status(201).json(await createCategory(req.body));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const editCategory = async (req, res) => {
  try {
    res.json(await updateCategory(req.params.id, req.body));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const removeCategory = async (req, res) => {
  try {
    res.json(await deleteCategory(req.params.id));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
