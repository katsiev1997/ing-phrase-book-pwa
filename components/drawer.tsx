import React from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export const Drawer = () => {
    return (
        <Sheet>
            <SheetTrigger>Сменить тему</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Выберите тему разговора!</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account and
                        remove your data from our servers.
                    </SheetDescription>
                    <SheetClose onClick={() => console.log(123)}>Close</SheetClose>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};
