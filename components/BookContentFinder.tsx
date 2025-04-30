"use client";
import { useBookIndexStore } from "@/stores/bookIndex";

export default function BookContentFinder() {
    const { bookIndex } = useBookIndexStore();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl">book-ai</h1>
            <h5 className="text-md text-gray-600">Get a book content</h5>
            <br></br>
            <input type="text" placeholder="book title goes here ...." />
            <br></br>
            <button>get index</button>
            { JSON.stringify(bookIndex) }
        </div>
    );
}