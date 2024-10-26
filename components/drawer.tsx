"use client";

import { useEffect, useState } from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { listCategories } from "@/actions/get-categories";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";

export const Drawer = () => {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

    const getCategories = async () => {
        const data = await listCategories();
        setCategories(data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleCategory = (id: number) => {
        router.push(`?categoryId=${id}`);
    };

    return (
        <Sheet>
            <SheetTrigger className="border border-border px-4 py-2 hover:border-black transition-all rounded absolute left-1/2 bottom-20 z-10 -translate-x-1/2 font-semibold">
                Сменить тему
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Выберите тему разговора!</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account and
                        remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
                <div className="h-[calc(100vh-4rem] flex flex-col items-start gap-2 overflow-y-auto">
                    {categories.map((category) => (
                        <SheetClose onClick={() => handleCategory(category.id)} key={category.id}>
                            {"<  "}
                            <p className="text-sm uppercase underline underline-offset-4">
                                {category.name}
                            </p>
                        </SheetClose>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};
