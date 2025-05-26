"use client"

import React from "react";

import { useBookStore, BookTopic, BookSubTopic } from "@/stores/book";
import { useGlobalContextStore } from "@/stores/context";
import { generateContentWrapper } from "@/app/actions/generate";
import { BOOK_CONTENT_SYSTEM_INSTRUCTION } from "@/app/api/prompts";

const NavBar: React.FC = () => {
    const { books, addBookContent, addBookTopicContent } = useBookStore();
      const { bookContext, setGlobalBookTopic, setGlobalBookSubTopic, setGlobalContent } = useGlobalContextStore();
      const book = books.find((book) => book.title === bookContext.bookTitle);

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        <label htmlFor="my-drawer">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                            </div>
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                            <div className="">
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
                        </ul>
                    </div>
                </div>
            </div>
            <div className="navbar-center">
                <a className="text-xl">BookAI</a>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
                </button>
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default NavBar;