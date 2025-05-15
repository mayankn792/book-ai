import { NextApiRequest } from "next";
import { generateContent } from "@/app/api/utils";
import { BOOK_INDEX_SYSTEM_INSTRUCTION } from "../prompts";

export async function GET(request: NextApiRequest) {
    if (!request.url) {
        return new Response("Invalid request URL", { status: 400 });
    }
    const url = new URL(request.url);
    let bookTitle : string = url.searchParams.get("bookTitle") || "";

    if (typeof bookTitle !== "string") {
        return new Response("Invalid book title", { status: 400 });
    }

    const contents = "book title - " + bookTitle.replace("NaN", ""); //TODO - quick fix
    const generatedResponse = await generateContent(contents, BOOK_INDEX_SYSTEM_INSTRUCTION);
    return new Response(generatedResponse?.text?.replace(/^```json/, "").replace(/```$/, ""));
}