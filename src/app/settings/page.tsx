import { ModeToggle } from "@/src/components/mode-toggle";
import { Button } from "@/src/shared/ui/button";
import Link from "next/link";
import React from "react";

const SettingsPage = () => {
    return (
        <div className="w-full max-w-xl mx-auto my-0">
            <h1 className="text-3xl font-bold mt-2 ml-3">Настройки</h1>
            <div className="w-full h-[calc(100vh-120px)] px-5 py-5 flex flex-col gap-5 justify-between">
                <ModeToggle />
                <Button asChild variant="outline">
                    <Link href="/add-phrase">Добавить новую фразу</Link>
                </Button>
            </div>
        </div>
    );
};

export default SettingsPage;
