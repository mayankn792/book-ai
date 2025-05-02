"use client";

import axios from "axios";
import { useBookIndexStore } from "@/stores/bookIndex";
import { useBookStore, BookTopic } from "@/stores/book";
import { useState } from "react";

interface TitleProp {
    title: string | null,
}

export default function BookIndex({ title }: TitleProp) {
    const { bookIndex } = useBookIndexStore();
    const { addBookTopic, addBookSubTopic } = useBookStore();
    const [bookContent, setBookContent] = useState("");
    return <div>
        {
           bookIndex.map((item: { topic: string; subtopics: string[] }) => (
             <div key={item.topic}>
               <h1>topic - {item.topic}</h1>
                {
                    const bookTopic: BookTopic = {

                    }
                 addBookTopic(title, item.topic)
                }
               <ul>
                 {item.subtopics.map((subtopic: string) => (
                   <li key={subtopic}>
                   {subtopic}
                   <button onClick={async () => {
                     const contentResponse = await axios.get("/api/book-content", {
                     params: {
                    //    bookTitle: bookTitle,
                       bookTopic: item.topic,
                       bookSubTopic: subtopic,
                     },
                     });
                     console.log("contentResponse", contentResponse.data);
                     setBookContent(contentResponse.data);
                   }}>
                     Get Content
                   </button>
                   </li>
                 ))}
               </ul>
             </div>
           ))
         }
        {JSON.stringify(bookContent)}
    </div>
}