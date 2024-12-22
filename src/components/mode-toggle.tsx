"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "../shared/ui/switch";
import { Label } from "../shared/ui/label";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center gap-2">
            <Label htmlFor="dark-mode" className="w-16">
                Темная тема:
            </Label>
            <Switch checked={theme === "dark"} onClick={() => setTheme(theme === "light" ? "dark" : "light")} id="dark-mode" />
        </div>
    );
}
