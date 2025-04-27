import { GoogleGenAI } from "@google/genai";
import { NextApiRequest } from "next";
import { BOOK_INDEX_SYSTEM_INSTRUCTION } from "../prompts";
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

export async function GET(request: NextApiRequest) {
    if (!request.url) {
        return new Response("Invalid request URL", { status: 400 });
    }
    const url = new URL(request.url);
    const bookTitle = url.searchParams.get("bookTitle");

    if (typeof bookTitle !== "string") {
        return new Response("Invalid book title", { status: 400 });
    }

    const generated = await generateContent(bookTitle);
    return new Response(generated);
}

async function generateContent(bookTitle: string) {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "book title is " + bookTitle,
      config: {
        systemInstruction: BOOK_INDEX_SYSTEM_INSTRUCTION,
      },
    });

    const parsedResponse = response?.text?.replace(/^```json/, "").replace(/```$/, "");
    return parsedResponse;
}