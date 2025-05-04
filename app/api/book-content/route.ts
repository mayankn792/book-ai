import { NextApiRequest } from "next";
import { BOOK_CONTENT_SYSTEM_INSTRUCTION } from "../prompts";
import { generateContent } from "@/app/api/utils";

export async function GET(request: NextApiRequest) {
    if (!request.url) {
        return new Response("Invalid request URL", { status: 400 });
    }
    const url = new URL(request.url);
    const bookTitle = url.searchParams.get("bookTitle");
    const bookTopic = url.searchParams.get("bookTopic");
    const bookSubTopic = url.searchParams.get("bookSubTopic");

    if (typeof bookTitle !== "string" || typeof bookTopic !== "string" || typeof bookSubTopic !== "string") {
        return new Response("Invalid book title or topic or subtopic", { status: 400 });
    }

    const contents = "book title - " + + " book topic - " + bookTopic + " book sub-topic - " + bookSubTopic;
    const generatedResponse = await generateContent(contents, BOOK_CONTENT_SYSTEM_INSTRUCTION);
    return new Response(generatedResponse.text);
}