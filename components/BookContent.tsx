"use client";

import { useContextStore } from "@/stores/context";

export default function BookContent() {
    const { bookContext } = useContextStore();

    return <div>
        {/* TODO - format content in HTML */}
        {bookContext.content}
    </div>
}