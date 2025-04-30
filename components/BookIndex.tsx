"use client";

import { useBookIndexStore } from "@/stores/bookIndex";

export default function BookIndex() {
    const { bookIndex } = useBookIndexStore();

    return <div>
        {JSON.stringify(bookIndex)}
    </div>
}