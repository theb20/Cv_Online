import express from "express";
import {
  getCertifications,
  getCertification,
  addCertification,
  editCertification,
  removeCertification
} from "../controllers/certController.js";

const router = express.Router();

router.get("/cert", getCertifications);
router.get("/cert/:id", getCertification);
router.post("/cert", addCertification);
router.put("/cert/:id", editCertification);
router.delete("/cert/:id", removeCertification);

export default router;
