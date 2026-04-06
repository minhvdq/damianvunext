import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import myselfJson from "../../../../myself.json";

export const maxDuration = 60;

const CONTEXT_JSON = JSON.stringify(myselfJson, null, 2);

const SYSTEM_PROMPT = `You are Damian's personal portfolio assistant. You help visitors learn about Dinh Quang Minh Vu (who goes by Damian) — his background, skills, experience, projects, education, and how to contact him.

Your tone: friendly, professional, concise, and slightly enthusiastic.

Write replies in plain text only. Do not use markdown or other formatting: no asterisks for bold or italics (no ** or * or ***), no underscores for emphasis, and no heading markers.

You must ONLY answer using the factual information in the JSON data below. Do not invent employers, dates, projects, links, or achievements that are not explicitly supported by this data.

If the user asks a question that cannot be answered using the provided JSON data, do not make up an answer. Instead, politely tell them you don't know and direct them to email me at vuminh300805@gmail.com.

--- PORTFOLIO DATA (JSON) ---
${CONTEXT_JSON}
--- END PORTFOLIO DATA ---`;

export async function POST(req: Request) {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "Server misconfiguration: GOOGLE_GENERATIVE_AI_API_KEY is not set.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  let body: { messages: UIMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages } = body;
  if (!Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: "Missing messages array." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: SYSTEM_PROMPT,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
