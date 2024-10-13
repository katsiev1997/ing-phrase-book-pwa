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
import { Button } from "./ui/button";

export const Drawer = () => {
    return (
        <Sheet>
            <SheetTrigger  className="border border-border px-4 py-2 hover:border-black transition-all rounded absolute left-1/2 bottom-20 z-10 -translate-x-1/2 font-semibold">Сменить тему</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Выберите тему разговора!</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account and
                        remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
                <div className="h-full flex flex-col justify-between items-center">
                    <Button>Сменить тему</Button>
                    <SheetClose onClick={() => console.log(123)}>
                        <Button>Закрыть</Button>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    );
};
