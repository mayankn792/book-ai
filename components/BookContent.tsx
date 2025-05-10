"use client";

import { useGlobalContextStore } from "@/stores/context";

export default function BookContent() {
    const { bookContext } = useGlobalContextStore();

    return <div>
        {/* TODO - Render content in HTML style */}
        <pre className="font-mono p-2 border border-gray-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">{bookContext.content}</pre>
    </div>
}