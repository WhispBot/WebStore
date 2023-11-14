"use client";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { type PropsWithChildren } from "react";
import { cn } from "~/lib/utils";
import { buttonVariants } from "../_components/ui/button";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    const pathName = usePathname()
        .split("/")
        .filter((crumb) => crumb !== "");

    return (
        <div>
            <div className="container p-4">
                <div className="flex items-center">
                    <Link
                        href="/"
                        className={cn(buttonVariants({ variant: "link", size: "icon" }))}
                    >
                        <Home size={16} />
                    </Link>
                    {pathName.map((name, index, arr) => {
                        const prev = arr.slice(0, index);

                        const link =
                            prev.length > 0 ? `/${prev.join("/")}/${name}` : `/${name}`;

                        return (
                            <div key={name} className="flex items-center text-sm">
                                <ChevronRight
                                    className="text-muted-foreground"
                                    size={16}
                                />
                                {index === arr.length - 1 ? (
                                    <span className="px-2 capitalize text-muted-foreground">
                                        {name.split("_").length > 1
                                            ? name.split("_").slice(1).join(" ")
                                            : name}
                                    </span>
                                ) : (
                                    <Link
                                        href={link}
                                        className={cn(
                                            buttonVariants({
                                                variant: "link",
                                                size: "icon",
                                            }),
                                            "capitalize"
                                        )}
                                    >
                                        {name}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            {children}
        </div>
    );
};

export default Layout;
