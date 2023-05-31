import Link from "next/link";
import ThemeToggle from "./toggleTheme";
import { SearchIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import Navigation from "./navigation";
import ShoppingCart from "./shopingCart";

const Header = () => {
    return (
        <header className="sticky top-0">
            <div className=" border-b-2 border-primary p-4">
                <div className="flex items-center ">
                    <div className="container relative flex items-center justify-between p-0">
                        <Link
                            className="rounded-bl-xl rounded-tr-xl bg-primary p-2 text-2xl font-bold tracking-widest text-primary-foreground"
                            href={"/"}
                        >
                            WebStore
                        </Link>
                        <div className="flex w-[500px] items-center rounded-full  bg-secondary p-2 text-secondary-foreground">
                            <input
                                placeholder="Search..."
                                className=" h-10 w-full max-w-lg rounded-full border-none bg-transparent p-2 text-xl outline-none placeholder:text-muted-foreground"
                            />
                            <Button className=" h-10 w-10 rounded-br-full rounded-tr-full bg-primary p-2 hover:bg-primary/70">
                                <SearchIcon className="h-14 w-14 text-primary-foreground" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="grid h-10 w-10 place-content-center rounded-full bg-secondary">
                                <UserIcon className="text-secondary-foreground" />
                            </div>
                            <ShoppingCart />
                            <div className="flex gap-8">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" border ">
                <div className="container p-1">
                    <Navigation />
                </div>
            </div>
        </header>
    );
};

export default Header;
