"use client";

import { useBookStore, BookTopic, BookSubTopic } from "@/stores/book";
import { useGlobalContextStore } from "@/stores/context";
import { generateContentWrapper } from "@/app/actions/generate";
import { BOOK_CONTENT_SYSTEM_INSTRUCTION } from "@/app/api/prompts";

export default function BookIndex() {
  const { books, addBookContent, addBookTopicContent } = useBookStore();
  const { bookContext, setGlobalBookTopic, setGlobalBookSubTopic, setGlobalContent } = useGlobalContextStore();
  const book = books.find((book) => book.title === bookContext.bookTitle);

  return <div className="font-mono p-2 border border-gray-300 overflow-x-auto whitespace-pre-wrap leading-relaxed h-screen overflow-auto fixed">
    {
      book && book.bookTopic.map((item: BookTopic) => (
        <div key={item.topic}>
          {/* TODO - Ref onclick call. Can be made generic */}
          <h1><button className="btn btn-neutral" onClick={async () => {
                  const content = "book title - " + bookContext?.bookTitle?.replace("NaN", "") + " book topic - " + item.topic?.replace("NaN", "");
                  const contentResponse = await generateContentWrapper(content, BOOK_CONTENT_SYSTEM_INSTRUCTION)
                  if (!contentResponse) {
                    return; //something went wrong
                  }
                  
                  setGlobalBookTopic(item.topic)
                  setGlobalContent(contentResponse)
                  if (bookContext.bookTitle) {
                    addBookTopicContent(bookContext.bookTitle, item.topic, contentResponse);
                  }
                  console.log(book)
                }}>
                  {item.topic} 
                </button></h1>
          <ol className="list-decimal list-inside">
            {item.subtopics.map((subtopic: BookSubTopic) => (
              
              <li key={subtopic.subtopic}>
                <button className="btn btn-neutral" onClick={async () => {
                  const bookSubTopicContent = subtopic.subtopic ? " book sub-topic" + subtopic.subtopic?.replace("NaN", "") : "";
                  const content = "book title - " + bookContext.bookTitle?.replace("NaN", "") + " book topic - " + item.topic?.replace("NaN", "") + bookSubTopicContent;
                  const contentResponse = await generateContentWrapper(content, BOOK_CONTENT_SYSTEM_INSTRUCTION)
                  if (!contentResponse) {
                    return; //something went wrong
                  }

                  setGlobalBookTopic(item.topic)
                  setGlobalBookSubTopic(subtopic.subtopic)
                  setGlobalContent(contentResponse)

                  if (bookContext.bookTitle) {
                    addBookContent(bookContext.bookTitle, item.topic, subtopic.subtopic, contentResponse);
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