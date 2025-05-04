"use client";

import { useGlobalContextStore } from "@/stores/context";

export default function BookContent() {
    const { bookContext } = useGlobalContextStore();

    return <div>
        {/* TODO - Render content in HTML style */}
        {bookContext.content}
    </div>
}