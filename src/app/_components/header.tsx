import { getServerAuthSession } from "~/server/auth";
import NavLink from "./nav-link";
import Link from "next/link";
import ProfileDropdown from "./profile-dropdown";
import ThemeToggle from "./toggle-theme";
import ShopingCart from "./shoping-cart";

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
                    <NavLink href="/product">Stickers</NavLink>
                    <NavLink href="/product">Posters</NavLink>
                    <NavLink href="/product">Accessories</NavLink>
                    <NavLink href="/product">t-shirts</NavLink>
                    {/* <NavLink href="/about">About</NavLink> */}
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
