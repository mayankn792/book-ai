"use client";

import axios from "axios";
import { useBookStore, BookTopic, BookSubTopic } from "@/stores/book";
import { useGlobalContextStore } from "@/stores/context";

export default function BookIndex() {
  const { books } = useBookStore();
  const { bookContext, setGlobalBookTopic, setGlobalBookSubTopic, setGlobalContent } = useGlobalContextStore();
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
                      bookTitle: bookContext.bookTitle,
                      bookTopic: item.topic,
                      bookSubTopic: subtopic.subtopic,
                    },
                  });

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