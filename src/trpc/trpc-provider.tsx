"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";

import { type AppRouter } from "@/server/trpc/root";
import { getUrl, transformer } from "./shared";

// Call this from client components
export const apiClient = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: {
    children: React.ReactNode;
    cookies: string;
}) {
    const [queryClient] = useState(() => new QueryClient());

    const [trpcClient] = useState(() =>
        apiClient.createClient({
            transformer,
            links: [
                loggerLink({
                    enabled: (op) =>
                        process.env.NODE_ENV === "development" ||
                        (op.direction === "down" && op.result instanceof Error),
                }),
                unstable_httpBatchStreamLink({
                    url: getUrl(),
                    headers() {
                        return {
                            cookie: props.cookies,
                            "x-trpc-source": "react",
                        };
                    },
                }),
            ],
        })
    );

    // Create client provider
    return (
        <QueryClientProvider client={queryClient}>
            <apiClient.Provider client={trpcClient} queryClient={queryClient}>
                {props.children}
            </apiClient.Provider>
        </QueryClientProvider>
    );
}
