"use client";

import { useState } from "react";
import axios from "axios";
import BookContentFinder from "@/components/BookContentFinder";

export default function Home() {
  const [bookTitle, setBookTitle] = useState("");
  const [response, setResponse] = useState([]);
  return (
    <div>
      <BookContentFinder />
      <br></br>
      <input type="text" onChange={(event) => setBookTitle(event.target.value)} placeholder="book title goes here ...." />
      <br></br>
      <button onClick={async () => {
        console.log("book title", bookTitle);
        const response = await axios.get("/api/book-index", {
          params: {
            bookTitle: bookTitle,
          },
        });
        console.log("response", response);
        setResponse(response.data);
      }}>get index</button>
      <br></br>
      <div>
        {
          response.map((item: { topic: string; subtopics: string[] }) => (
            <div key={item.topic}>
              <h1>topic - {item.topic}</h1>
              <ul>
                {item.subtopics.map((subtopic: string) => (
                  <li key={subtopic}>
                  {subtopic}
                  <button onClick={async () => {
                    const contentResponse = await axios.get("/api/book-content", {
                    params: {
                      bookTitle: bookTitle,
                      bookTopic: item.topic,
                      bookSubTopic: subtopic,
                    },
                    });
                    console.log("contentResponse", contentResponse.data);
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
    </div>
  );
}
