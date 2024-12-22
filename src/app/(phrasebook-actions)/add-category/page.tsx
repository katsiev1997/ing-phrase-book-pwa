"use client";

import React from "react";
import { CategoryForm } from "@/src/features/category-form";
import { fetchListCategories } from "@/src/shared/api/methods";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/src/shared/ui/skeleton";

export default function AddCategory() {
    const {
        data: categories = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchListCategories,
        select: (data) => data.sort((a, b) => a.name.localeCompare(b.name)),
    });
    return (
        <div className="flex flex-col items-center gap-10 w-full h-[calc(100vh-120px)] px-5">
            <h1 className="text-3xl font-bold mt-2 ml-3">Добавить категорию</h1>
            <div className="w-full flex flex-col gap-5">
                <h2 className="text-xl font-bold">Список категорий</h2>
                <div className="flex flex-col gap-3 w-full h-80 overflow-y-auto">
                    {isLoading &&
                        Array.from({ length: 5 }).map((_, i) => (
                            <div className="w-full flex justify-between gap-3 items-center" key={i}>
                                <Skeleton className="w-12 h-10 rounded-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        ))}
                    {isError && <p className="text-center text-red-500">Произошла ошибка при загрузке категорий</p>}
                    {categories.length > 0 &&
                        categories.map((category, i) => (
                            <div className="flex items-center gap-2 border-b pb-3" key={category.id}>
                                <p>{i + 1}</p>
                                <p>{category.name}</p>
                            </div>
                        ))}
                </div>
            </div>
            <CategoryForm />
        </div>
    );
}
