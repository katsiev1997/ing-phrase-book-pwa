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
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

type Props = {
    activeCategoryId: number;
};

export const Drawer = ({ activeCategoryId }: Props) => {
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
            <Button asChild className="absolute left-1/2 bottom-20 z-10 -translate-x-1/2 lowercase">
                <SheetTrigger>
                    {categories && activeCategoryId && categories.length > 0
                        ? categories.filter((c) => c.id === activeCategoryId)[0].name
                        : "Выберите тему"}
                </SheetTrigger>
            </Button>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Выберите тему разговора!</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account and
                        remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
                <div className="h-[calc(100vh-4rem] flex flex-col items-start gap-2 overflow-y-auto">
                    {categories &&
                        categories.map((category) => (
                            <SheetClose
                                className="w-full"
                                onClick={() => handleCategory(category.id)}
                                key={category.id}
                            >
                                <div className="flex items-center gap-2 border-b border-x-white w-full h-10">
                                    <ArrowLeft size={18}/>
                                    <p
                                        className={cn("text-sm lowercase first-letter:uppercase", {
                                            "font-semibold text-blue-700":
                                                category.id === activeCategoryId,
                                        })}
                                    >
                                        {category.name}
                                    </p>
                                </div>
                            </SheetClose>
                        ))}
                </div>
            </SheetContent>
        </Sheet>
    );
};
