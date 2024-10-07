import { BookHeart, House, MessagesSquare, Search, UserRoundCog } from "lucide-react";
import Link from "next/link";
import React from "react";

export const NavMenu = () => {
    return (
        <nav className="flex items-center justify-around fixed bottom-0 left-0 right-0 h-16 border-t border-border bg-background">
            <Link href="/">
                <House />
            </Link>
            <Link href="/search">
                <Search />
            </Link>
            <Link href="/dialogs">
                <MessagesSquare />
            </Link>
            <Link href="/favorites">
                <BookHeart />
            </Link>
            <Link href="/settings">
                <UserRoundCog />
            </Link>
        </nav>
    );
};
