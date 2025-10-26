import {
  createRequest,
  findAllRequests,
  findRequestById,
  updateRequest,
  deleteRequest,
} from '../models/request.js';
import sendCollaborationNotification from '../services/mail.js';



export const createRequestController = async (req, res) => {
  try {
    const data = req.body;
    const request = await createRequest(data);
    await sendCollaborationNotification(request.email, request.description);
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
