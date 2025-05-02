"use client";

import { useBookIndexStore } from "@/stores/bookIndex";
import { useState } from "react";
import { useSearchParams } from 'next/navigation';

export default function BookContent() {
    const { bookIndex } = useBookIndexStore();
    const [bookContent, setBookContent] = useState("");

    const searchParams = useSearchParams();
    const bookTitle = searchParams.get('bookTitle');

    console.log("found 111..." + bookTitle);

    return <div>
        {JSON.stringify(bookContent)}
    </div>
}