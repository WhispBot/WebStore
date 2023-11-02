"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Package } from "lucide-react";
import Link from "next/link";
import type Stripe from "stripe";
import Currency from "~/app/_components/currency";
import { Button } from "~/app/_components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";

export type StripeProduct = Pick<Stripe.Product, "name" | "id" | "default_price">;

export const columns: ColumnDef<StripeProduct>[] = [
    {
        id: "image",
        cell: ({ row }) => {
            return (
                <div className="flex justify-center">
                    <div className="flex items-center justify-center rounded-md border bg-secondary p-2 text-muted-foreground">
                        <Package />
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const value: string = row.getValue("name");
            return <div className="w-[44rem]">{value}</div>;
        },
    },
    {
        accessorKey: "default_price",
        header: () => <div className="whitespace-nowrap text-right">Default price</div>,
        cell: ({ row }) => {
            const priceObj: Stripe.Price = row.getValue("default_price");

            return (
                <div className="text-right font-medium">
                    <Currency price={priceObj.unit_amount} />
                </div>
            );
        },
    },
    {
        id: "action",
        cell: ({ row }) => {
            const product = row.original;

            return (
                <div className="flex justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            onCloseAutoFocus={(e) => void e.preventDefault()}
                        >
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/products/${product.id}`}>
                                    View product
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-semibold text-primary">
                                Delete product
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
