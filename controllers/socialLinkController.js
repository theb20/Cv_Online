import {
  getAllLinks,
  getLinkById,
  createLink,
  updateLink,
  deleteLink
} from "../models/socialLinkModel.js";

export const getLinks = async (req, res) => {
  try {
    const links = await getAllLinks();
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getLink = async (req, res) => {
  try {
    const link = await getLinkById(req.params.id);
    if (!link) return res.status(404).json({ message: "Lien non trouvé" });
    res.json(link);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const addLink = async (req, res) => {
  try {
    const newLink = await createLink(req.body);
    res.status(201).json(newLink);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const editLink = async (req, res) => {
  try {
    const updated = await updateLink(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const removeLink = async (req, res) => {
  try {
    const result = await deleteLink(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
