import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "~/components/ui/navigation-menu";

const Navigation = () => {
    return (
        <NavigationMenu className=" text-secondary-foreground">
            <NavigationMenuList className="">
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Games</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-6 text-secondary-foreground ">
                        <div>
                            <h1 className="text-3xl font-bold">Games</h1>
                        </div>
                        <ul className="grid h-[500px] w-[1343px] ">
                            <NavigationMenuLink className="">Link</NavigationMenuLink>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Gaming</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-6">
                        <ul className="grid h-[500px] w-[1343px] ">
                            <NavigationMenuLink className="">Link</NavigationMenuLink>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Computer & addons</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-6">
                        <ul className="grid h-[500px] w-[1343px] ">
                            <NavigationMenuLink className="">Link</NavigationMenuLink>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Network & Smart Home</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-6">
                        <ul className="grid h-[500px] w-[1343px] ">
                            <NavigationMenuLink className="">Link</NavigationMenuLink>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Tv, Sound & Image</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-6">
                        <ul className="grid h-[500px] w-[1343px] ">
                            <NavigationMenuLink className="">Link</NavigationMenuLink>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Apple</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-6">
                        <ul className="grid h-[500px] w-[1343px] ">
                            <NavigationMenuLink className="">Link</NavigationMenuLink>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Mobile</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-6">
                        <ul className="grid h-[500px] w-[1343px] ">
                            <NavigationMenuLink className="">Link</NavigationMenuLink>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Home & Health</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-6">
                        <ul className="grid h-[500px] w-[1343px] ">
                            <NavigationMenuLink className="">Link</NavigationMenuLink>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Toys & Hobbys</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-6">
                        <ul className="grid h-[500px] w-[1343px] ">
                            <NavigationMenuLink className="">Link</NavigationMenuLink>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Bargain goods</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-6">
                        <ul className="grid h-[500px] w-[1343px] ">
                            <NavigationMenuLink className="">Link</NavigationMenuLink>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default Navigation;
