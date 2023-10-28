"use client";
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { Laptop2, Sun, MoonStar } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

const ThemeToggle = () => {
    const { setTheme, theme, systemTheme } = useTheme();

    const handleClick = () => {
        if (theme === "dark") setTheme("light");
        else if (theme === "system") {
            if (systemTheme === "dark") setTheme("light");
            else setTheme("dark");
        } else setTheme("dark");
    };

    return (
        <div>
            <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => handleClick()}
                className="bg-transparent"
            >
                <Sun className="dark:hidden" />
                <MoonStar className="hidden dark:flex" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
        // <DropdownMenu>
        //     <DropdownMenuTrigger asChild>
        //         <button className="text-muted-foreground transition-colors hover:text-foreground">
        //             <Sun className="dark:hidden" />
        //             <MoonStar className="hidden dark:flex" />
        //             <span className="sr-only">Toggle theme</span>
        //         </button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent
        //         align="end"
        //         onCloseAutoFocus={(e) => void e.preventDefault()}
        //         className=""
        //     >
        //         <DropdownMenuItem
        //             onClick={() => setTheme("light")}
        //             className={cn(
        //                 "flex items-center gap-2 text-muted-foreground",
        //                 theme === "light" && "text-foreground"
        //             )}
        //         >
        //             <Sun /> Light
        //         </DropdownMenuItem>
        //         <DropdownMenuItem
        //             onClick={() => setTheme("dark")}
        //             className={cn(
        //                 "flex items-center gap-2 text-muted-foreground",
        //                 theme === "dark" && "text-foreground"
        //             )}
        //         >
        //             <MoonStar /> Dark
        //         </DropdownMenuItem>
        //         <DropdownMenuItem
        //             onClick={() => setTheme("system")}
        //             className={cn(
        //                 "flex items-center gap-2 text-muted-foreground",
        //                 theme === "system" && "text-foreground"
        //             )}
        //         >
        //             <Laptop2 /> System
        //         </DropdownMenuItem>
        //     </DropdownMenuContent>
        // </DropdownMenu>
    );
};

export default ThemeToggle;
