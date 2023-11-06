"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Clipboard, MoreHorizontal } from "lucide-react";
import type Stripe from "stripe";
import Currency from "~/app/_components/currency";
import { Button } from "~/app/_components/ui/button";
import { Input } from "~/app/_components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "~/app/_components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import Link from "next/link";
import { Badge } from "~/app/_components/ui/badge";
import { api } from "~/trpc/react";
import { useToast } from "~/app/_components/ui/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "~/app/_components/ui/alert-dialog";
import { useState } from "react";

export type StripePrice = Pick<
    Stripe.Price,
    "id" | "unit_amount" | "currency" | "product"
>;

export const columns: ColumnDef<StripePrice>[] = [
    {
        accessorKey: "unit_amount",
        header: () => <span className="text-xs uppercase">price</span>,
        cell: ({ row }) => {
            const priceObj: Stripe.Price | null = row.getValue("unit_amount");
            const value = row.original.product as Stripe.Product;
            const id = row.original.id;
            const c = row.original.currency;

            return (
                <div className="flex gap-4">
                    <div className="flex gap-1">
                        <span className="font-semibold">
                            <Currency price={priceObj} />
                        </span>
                        <span className="font-semibold uppercase">{c}</span>
                    </div>
                    <div>
                        {id === value.default_price && (
                            <Badge variant="outlinePrimary">Default</Badge>
                        )}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "id",
        header: () => <span className="text-xs uppercase">ID</span>,
        cell: ({ row }) => {
            const value: string = row.getValue("id");

            return (
                <div className="flex gap-2">
                    <Input value={value} className="max-w-[300px]" />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant="outline" size="icon">
                                    <span className="sr-only">Open menu</span>
                                    <Clipboard size={16} />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                Copy to ClipBoard
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            );
        },
    },
    {
        id: "action",
        cell: ({ row }) => {
            const id = row.original.id;
            const product = row.original.product as Stripe.Product;

            return (
                <div className="flex justify-center">
                    <Aciton product={product} priceId={id} />
                </div>
            );
        },
    },
];

const Aciton: React.FC<{ product: Stripe.Product; priceId: string }> = ({
    product,
    priceId,
}) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const utils = api.useUtils();

    const { mutate } = api.stripe.updateDefaultPrice.useMutation({
        onSuccess: () => {
            toast({
                title: "Default set!",
            });
        },
        onSettled: () => {
            void utils.stripe.priceByProductId.invalidate({ id: product.id });
        },
    });

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href={`/dashboard/products/${priceId}`} target="_blank">
                            View price
                        </Link>
                    </DropdownMenuItem>
                    {priceId !== product.default_price && (
                        <DropdownMenuItem
                            onClick={() => mutate({ id: product.id, priceId: priceId })}
                        >
                            Set as default
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                        className="font-semibold text-primary"
                        onClick={() => setOpen(!open)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
                {/* <AlertDialogTrigger>Delete price</AlertDialogTrigger> */}
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete price</AlertDialogTitle>
                        <AlertDialogDescription>
                            {`If you want to delete this price you need to goto stipes dashboard`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Link
                                href={`https://dashboard.stripe.com/test/prices/${priceId}`}
                                target="_blank"
                            >
                                Goto stripe
                            </Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
