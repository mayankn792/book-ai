import { create } from 'zustand';
//TODO - depricate this component
interface BookIndex {
    topic: string;
    subtopics: string[];
}

interface BookIndexState {
  bookIndex: BookIndex[];
  setBookIndex: (bookIndex: BookIndex[]) => void;
}

export const useBookIndexStore = create<BookIndexState>((set) => ({
  bookIndex: [],
  setBookIndex: (bookIndex) => set({ bookIndex })
}));