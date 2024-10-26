import type { Metadata } from "next";
import "./globals.css";
import { NavMenu } from "@/components/nav-menu";
import { ThemeProvider } from "@/components/theme-provider";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    weight: ["400", "500", "600", "700", "800"],
    style: ["normal"],
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: "swap",
});

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
        <html lang="en" suppressHydrationWarning>
            <body className={montserrat.variable}>
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
