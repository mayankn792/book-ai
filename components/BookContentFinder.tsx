"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useBookIndexStore } from "@/stores/bookIndex";

export default function BookContentFinder() {
    const [bookTitle, setBookTitle] = useState("");
    const { setBookIndex } = useBookIndexStore();
    const router = useRouter();

    return (
        <div className="flex flex-row">
            <div className="basis-2/12"></div>
            <div className="basic-8/12 flex flex-col justify-center min-h-screen py-2">
                <h5 className="text-2xl">What do you want us to generate?</h5>
                <br></br>
                <textarea className="appearance-none border-none p-0 font-inherit text-inherit outline-none bg-transparent resize-none" onChange={(event) => setBookTitle(event.target.value)} placeholder="book title goes here ...." />
                <br></br>
                <button className="btn btn-primary" onClick={async () => {
                    console.log("book title", bookTitle);
                    const response = await axios.get("/api/book-index", {
                        params: {
                            bookTitle: bookTitle,
                        },
                    });
                    console.log("response", response);
                    setBookIndex(response.data);
                    router.push('/editor');
                }}>Generate</button>
            </div>
            <div className="basis-2/12"></div>
        </div>

    );
}