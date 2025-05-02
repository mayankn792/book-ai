"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useBookIndexStore } from "@/stores/bookIndex";
import { useBookStore, Book } from "@/stores/book";

export default function BookContentFinder() {
    const [bookTitle, setBookTitle] = useState("");
    const { setBookIndex } = useBookIndexStore();
    const { addBook } = useBookStore();
    const router = useRouter();

    return (
        <div className="flex flex-row">
            <div className="basis-2/12"></div>
            <div className="basic-8/12 flex flex-col justify-center min-h-screen py-2 antialiased">
                <h5 className="text-2xl">What do you want us to generate?</h5>
                <br></br>
                <div className="bg-white p-5 text-blue-600 rounded-sm">
                    <textarea rows={4} cols={50} className="appearance-none border-none p-0 font-inherit text-inherit outline-none bg-transparent resize-none" onChange={(event) => setBookTitle(event.target.value)} placeholder="book title goes here ...." />
                    <div className="flex flex-row-reverse">
                        <button className="btn btn-primary" onClick={async () => {
                            console.log("book title", bookTitle);
                            const book: Book = {
                                title: bookTitle,
                            }
                            addBook(book);

                            const response = await axios.get("/api/book-index", {
                                params: {
                                    bookTitle: bookTitle,
                                },
                            });

                            console.log("response", response);
                            setBookIndex(response.data);
                            
                            router.push(`/editor?bookTitle=${encodeURIComponent(bookTitle)}`);
                        }}>Generate</button>
                    </div>
                </div>


            </div>
            <div className="basis-2/12"></div>
        </div>

    );
}