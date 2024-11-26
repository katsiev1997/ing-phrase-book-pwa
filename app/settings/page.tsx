import { ModeToggle } from "@/components/mode-toggle";
import React from "react";

const SettingsPage = () => {
    return (
        <div className="w-full max-w-xl mx-auto my-0">
            <h1 className="text-3xl font-bold mt-2 ml-3">Настройки</h1>
            <div className="w-full px-5 py-5">
                <ModeToggle />
            </div>
        </div>
    );
};

export default SettingsPage;
