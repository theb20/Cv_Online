import express from "express";
import { getLikes, addLike, removeLike } from "../controllers/likeController.js";

const router = express.Router();

router.get("/like/:comment_id", getLikes);
router.post("/like/", addLike);
router.delete("/like/:id", removeLike);

export default router;
