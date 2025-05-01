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
            <div className="basic-8/12 flex flex-col justify-center min-h-screen py-2 antialiased">
                <h5 className="text-2xl">What do you want us to generate?</h5>
                
                <div className="bg-white p-5 text-blue-600">
                <textarea rows={4} cols={50} className="appearance-none border-none p-0 font-inherit text-inherit outline-none bg-transparent resize-none" onChange={(event) => setBookTitle(event.target.value)} placeholder="book title goes here ...." />
                </div>
                
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