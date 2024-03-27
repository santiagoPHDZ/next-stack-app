"use client"

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter()

    return (
        <div className="flex w-full items-start justify-start">
            <button onClick={() => router.back()} className="flex items-center text-primary">
                <ArrowLeft className="h-4 w-4 mr-1" /> Atrás
            </button>
        </div>
    )
}

export default BackButton;