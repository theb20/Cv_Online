const { setGlobalOptions } = require("firebase-functions");
const { onRequest }        = require("firebase-functions/https");
const { defineSecret }     = require("firebase-functions/params");
const Groq                 = require("groq-sdk");

setGlobalOptions({ maxInstances: 10 });

const GROQ_API_KEY = defineSecret("GROQ_API_KEY");

exports.groqChat = onRequest(
  { cors: true, timeoutSeconds: 60, secrets: [GROQ_API_KEY] },
  async (req, res) => {
    if (req.method !== "POST") return res.status(405).end();

    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Missing messages" });
    }

    const client = new Groq({ apiKey: GROQ_API_KEY.value() });

    // Streaming SSE
    res.setHeader("Content-Type",  "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection",    "keep-alive");

    try {
      const stream = await client.chat.completions.create({
        model:       "llama-3.3-70b-versatile",
        max_tokens:  400,
        temperature: 0.2,
        messages,
        stream:      true,
      });

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content || "";
        if (delta) {
          res.write(`data: ${JSON.stringify({ delta })}\n\n`);
        }
      }
    } catch (err) {
      res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    }

    res.write("data: [DONE]\n\n");
    res.end();
  }
);
