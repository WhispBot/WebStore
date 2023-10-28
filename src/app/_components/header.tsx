import { getServerAuthSession } from "~/server/auth";
import NavLink from "./nav-link";
import Link from "next/link";
import ProfileDropdown from "./profile-dropdown";
import ThemeToggle from "./toggle-theme";

export default async function Header() {
    const session = await getServerAuthSession();

    return (
        <nav className="flex h-20 select-none items-center justify-between border-b-2 bg-card py-4">
            <div className="container flex items-center justify-between">
                <div className="">
                    <Link href="/" className="font-semibold uppercase">
                        Shop
                    </Link>
                </div>
                <div className="flex gap-8">
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/products">Products</NavLink>
                    <NavLink href="/about">About</NavLink>
                </div>
                <div className="flex gap-4">
                    <ProfileDropdown session={session} />
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
