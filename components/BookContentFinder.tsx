"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useBookIndexStore } from "@/stores/bookIndex";
import { useBookStore, Book, BookSubTopic } from "@/stores/book";
import { Context, useContextStore } from "@/stores/context"
//TODO - change the name of this component
export default function BookContentFinder() {
    const [bookTitle, setBookTitle] = useState("");
    const { setBookIndex } = useBookIndexStore();
    const { books, addBook, addBookTopic, addBookSubTopic } = useBookStore();
    const { setGlobalBookTitle } = useContextStore();
    const router = useRouter();

    return (
        <div className="flex flex-row">
            <div className="basis-2/12"></div>
            <div className="basic-8/12 flex flex-col justify-center min-h-screen py-2 antialiased">
                <h5 className="text-2xl">What do you want to generate?</h5>
                <br></br>
                <div className="bg-white p-5 text-blue-600 rounded-sm">
                    <textarea rows={4} cols={50} className="appearance-none border-none p-0 font-inherit text-inherit outline-none bg-transparent resize-none" onChange={(event) => setBookTitle(event.target.value)} placeholder="book title goes here ...." />
                    <div className="flex flex-row-reverse">
                        <button className="btn btn-primary" onClick={async () => {
                            console.log("book title", bookTitle);
                            const book: Book = {
                                title: bookTitle,
                                bookTopic: []
                            }
                            addBook(book);
                            setGlobalBookTitle(bookTitle); // add title to global context
                            const response = await axios.get("/api/book-index", {
                                params: {
                                    bookTitle: bookTitle,
                                },
                            });

                            console.log("response", response);
                            setBookIndex(response.data);
                            response.data.map((item : { topic: string, subtopics: string[] }) => {
                                console.log(item.topic, item.subtopics);
                                const bookTopic = {
                                    topic: item.topic,
                                    subtopics: [],
                                }
                                addBookTopic(bookTitle, bookTopic)
                                item.subtopics.map((subtopic: string) => {
                                    const bookSubTopic = {
                                        subtopic: subtopic,
                                        content: "",
                                    }
                                    addBookSubTopic(bookTitle, item.topic, bookSubTopic);
                                })
                            })
                            
                            console.log("logging book here...")
                            console.log(books)
                            router.push(`/editor?bookTitle=${encodeURIComponent(bookTitle)}`);
                        }}>Generate</button>
                    </div>
                </div>
            </div>
            <div className="basis-2/12"></div>
        </div>
    );
}