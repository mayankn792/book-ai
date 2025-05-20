"use server"

import {generateContent} from "@/app/api/utils";

export async function generateContentWrapper(content: string, systemInstruction: string) {
    const response = await generateContent(content, systemInstruction);
    return response?.text?.replace(/^```json/, "").replace(/```$/, "");
}