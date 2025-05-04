import { create } from "zustand";

export interface GlobalContext {
    bookTitle?: string,
    bookTopic?: string,
    bookSubTopic?: string,
    content?: string,
}

interface GlobalContextState {
    bookContext: GlobalContext,
    setGlobalBookTitle: (bookTitle: string) => void,
    setGlobalBookTopic: (bookTopic: string) => void,
    setGlobalBookSubTopic: (bookSubTopic: string) => void,
    setGlobalContent: (content: string) => void,
}

export const useGlobalContextStore = create<GlobalContextState>((set) => ({
    bookContext: {},
    setGlobalBookTitle: (bookTitle) => set((state) => ({
        bookContext: { ...state.bookContext, bookTitle }
    })),
    setGlobalBookTopic: (bookTopic) => set((state) => ({
        bookContext: { ...state.bookContext, bookTopic }
    })),
    setGlobalBookSubTopic: (bookSubTopic) => set((state) => ({
        bookContext: { ...state.bookContext, bookSubTopic }
    })),
    setGlobalContent: (content) => set((state) => ({
        bookContext: { ...state.bookContext, content }
    })),
}));