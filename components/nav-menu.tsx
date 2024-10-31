import { BookHeart, House, MessagesSquare, Search, UserRoundCog } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavMenuItems = [
    {
        href: "/",
        item: <House />,
    },
    {
        href: "/search",
        item: <Search />,
    },
    {
        href: "/dialogs",
        item: <MessagesSquare />,
    },
    {
        href: "/favorites",
        item: <BookHeart />,
    },
    {
        href: "/settings",
        item: <UserRoundCog />,
    },
];

export const NavMenu = () => {
    return (
        <nav className="flex items-center justify-around fixed bottom-0 left-0 right-0 h-16 border-t border-border bg-background">
            {NavMenuItems.map((item) => (
                <Link className="" href={item.href} key={item.href}>
                    {item.item}
                </Link>
            ))}
        </nav>
    );
};
