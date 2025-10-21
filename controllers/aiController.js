import { generateAIResponse } from "../services/aiService.js";

export async function chatWithAI(req, res) {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Le message est requis." });
    }

    const reply = await generateAIResponse(message, context || "");
    res.json({ reply });
  } catch (error) {
    console.error("Erreur chatWithAI:", error);
    res.status(500).json({ error: "Impossible de générer la réponse." });
  }
}
