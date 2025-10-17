import {
  getAllMessages,
  getMessageById,
  createMessage,
  deleteMessage
} from "../models/messageModel.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const msg = await getMessageById(req.params.id);
    if (!msg) return res.status(404).json({ message: "Message non trouvé" });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const addMessage = async (req, res) => {
  try {
    const newMsg = await createMessage(req.body);
    res.status(201).json(newMsg);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const removeMessage = async (req, res) => {
  try {
    const result = await deleteMessage(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
