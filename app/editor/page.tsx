"use client"

import BookContent from "@/components/BookContent";
import BookIndex from "@/components/BookIndex";
import { useSearchParams } from 'next/navigation';

export default function BookEditor() {
    const searchParams = useSearchParams();
    const bookTitle = searchParams.get('bookTitle');

    console.log("found ..." + bookTitle);
    return <div className="flex flex-row">
        <div className="basis-3/12"> 
            {/* TODO - remove this prop and access book title from global book context */}
            <BookIndex title={bookTitle}></BookIndex>
        </div>
        <div className="basis-9/12">
            <BookContent></BookContent>      
        </div>
    </div>
}