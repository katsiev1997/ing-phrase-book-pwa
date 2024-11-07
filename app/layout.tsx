import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NavMenu } from "@/components/nav-menu";
import { ThemeProvider } from "@/components/theme-provider";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    weight: ["400", "500", "600", "700", "800"],
    style: ["normal", "italic"],
    subsets: ["cyrillic", "cyrillic-ext", "latin"],
    variable: "--font-montserrat",
});

const APP_NAME = "IngPhraseBook";
const APP_DEFAULT_TITLE = "IngPhraseBook";
const APP_TITLE_TEMPLATE = "Ingush Phrasebook";
const APP_DESCRIPTION = "The best ingush phrasebook app!";

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,   
    userScalable: false,
    themeColor: "#FFFFFF",
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" suppressHydrationWarning>
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
