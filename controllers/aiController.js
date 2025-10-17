import { generateAIResponse } from "../services/aiService.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Le message est requis." });
    }

    const aiResponse = await generateAIResponse(message, context);
    res.status(200).json({ response: aiResponse });

  } catch (error) {
    console.error("Erreur chat:", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
};
