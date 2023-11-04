import React, { type PropsWithChildren } from "react";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { SidebarNav } from "../_components/sidebar-nav";

const sidebarNavItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
    },
    {
        title: "Products",
        href: "/dashboard/products",
    },
];

const Layout: React.FC<PropsWithChildren> = async ({ children }) => {
    const session = await getServerAuthSession();

    if (session?.user.role !== "admin") redirect("/");

    return (
        <div className="container flex flex-grow border-x p-0">
            <div className="hidden flex-grow space-y-6 p-10 pb-16 md:block">
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="flex-1">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
