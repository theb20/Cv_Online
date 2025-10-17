import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAIResponse(message, context = "") {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Tu es un assistant utile qui aide les utilisateurs à en savoir plus sur leur profil, leurs expériences et leurs formations." },
        { role: "user", content: context + "\nQuestion: " + message },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Erreur IA:", error);
    return "Désolé, je n’ai pas pu répondre pour le moment.";
  }
}
