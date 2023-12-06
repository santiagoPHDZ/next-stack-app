
"use client"

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client";
import { getUrl } from "@/lib/trpc";
import superjson from "superjson";

import { AppRouter } from "../trpc"
import {createTRPCReact} from "@trpc/react-query"

// Create client TRPC
export const trpc = createTRPCReact<AppRouter>({})

const TRPCProvider = ({ children }: { children: React.ReactNode }) => {

    const [queryClient] = useState(() => new QueryClient)
    const [trpcClient] = useState(() => trpc.createClient({
        transformer: superjson,
        links: [
            httpBatchLink({
                url: getUrl() // all the trpc request are going to be sent to
            })
        ]
    }))

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    )
}

export default TRPCProvider;