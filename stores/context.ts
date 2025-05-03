import { create } from 'zustand';

export interface Context {
    bookTitle: string,
    bookTopic: string,
    bookSubTopic: string,
    content: string,
}