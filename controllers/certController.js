import {
  getAllCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification
} from "../models/certModel.js";

export const getCertifications = async (req, res) => {
  try {
    const data = await getAllCertifications();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getCertification = async (req, res) => {
  try {
    const cert = await getCertificationById(req.params.id);
    if (!cert) return res.status(404).json({ message: "Certification non trouvée" });
    res.json(cert);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const addCertification = async (req, res) => {
  try {
    const newCert = await createCertification(req.body);
    res.status(201).json(newCert);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const editCertification = async (req, res) => {
  try {
    const updated = await updateCertification(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const removeCertification = async (req, res) => {
  try {
    const result = await deleteCertification(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
