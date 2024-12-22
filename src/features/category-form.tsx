"use client";

import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { useState } from "react";
import { createCategory } from "../shared/api/methods";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../shared/hooks";

export const CategoryForm = () => {
    const [name, setName] = useState("");
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            toast({
                title: "Вы успешно добавили категорию",
                description: "Теперь вы можете добавлять новые фразы в эту категорию",
            });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            toast({
                title: "Произошла ошибка при добавлении категории",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(name);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 border rounded-3xl p-6 bg-muted">
            <div className="w-full flex flex-col gap-2">
                <label htmlFor="name" className="font-medium">
                    Добавить категорию
                </label>
                <Input id="name" placeholder="Введите название категории" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <Button className="w-full">Добавить</Button>
        </form>
    );
};
