import React, { type PropsWithChildren } from "react";
import NavLink from "../_components/nav-link";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

const Layout: React.FC<PropsWithChildren> = async ({ children }) => {
    const session = await getServerAuthSession();

    if (session?.user.role !== "admin") redirect("/");

    return (
        <div className="container flex flex-grow border-x p-0">
            <div className="flex w-64 flex-col border-r pl-10">
                <div className="flex flex-col p-2">
                    <span className="text-sm font-bold">General</span>
                    <NavLink
                        href="/dashboard"
                        className="rounded-md p-2 text-sm font-semibold normal-case hover:bg-muted"
                    >
                        Overview
                    </NavLink>
                </div>

                <div className="flex flex-col p-2">
                    <span className="text-sm font-bold">Products</span>
                    <NavLink
                        href="/dashboard/products"
                        className="rounded-md p-2 text-sm font-semibold normal-case hover:bg-muted"
                    >
                        Table
                    </NavLink>
                </div>
            </div>
            <div className="flex-grow overflow-hidden">{children}</div>
        </div>
    );
};

export default Layout;
