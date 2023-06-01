import Link from "next/link";
import ThemeToggle from "./toggleTheme";
import { SearchIcon, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import Navigation from "./navigation";
import ShoppingCart from "./shopingCart";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-background shadow-md">
            <div className="  p-1 sm:border-none md:p-4 2xl:border-b">
                <div className="flex items-center  ">
                    <div className="container relative flex items-center justify-between gap-2 p-0">
                        <Link
                            className="rounded-bl-xl rounded-tr-xl bg-gradient-to-tr from-violet-500 to-teal-500 p-2 text-2xl font-bold tracking-widest text-primary-foreground"
                            href={"/"}
                        >
                            WebStore
                        </Link>
                        <div className="!visible hidden w-[700px] items-center rounded-lg border bg-secondary p-1 text-secondary-foreground md:flex 2xl:flex">
                            <input
                                placeholder="Search..."
                                className=" h-10 w-full rounded-full border-none bg-transparent p-2 text-xl outline-none placeholder:text-muted-foreground"
                            />
                            <Button className=" h-10 w-10 rounded-none rounded-br-lg rounded-tr-lg bg-gradient-to-tr from-violet-500 to-teal-500 p-2 hover:bg-primary/70">
                                <SearchIcon className="h-14 w-14 text-primary-foreground" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant={"ghost"} size={"sm"} className="p-2">
                                <UserIcon className="text-secondary-foreground" />
                            </Button>
                            <ShoppingCart />
                            <div className="flex gap-8">
                                <ThemeToggle />
                            </div>
                            {/* <Button></Button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="    border-b  p-2  md:hidden">
                <div className="!visible flex items-center rounded-lg border-b bg-secondary p-1 text-secondary-foreground md:hidden">
                    <input
                        placeholder="Search..."
                        className=" h-10 w-full rounded-full border-none bg-transparent p-2 text-xl outline-none placeholder:text-muted-foreground"
                    />
                    <Button className=" h-10 w-10 rounded-none rounded-br-lg rounded-tr-lg bg-primary p-2 hover:bg-primary/70">
                        <SearchIcon className="h-14 w-14 text-primary-foreground" />
                    </Button>
                </div>
            </div>
            <div className=" !visible hidden border-b 2xl:flex">
                <div className="container p-1">
                    <Navigation />
                </div>
            </div>
        </header>
    );
};

export default Header;
