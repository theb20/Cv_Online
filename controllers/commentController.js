import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
} from "../models/commentModel.js";

export const getComments = async (req, res) => {
  try {
    res.json(await getAllComments());
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getComment = async (req, res) => {
  try {
    const comment = await getCommentById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Commentaire non trouvé" });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const addComment = async (req, res) => {
  try {
    res.status(201).json(await createComment(req.body));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const editComment = async (req, res) => {
  try {
    res.json(await updateComment(req.params.id, req.body));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const removeComment = async (req, res) => {
  try {
    res.json(await deleteComment(req.params.id));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
