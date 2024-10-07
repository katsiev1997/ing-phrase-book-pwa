import type { Metadata } from "next";
import "./globals.css";
import { NavMenu } from "@/components/nav-menu";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
    title: "IngPhraseBook - ингушский разговорник",
    description: "Русско-ингушский разговорник, ингушский разговорник, ингушский переводчик",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <NavMenu />
                </ThemeProvider>
            </body>
        </html>
    );
}
