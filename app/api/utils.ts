import { GoogleGenAI } from "@google/genai";

async function generateContent(content: string, systemInstruction: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: content,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response;
}