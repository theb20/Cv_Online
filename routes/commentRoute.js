import express from "express";
import {
  getComments,
  getComment,
  addComment,
  editComment,
  removeComment
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/comment", getComments);
router.get("/comment/:id", getComment);
router.post("/comment", addComment);
router.put("/comment/:id", editComment);
router.delete("/comment/:id", removeComment);

export default router;
