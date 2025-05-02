"use client"

import BookIndex from "@/components/BookIndex";
import { useSearchParams } from 'next/navigation';

export default function BookEditor() {
    const searchParams = useSearchParams();
    const bookTitle = searchParams.get('bookTitle');

    console.log("found ..." + bookTitle);
    return <div>
        <BookIndex title={bookTitle}></BookIndex>
    </div>
}