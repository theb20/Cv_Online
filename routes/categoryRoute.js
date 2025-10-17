import express from "express";
import {
  getCategories,
  getCategory,
  addCategory,
  editCategory,
  removeCategory
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/cat", getCategories);
router.get("/cat/:id", getCategory);
router.post("/cat", addCategory);
router.put("/cat/:id", editCategory);
router.delete("/cat/:id", removeCategory);

export default router;
