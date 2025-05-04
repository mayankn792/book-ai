"use client"

import BookContent from "@/components/BookContent";
import BookIndex from "@/components/BookIndex";

export default function BookEditor() {
    return <div className="flex flex-row">
        <div className="basis-3/12"> 
            <BookIndex></BookIndex>
        </div>
        <div className="basis-9/12">
            <BookContent></BookContent>      
        </div>
    </div>
}