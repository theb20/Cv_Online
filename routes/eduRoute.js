import express from "express";
import {
  getEducations,
  getEducation,
  addEducation,
  editEducation,
  removeEducation
} from "../controllers/eduController.js";

const router = express.Router();

router.get("/edu", getEducations);
router.get("/edu/:id", getEducation);
router.post("/edu", addEducation);
router.put("/edu/:id", editEducation);
router.delete("/edu/:id", removeEducation);

export default router;
