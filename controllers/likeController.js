import { getLikesByComment, createLike, deleteLike } from "../models/likeModel.js";

export const getLikes = async (req, res) => {
  try {
    res.json(await getLikesByComment(req.params.comment_id));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const addLike = async (req, res) => {
  try {
    res.status(201).json(await createLike(req.body));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const removeLike = async (req, res) => {
  try {
    res.json(await deleteLike(req.params.id));
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
