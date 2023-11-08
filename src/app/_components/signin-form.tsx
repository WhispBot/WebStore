"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
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
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

const SignInFrom = () => {
    const searchParams = useSearchParams();

    const callbackUrl = searchParams.get("callbackUrl") ?? undefined;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        void signIn("credentials", {
            username: values.email,
            password: values.password,
            redirect: true,
            callbackUrl: callbackUrl,
        });
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
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
