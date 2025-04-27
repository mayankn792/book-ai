import { NextApiRequest } from "next";
import { generateContent } from "@/app/api/utils";
import { BOOK_INDEX_SYSTEM_INSTRUCTION } from "../prompts";

export async function GET(request: NextApiRequest) {
    if (!request.url) {
        return new Response("Invalid request URL", { status: 400 });
    }
    const url = new URL(request.url);
    const bookTitle = url.searchParams.get("bookTitle");

    if (typeof bookTitle !== "string") {
        return new Response("Invalid book title", { status: 400 });
    }

    const contents = "book title - " + bookTitle
    const generatedResponse = await generateContent(contents, BOOK_INDEX_SYSTEM_INSTRUCTION);
    return new Response(generatedResponse?.text?.replace(/^```json/, "").replace(/```$/, ""));
}