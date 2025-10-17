import express from "express";
import {
  getLinks,
  getLink,
  addLink,
  editLink,
  removeLink
} from "../controllers/socialLinkController.js";

const router = express.Router();

router.get("/social-links", getLinks);
router.get("/social-links/:id", getLink);
router.post("/social-links", addLink);
router.put("/social-links/:id", editLink);
router.delete("/social-links/:id", removeLink);

export default router;
