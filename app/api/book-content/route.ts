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

    if (typeof bookTitle !== "string" || typeof bookTopic !== "string") {
        return new Response("Invalid book title or topic or subtopic", { status: 400 });
    }

    console.log(bookTitle, bookSubTopic, bookSubTopic)

    const bookSubTopicContent = bookSubTopic ? " book sub-topic" + bookSubTopic?.replace("NaN", "") : "";
    const contents = "book title - " + bookTitle?.replace("NaN", "") + " book topic - " + bookTopic?.replace("NaN", "") + bookSubTopicContent;
    const generatedResponse = await generateContent(contents, BOOK_CONTENT_SYSTEM_INSTRUCTION);
    return new Response(generatedResponse.text);
}