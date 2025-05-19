"use server"

import {generateContent} from "@/app/api/utils";

async function generateContentWrapper(content: string, systemInstruction: string) {
    return generateContent(content, systemInstruction);
}