"use client";

import { useBookIndexStore } from "@/stores/bookIndex";
import { useState } from "react";

export default function BookContent() {
    const { bookIndex } = useBookIndexStore();
    const [bookContent, setBookContent] = useState("");
    return <div>
        {JSON.stringify(bookContent)}
    </div>
}