import { create } from "zustand";

export interface Context {
    bookTitle?: string,
    bookTopic?: string,
    bookSubTopic?: string,
    content?: string,
}

interface ContextState {
    bookContext: Context,
    setBookTitle: (bookTitle: string) => void,
    setBookTopic: (bookTopic: string) => void,
    setBookSubTopic: (bookSubTopic: string) => void,
    setContent: (content: string) => void,
}

export const useContextStore = create<ContextState>((set) => ({
    bookContext: {},
    setBookTitle: (bookTitle) => set((state) => ({
        bookContext: { ...state.bookContext, bookTitle }
    })),
    setBookTopic: (bookTopic) => set((state) => ({
        bookContext: { ...state.bookContext, bookTopic }
    })),
    setBookSubTopic: (bookSubTopic) => set((state) => ({
        bookContext: { ...state.bookContext, bookSubTopic }
    })),
    setContent: (content) => set((state) => ({
        bookContext: { ...state.bookContext, content }
    })),
}));