"use client";

import { Button } from "@/src/shared/ui/button";
import { Input } from "@/src/shared/ui/input";
import { useState } from "react";
import { login } from "../shared/api/methods";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../shared/hooks";

export const AuthForm = () => {
    const [email, setEmail] = useState("");

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            toast({
                title: "Вы успешно авторизовались",
                description: "Теперь вы можете использовать все функции приложения",
            });
        },
        onError: (error) => {
            toast({
                title: "Произошла ошибка при авторизации",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(email);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 border rounded-3xl p-6 bg-muted">
            <div className="w-full flex flex-col gap-2">
                <label htmlFor="email" className="font-medium">
                    Войти в аккаунт
                </label>
                <p className="text-xs text-center text-muted-foreground">
                    Для возможности использования всего функционала приложения необходимо авторизоваться
                </p>
                <Input id="email" placeholder="Введите почту" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button className="w-full">Войти</Button>
        </form>
    );
};
