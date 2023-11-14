import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import NavLink from "./nav-link";
import ProfileDropdown from "./profile-dropdown";
import ShopingCart from "./shoping-cart";
import ThemeToggle from "./toggle-theme";

export default async function Header() {
    const session = await getServerAuthSession();

    return (
        <nav className="sticky top-0 flex h-16 select-none items-center justify-between border-b-2 bg-background py-4">
            <div className="container flex items-center justify-between">
                <div className="">
                    <Link href="/" className="font-semibold uppercase">
                        Shop
                    </Link>
                </div>
                <div className="flex gap-8">
                    <NavLink href="/products/stickers">Stickers</NavLink>
                    <NavLink href="/products/posters">Posters</NavLink>
                </div>
                <div className="flex gap-4">
                    <ShopingCart />
                    <ProfileDropdown session={session} />
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
