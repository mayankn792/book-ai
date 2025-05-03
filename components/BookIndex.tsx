"use client";

import axios from "axios";
import { useBookIndexStore } from "@/stores/bookIndex";
import { useBookStore, BookTopic } from "@/stores/book";
import { Context, useContextStore } from "@/stores/context";
import { useState } from "react";

interface TitleProp {
    title: string | null,
}

export default function BookIndex({ title }: TitleProp) {
    const { bookIndex } = useBookIndexStore();
    const { books, addBookTopic, addBookSubTopic } = useBookStore();
    const { setGlobalBookTopic, setGlobalBookSubTopic, setGlobalContent } = useContextStore();
    const [bookContent, setBookContent] = useState("");
    console.log(bookIndex);
    console.log("-----books------");
    console.log(books);
    return <div>
        {
           bookIndex.map((item: { topic: string; subtopics: string[] }) => (
             <div key={item.topic}>
               <h1>topic - {item.topic}</h1>
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

                     setGlobalBookTopic(item.topic)
                     setGlobalBookSubTopic(subtopic)
                     setGlobalContent(contentResponse.data)
                   }}>
                     Get Content
                   </button>
                   </li>
                 ))}
               </ul>
             </div>
           ))
         }
    </div>
}