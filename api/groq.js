import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");

  const stream = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    max_tokens: 400,
    temperature: 0.2,
    messages: req.body.messages,
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content || "";
    if (delta) res.write(`data: ${JSON.stringify({ delta })}\n\n`);
  }

  res.write("data: [DONE]\n\n");
  res.end();
}
