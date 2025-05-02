import { create } from 'zustand';

export interface Book {
    title: string;
    bookTopic?: BookTopic[];
}

export interface BookTopic {
    topic: string;
    subtopics?: BookSubTopic[];
}

export interface BookSubTopic {
    subtopic: string;
    content?: string;
}

interface BookState {
    books: Book[];
    addBook: (book: Book) => void;
    addBookTopic: (bookTitle: string, bookTopic: BookTopic) => void;
    addBookSubTopic: (bookTitle: string, bookTopic: string, bookSubTopic: BookSubTopic) => void;
    addBookContent: (bookTitle: string, bookTopic: string, bookSubTopic: string, content: string) => void;
}   

export const useBookStore = create<BookState>((set) => ({ 
    books: [],
    addBook: (book: Book) => set((state: BookState) => ({ books: [...state.books, book] })),
    addBookTopic: (bookTitle: string, bookTopic: BookTopic) => set((state: BookState) => {
        const book = state.books.find((book: Book) => book.title === bookTitle);
        if (book && book.bookTopic) {
            book.bookTopic.push({ topic: bookTopic.topic, subtopics: bookTopic.subtopics })
        }
        return { ...state };
    }),
    addBookSubTopic: (bookTitle: string, bookTopic: string, bookSubTopic: BookSubTopic) => set((state: BookState) => {
        const book = state.books.find((book: Book) => book.title === bookTitle);
        if (!book || !book.bookTopic) {
            return { ...state };
        }

        const topic = book.bookTopic.find((bt: BookTopic) => bt.topic === bookTopic);
        if (topic && topic.subtopics) {
            topic.subtopics.push(bookSubTopic);
        }
        
        return { ...state };
    }),
    addBookContent: (bookTitle: string, bookTopic: string, bookSubTopic: string, content: string) => set((state: BookState) => {
        const book = state.books.find((book: Book) => book.title === bookTitle);
        if (!book || !book.bookTopic) {
            return { ...state };
        }

        const topic = book.bookTopic.find((bt: BookTopic) => bt.topic === bookTopic);
        if (topic && topic.subtopics) {
            const subtopic = topic.subtopics.find((st: BookSubTopic) => st.subtopic === bookSubTopic);
            if (subtopic) {
                subtopic.content = content;
            }
        }

        return { ...state };
    }),
}));
