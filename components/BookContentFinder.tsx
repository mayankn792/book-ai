"use client";

import { useState } from "react";
import axios from "axios";

import { useBookIndexStore } from "@/stores/bookIndex";


export default function BookContentFinder() {
    const [bookTitle, setBookTitle] = useState("");
    const [response, setResponse] = useState([]);
    const { bookIndex, setBookIndex } = useBookIndexStore();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl">book-ai</h1>
            <h5 className="text-md text-gray-600">Get a book content</h5>
            <br></br>
            <input type="text" onChange={(event) => setBookTitle(event.target.value)} placeholder="book title goes here ...." />
            <br></br>
            <button onClick={async () => {
                console.log("book title", bookTitle);
                const response = await axios.get("/api/book-index", {
                    params: {
                        bookTitle: bookTitle,
                    },
                });
                console.log("response", response);
                setBookIndex(response.data);
                setResponse(response.data);
            }}>get index</button>
            {JSON.stringify(bookIndex)}
        </div>
    );
}