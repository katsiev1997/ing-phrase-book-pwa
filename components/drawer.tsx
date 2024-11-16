"use client";

import { useLayoutEffect, useState } from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { fetchListCategories } from "@/shared/methods";

type Props = {
    activeCategoryId: number;
};

export const Drawer = ({ activeCategoryId }: Props) => {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

    const getCategories = async () => {
        try {
            const data = await fetchListCategories();
            setCategories(data);
        } catch (error) {
            alert(error);
        }
    };

    useLayoutEffect(() => {
        getCategories();
    }, []);

    const handleCategory = (id: number) => {
        router.push(`?categoryId=${id}`);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="absolute left-1/2 bottom-24 z-10 -translate-x-1/2 lowercase">
                    {categories && activeCategoryId && categories.length > 0
                        ? categories.filter((c) => c.id === activeCategoryId)[0].name
                        : "Выберите тему"}
                </Button>
            </SheetTrigger>
            <SheetContent className="px-1 h-full">
                <SheetHeader>
                    <SheetTitle>
                        Выберите тему <br /> разговора!
                    </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col pb-10 gap-2 h-full overflow-y-auto">
                    {categories &&
                        categories.map((category) => (
                            <SheetClose
                                asChild
                                onClick={() => handleCategory(category.id)}
                                key={category.id}
                            >
                                <div className="flex items-center gap-1 border-b border-x-white w-full min-h-12">
                                    <ChevronLeft size={18} />
                                    <p
                                        className={cn("lowercase first-letter:uppercase", {
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
