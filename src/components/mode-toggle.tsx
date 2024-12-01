"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "../shared/ui/switch";
import { Label } from "../shared/ui/label";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center space-x-2">
            <Label className="text-lg" htmlFor="dark-mode">
                Темная тема:{" "}
            </Label>
            <Switch
                checked={theme === "dark"}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                id="dark-mode"
            />
        </div>
    );
}
