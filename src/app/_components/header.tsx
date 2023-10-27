import { getServerAuthSession } from "~/server/auth";
import NavLink from "./nav-link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { EnterIcon } from "@radix-ui/react-icons";

async function Header() {
    const session = await getServerAuthSession();

    return (
        <nav className="flex select-none items-center justify-between border-b-2 p-6">
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
            <div>
                {!session ? (
                    <div>
                        <Link
                            href={session ? "/api/auth/signout" : "/api/auth/signin"}
                            className=""
                        >
                            {session ? "Sign out" : <EnterIcon />}
                        </Link>
                    </div>
                ) : (
                    <>
                        {session.user.role === "admin" ?? <></>}
                        <Avatar>
                            <AvatarImage src={session?.user.image ?? ""} />
                            <AvatarFallback className="uppercase">
                                {session?.user.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                    </>
                )}
            </div>
        </nav>
    );
}
export default Header;
