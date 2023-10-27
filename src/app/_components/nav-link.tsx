"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";

interface NavLinkprops extends React.PropsWithChildren {
    href: string;
}

const NavLink: React.FC<NavLinkprops> = ({ href, children }) => {
    const segment = useSelectedLayoutSegment();

    const isHome = segment === null && href === "/";
    const active = href === `/${segment}` || isHome;

    return (
        <Link
            href={href}
            className={cn(
                "text-muted-foreground  hover:text-primary whitespace-nowrap uppercase transition-colors",
                active ? "text-primary font-semibold" : ""
            )}
        >
            {children}
        </Link>
    );
};
export default NavLink;
