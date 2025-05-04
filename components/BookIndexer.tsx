"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useBookStore, Book } from "@/stores/book";
import { useGlobalContextStore } from "@/stores/context"

export default function BookIndexer() {
    const [bookTitle, setBookTitle] = useState("");
    const { addBook, addBookTopic, addBookSubTopic } = useBookStore();
    const { setGlobalBookTitle } = useGlobalContextStore();
    const router = useRouter();

    return (
        <div className="flex flex-row">
            <div className="basis-3/12"></div>
            <div className="basic-6/12 flex flex-col justify-center min-h-screen py-2 antialiased">
                <h5 className="text-2xl">What do you want to generate?</h5>
                <br></br>
                <div className="bg-white p-5 text-blue-600 rounded-sm">
                    <textarea rows={4} cols={50} className="appearance-none border-none p-0 font-inherit text-inherit outline-none bg-transparent resize-none" onChange={(event) => setBookTitle(event.target.value)} placeholder="book title goes here ...." />
                    <div className="flex flex-row-reverse">
                        <button className="btn btn-primary" onClick={async () => {

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
                            
                            router.push('/editor');
                        }}>Generate</button>
                    </div>
                </div>
            </div>
            <div className="basis-3/12"></div>
        </div>
    );
}