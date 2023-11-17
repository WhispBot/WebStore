"use client";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { type PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    const pathName = usePathname()
        .split("/")
        .filter((crumb) => crumb !== "");

    return (
        <div>
            <div className="container py-4">
                <div className="flex items-center gap-1">
                    <Link
                        href="/"
                        className="text-sm font-semibold capitalize text-primary hover:underline"
                    >
                        <Home size={16} />
                    </Link>
                    {pathName.map((name, index, arr) => {
                        const prev = arr.slice(0, index);
                        const link =
                            prev.length > 0 ? `/${prev.join("/")}/${name}` : `/${name}`;
                        return (
                            <React.Fragment key={index}>
                                <ChevronRight
                                    className="text-muted-foreground"
                                    size={16}
                                />
                                {index === arr.length - 1 ? (
                                    <span className="text-sm font-semibold capitalize text-muted-foreground">
                                        {name.split("%20").length > 1
                                            ? name.split("%20").slice(1).join(" ")
                                            : name}
                                    </span>
                                ) : (
                                    <Link
                                        href={link}
                                        className="text-sm font-semibold capitalize text-primary hover:underline"
                                    >
                                        {name}
                                    </Link>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
            {children}
        </div>
    );
};

export default Layout;
