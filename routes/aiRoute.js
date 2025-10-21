// routes/chatRoutes.js
import express from 'express';
import {
  generateAIResponse,
  getSuggestedQuestions,
  resetConversation,
  getConversationStats,
  testAIConnection,
  setAIProvider,
  clearCache
} from '../services/aiService.js';

const router = express.Router();

// ==========================================
// MIDDLEWARE DE VALIDATION
// ==========================================

const validateMessage = (req, res, next) => {
  const { message } = req.body;
  
  if (!message || typeof message !== 'string') {
    return res.status(400).json({
      error: 'Message invalide',
      details: 'Le message est requis et doit être une chaîne de caractères'
    });
  }

  if (message.trim().length === 0) {
    return res.status(400).json({
      error: 'Message vide',
      details: 'Le message ne peut pas être vide'
    });
  }

  if (message.length > 500) {
    return res.status(400).json({
      error: 'Message trop long',
      details: 'Le message ne peut pas dépasser 500 caractères'
    });
  }

  next();
};

const errorHandler = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error('Route Error:', error);
    res.status(500).json({
      error: 'Erreur serveur',
      message: error.message,
      timestamp: Date.now()
    });
  }
};

// ==========================================
// ROUTES
// ==========================================

/**
 * POST /api/chat
 * Envoyer un message et recevoir une réponse IA
 */
router.post('/chat', validateMessage, errorHandler(async (req, res) => {
  const { message, conversationHistory = [] } = req.body;
  
  const startTime = Date.now();
  const response = await generateAIResponse(message, conversationHistory);
  const responseTime = Date.now() - startTime;

  res.json({
    ...response,
    responseTime,
    conversationId: req.session?.id || 'guest'
  });
}));

/**
 * GET /api/chat/suggestions
 * Obtenir les questions suggérées
 */
router.get('/chat/suggestions', errorHandler(async (req, res) => {
  const suggestions = getSuggestedQuestions();
  
  res.json(suggestions);
}));

/**
 * GET /api/chat/stats
 * Obtenir les statistiques de la conversation
 */
router.get('/chat/stats', errorHandler(async (req, res) => {
  const stats = getConversationStats();
  
  res.json({
    ...stats,
    timestamp: Date.now()
  });
}));

/**
 * POST /api/chat/reset
 * Réinitialiser la conversation
 */
router.post('/chat/reset', errorHandler(async (req, res) => {
  resetConversation();
  
  res.json({
    success: true,
    message: 'Conversation réinitialisée',
    timestamp: Date.now()
  });
}));

/**
 * GET /api/chat/test
 * Tester la connexion à l'IA
 */
router.get('/chat/test', errorHandler(async (req, res) => {
  const result = await testAIConnection();
  
  res.json({
    ...result,
    timestamp: Date.now()
  });
}));

/**
 * POST /api/chat/provider
 * Changer le provider IA
 */
router.post('/chat/provider', errorHandler(async (req, res) => {
  const { provider } = req.body;
  
  if (!provider) {
    return res.status(400).json({
      error: 'Provider requis',
      availableProviders: ['groq', 'huggingface', 'openrouter', 'cohere']
    });
  }
  
  const success = setAIProvider(provider);
  
  if (success) {
    res.json({
      success: true,
      provider,
      message: `Provider changé vers ${provider}`
    });
  } else {
    res.status(400).json({
      success: false,
      error: 'Provider invalide',
      availableProviders: ['groq', 'huggingface', 'openrouter', 'cohere']
    });
  }
}));

/**
 * DELETE /api/chat/cache
 * Vider le cache
 */
router.delete('/chat/cache', errorHandler(async (req, res) => {
  clearCache();
  
  res.json({
    success: true,
    message: 'Cache vidé',
    timestamp: Date.now()
  });
}));

/**
 * GET /api/chat/health
 * Health check
 */
router.get('/chat/health', errorHandler(async (req, res) => {
  const stats = getConversationStats();
  
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    stats,
    timestamp: Date.now()
  });
}));

export default router;