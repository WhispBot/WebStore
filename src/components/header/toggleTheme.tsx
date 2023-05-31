"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MoonIcon, SunIcon, Laptop2Icon } from "lucide-react";
import { Button } from "../ui/button";

const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size={"sm"} className="p-2">
                    {theme === "system" ? (
                        resolvedTheme === "dark" ? (
                            <MoonIcon />
                        ) : (
                            <SunIcon />
                        )
                    ) : resolvedTheme === "dark" ? (
                        <MoonIcon />
                    ) : (
                        <SunIcon />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                onCloseAutoFocus={(e) => void e.preventDefault()}
            >
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className="flex items-center gap-2"
                >
                    <SunIcon /> Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className="flex items-center gap-2"
                >
                    <MoonIcon /> Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className="flex items-center gap-2"
                >
                    <Laptop2Icon /> System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeToggle;
