"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

interface NavLinkprops extends React.PropsWithChildren {
    href: string;
    className?: string;
}

const NavLink: React.FC<NavLinkprops> = ({ href, children, className }) => {
    const pathName = usePathname();
    const active = href === pathName;

    return (
        <Link
            href={href}
            className={cn(
                "whitespace-nowrap uppercase text-muted-foreground transition-colors hover:text-primary",
                active ? "font-semibold text-primary" : "",
                className && className
            )}
        >
            {children}
        </Link>
    );
};
export default NavLink;
