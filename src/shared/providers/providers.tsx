"use client";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DialogProvider } from "./dialog-provider";
import { ThemeProvider } from "./theme-provider";

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = getQueryClient();

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <QueryClientProvider client={queryClient}>
                <DialogProvider>{children}</DialogProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
