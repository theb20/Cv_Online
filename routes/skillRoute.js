import express from "express";
import {
  getSkills,
  getSkill,
  addSkill,
  editSkill,
  removeSkill
} from "../controllers/skillController.js";

const router = express.Router();

router.get("/skills", getSkills);
router.get("/skills/:id", getSkill);
router.post("/skills", addSkill);
router.put("/skills/:id", editSkill);
router.delete("/skills/:id", removeSkill);

export default router;
