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
        <div className="bg-white" key={item.topic}>
          {/* TODO - Ref onclick call. Can be made generic */}
          <h1><button className="btn btn-neutral btn-outline" onClick={async () => {
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
                  {item.topic} 
                </button></h1>
          <ol className="list-decimal list-inside">
            {item.subtopics.map((subtopic: BookSubTopic) => (
              
              <li key={subtopic.subtopic}>
                <button className="btn btn-neutral btn-outline" onClick={async () => {
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
                  {subtopic.subtopic}
                </button>
              </li>
            ))}
          </ol>
        </div>
      ))
    }
  </div>
}