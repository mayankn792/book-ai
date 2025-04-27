import { GoogleGenAI } from "@google/genai";
import { NextApiRequest } from "next";
import { BOOK_CONTENT_SYSTEM_INSTRUCTION } from "../prompts";
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

export async function GET(request: NextApiRequest) {
    console.log("request - inside book content", request);
    if (!request.url) {
        return new Response("Invalid request URL", { status: 400 });
    }
    const url = new URL(request.url);
    const bookTitle = url.searchParams.get("bookTitle");
    const bookTopic = url.searchParams.get("bookTopic");
    const bookSubTopic = url.searchParams.get("bookSubTopic");

    if (typeof bookTitle !== "string" || typeof bookTopic !== "string" || typeof bookSubTopic !== "string") {
        return new Response("Invalid book title", { status: 400 });
    }

    const generatedResponse = await generateContent(bookTitle, bookTopic, bookSubTopic);
    return new Response(generatedResponse);
}

async function generateContent(bookTitle: string, bookTopic: string, bookSubTopic: string) {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "book title - " + bookTitle + " book topic - " + bookTopic + " book sub-topic - " + bookSubTopic,
      config: {
        systemInstruction: BOOK_CONTENT_SYSTEM_INSTRUCTION,
      },
    });

    const parsedResponse = response?.text?.replace(/^```json/, "").replace(/```$/, "");
    return parsedResponse;
}