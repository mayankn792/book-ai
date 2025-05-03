"use client"

import BookContent from "@/components/BookContent";
import BookIndex from "@/components/BookIndex";
import { useSearchParams } from 'next/navigation';

export default function BookEditor() {
    const searchParams = useSearchParams();
    const bookTitle = searchParams.get('bookTitle');

    console.log("found ..." + bookTitle);
    return <div className="flex flex-row">
        <div className="basis-4/12"> 
            <BookIndex title={bookTitle}></BookIndex>
        </div>
        <div className="basis-8/12">
            <BookContent></BookContent>      
        </div>
    </div>
}