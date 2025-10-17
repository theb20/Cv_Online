import express from "express";
import {
  getMessages,
  getMessage,
  addMessage,
  removeMessage
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/message", getMessages);
router.get("/message/:id", getMessage);
router.post("/message", addMessage);
router.delete("/message/:id", removeMessage);

export default router;
