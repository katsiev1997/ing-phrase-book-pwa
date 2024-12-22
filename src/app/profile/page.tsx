"use client";

import Link from "next/link";

import { ModeToggle } from "@/src/components/mode-toggle";
import { AuthForm } from "@/src/features/auth-form";
import { Button } from "@/src/shared/ui/button";
import { checkAuth } from "@/src/shared/api/methods";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";

const SettingsPage = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ["auth"],
        queryFn: checkAuth,
    });
    const user = data?.user ?? null;
    const authenticated = data?.authenticated ?? false;
    const error = isError ? "Ошибка при проверке авторизации" : null;

    return (
        <div className="w-full max-w-xl mx-auto my-0">
            <h1 className="text-3xl font-bold mt-2 ml-3">Профиль</h1>
            <div className="w-full h-[calc(100vh-120px)] px-5 py-5 flex flex-col gap-5 justify-between">
                <div className="flex  justify-between">
                    {authenticated ? (
                        <div className="flex flex-col gap-2">
                            <p className="font-medium">{user?.role}</p>
                            <p className="text-muted-foreground">{user?.email}</p>
                        </div>
                    ) : (
                        <div>
                            <p>Вы не авторизованы</p>
                            {error && <p className="text-xs text-red-500">{error}</p>}
                        </div>
                    )}
                    <ModeToggle />
                </div>
                {isLoading ? <Loader size={40} className="animate-spin mx-auto" /> : !authenticated && <AuthForm />}
                {user?.role === "MODERATOR" || user?.role === "ADMIN" ? (
                    <div className="w-full flex items-center gap-4 justify-between">
                        <Button className="text-center h-14" asChild variant="outline">
                            <Link className="text-wrap" href="/add-category">
                                Добавить категорию
                            </Link>
                        </Button>
                        <Button className="text-center h-14" asChild variant="outline">
                            <Link className="text-wrap" href="/add-phrase">
                                Добавить фразу
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
};

export default SettingsPage;
