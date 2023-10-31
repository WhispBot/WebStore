import Link from "next/link";
import React from "react";
import SignInFrom from "~/app/_components/signin-form";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

const SignIn = async () => {
    const session = await getServerAuthSession();

    if (session) redirect("/");

    return (
        <main className="absolute left-0 top-0 h-full w-full select-none bg-background">
            <div className="flex h-16 select-none items-center justify-center border-b-2 bg-card py-4">
                <Link href="/" className="font-semibold uppercase">
                    Shop
                </Link>
            </div>
            <div className="flex justify-center pt-10">
                <SignInFrom />
            </div>
        </main>
    );
};

export default SignIn;
