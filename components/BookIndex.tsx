"use client";

import axios from "axios";
import { useBookIndexStore } from "@/stores/bookIndex";
import { useBookStore, BookTopic, BookSubTopic } from "@/stores/book";
import { useContextStore } from "@/stores/context";
import { useState } from "react";

interface TitleProp {
  title: string | null,
}

export default function BookIndex({ title }: TitleProp) {
  const { bookIndex } = useBookIndexStore();
  const { books, addBookTopic, addBookSubTopic } = useBookStore();
  const { bookContext, setGlobalBookTopic, setGlobalBookSubTopic, setGlobalContent } = useContextStore();
  const [bookContent, setBookContent] = useState("");
  console.log(bookIndex);
  console.log("-----books------");
  console.log(books);
  const book = books.find((book) => book.title === bookContext.bookTitle);

  return <div>
    {
      book && book.bookTopic.map((item: BookTopic) => (
        <div key={item.topic}>
          <h1>topic - {item.topic}</h1>
          <ul>
            {item.subtopics.map((subtopic: BookSubTopic) => (
              <li key={subtopic.subtopic}>
                {subtopic.subtopic}
                <button onClick={async () => {
                  const contentResponse = await axios.get("/api/book-content", {
                    params: {
                      //    bookTitle: bookTitle,
                      bookTopic: item.topic,
                      bookSubTopic: subtopic.subtopic,
                    },
                  });

                  console.log("contentResponse", contentResponse.data);
                  setBookContent(contentResponse.data);

                  setGlobalBookTopic(item.topic)
                  setGlobalBookSubTopic(subtopic.subtopic)
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