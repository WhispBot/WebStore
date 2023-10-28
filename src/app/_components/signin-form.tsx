"use client";

import React from "react";
import { z } from "zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/app/_components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
    username: z.string().min(4).max(20),
    password: z.string(),
});

const SignInFrom = () => {
    const searchParams = useSearchParams();

    const callbackUrl = searchParams.get("callbackUrl") ?? undefined;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const res = void signIn("credentials", {
            username: values.username,
            password: values.password,
            redirect: true,
            callbackUrl: callbackUrl,
        });
        console.log(res);
    };

    return (
        <Card>
            <CardHeader className="border-b ">
                <CardTitle>Sign in to your SHOP account</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="min-w-[400px] pt-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {/* This is your public display name. */}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""
                                            {...field}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {/* This is your public display name. */}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex items-center  gap-2">
                        <Button type="submit">Sign in</Button>
                        <span className="text-sm"> or </span>
                        <div className="flex items-center gap-1">
                            <Link href={"/"} className="text-xs underline">
                                Create account
                            </Link>
                            -
                            <Link href={"/"} className="text-xs underline">
                                Forgot password
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default SignInFrom;
