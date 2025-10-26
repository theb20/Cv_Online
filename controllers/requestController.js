import {
  createRequest,
  findAllRequests,
  findRequestById,
  updateRequest,
  deleteRequest,
} from '../models/request.js';
import sendCollaborationNotification from '../services/mail.js';
import fs from 'fs';
import path from 'path';


export const createRequestController = async (req, res) => {
  try {
    const data = req.body;
    const request = await createRequest(data);
    await sendCollaborationNotification(request.email, request.description);

      // Condition : si budget = "0", renvoyer le PDF
    if (request.budget === '0' || Number(request.budget) === 0) {
      const pdfPath = path.resolve('files/secure.pdf'); // place ton secure.pdf dans backend/files

      if (fs.existsSync(pdfPath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="secure.pdf"');
        const fileStream = fs.createReadStream(pdfPath);
        fileStream.pipe(res);
        return; // stop pour ne pas envoyer JSON après
      } else {
        return res.status(404).json({ error: 'Fichier PDF introuvable.' });
      }
    }

    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getAllRequestsController = async (req, res) => {
  try {
    const requests = await findAllRequests();
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getRequestByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await findRequestById(id);
    if (request) {
      res.status(200).json(request);
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const updateRequestController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const request = await updateRequest(id, data);
    if (request) {
      res.status(200).json(request);
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const deleteRequestController = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await deleteRequest(id);
    if (request) {
      res.status(200).json(request);
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
