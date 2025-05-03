"use client";

import { useContextStore } from "@/stores/context";

export default function BookContent() {
    const { bookContext } = useContextStore();

    return <div>
        {bookContext.content}
    </div>
}