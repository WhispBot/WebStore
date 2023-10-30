"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { type Session } from "next-auth";
import { UserIcon, LogOutIcon, LogIn, Package } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";

interface ProfileDropdownProps {
    session: Session | null;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ session }) => {
    return (
        <>
            {!session ? (
                <div>
                    <Button
                        onClick={() => signIn()}
                        variant={"outline"}
                        size={"icon"}
                        className="bg-transparent"
                    >
                        <LogIn />
                    </Button>
                </div>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger className="">
                        <Avatar className="">
                            <AvatarImage src={session?.user.image ?? ""} />
                            <AvatarFallback className="uppercase text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                                {/* {session?.user.name?.charAt(0)} */}
                                <UserIcon />
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-72 p-4 text-primary"
                        onCloseAutoFocus={(e) => void e.preventDefault()}
                    >
                        <div>
                            <DropdownMenuItem className="flex gap-2 font-semibold">
                                <UserIcon />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-2 font-semibold ">
                                <Package />
                                Orders
                            </DropdownMenuItem>
                            {session?.user.role === "admin" ?? (
                                <DropdownMenuItem className="flex gap-2 font-semibold">
                                    DashBoard
                                </DropdownMenuItem>
                            )}
                        </div>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={() => signOut()}
                            className="flex gap-2 font-semibold"
                        >
                            <LogOutIcon />
                            Sign out
                        </DropdownMenuItem>

                        <div className="flex w-full select-none flex-col px-2 pt-2 text-muted-foreground">
                            <span>{session?.user.name}</span>
                            <span className="text-sm">{session?.user.role}</span>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    );
};

export default ProfileDropdown;
