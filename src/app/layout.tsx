import type { Metadata, Viewport } from "next";
import "./globals.css";
import { NavMenu } from "@/src/components/nav-menu";
import { Montserrat } from "next/font/google";
import Providers from "@/src/shared/providers/providers";
import { YandexMetrikaContainer } from "../shared/lib/yandex-metrika-container";

const montserrat = Montserrat({
    weight: ["400", "500", "600", "700", "800"],
    style: ["normal", "italic"],
    subsets: ["cyrillic", "cyrillic-ext", "latin"],
    variable: "--font-montserrat",
});

const APP_NAME = "IngPhrase";
const APP_DEFAULT_TITLE = "IngPhrase";
const APP_TITLE_TEMPLATE = "Ingush Phrasebook - %s";
const APP_DESCRIPTION = "Лучший русско-ингушский разговорник! Изучайте ингушский язык с лёгкостью.";
const APP_KEYWORDS = "ингушский язык, разговорник, русско-ингушский перевод, ингушский словарь, ингушские фразы";

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    keywords: APP_KEYWORDS,
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
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
        url: "https://ingphrasebook.ru",
        locale: "ru_RU",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Ingush Phrasebook",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@yourtwitterhandle",
        creator: "@yourtwitterhandle",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
        images: ["/twitter-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
    },
    alternates: {
        canonical: "https://ingphrasebook.ru",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#FFFFFF",
};

const analyticsEnabled = !!(process.env.NODE_ENV === "production");

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="author" content="katsiev technologies" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className={montserrat.variable}>
                <Providers>
                    {children}
                    <NavMenu />
                </Providers>
            </body>
            <YandexMetrikaContainer enabled={analyticsEnabled} />
        </html>
    );
}
