"use client";

import axios from "axios";
import { useBookStore, BookTopic, BookSubTopic } from "@/stores/book";
import { useGlobalContextStore } from "@/stores/context";

export default function BookIndex() {
  const { books, addBookContent, addBookTopicContent } = useBookStore();
  const { bookContext, setGlobalBookTopic, setGlobalBookSubTopic, setGlobalContent } = useGlobalContextStore();
  const book = books.find((book) => book.title === bookContext.bookTitle);

  return <div>
    {
      book && book.bookTopic.map((item: BookTopic) => (
        <div key={item.topic}>
          {/* TODO - Ref onclick call. Can be made generic */}
          <h1>topic - {item.topic} <button onClick={async () => {
                  const contentResponse = await axios.get("/api/book-content", {
                    params: {
                      bookTitle: bookContext.bookTitle,
                      bookTopic: item.topic,
                    },
                  });
                  
                  setGlobalBookTopic(item.topic)
                  setGlobalContent(contentResponse.data)
                  if (bookContext.bookTitle) {
                    addBookTopicContent(bookContext.bookTitle, item.topic, contentResponse.data);
                  }
                  console.log(book)
                }}>
                  Get Content
                </button></h1>
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

                  if (bookContext.bookTitle) {
                    addBookContent(bookContext.bookTitle, item.topic, subtopic.subtopic, contentResponse.data);
                  }
                  console.log(book)
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