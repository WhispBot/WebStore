"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import type Stripe from "stripe";
import Currency from "~/app/_components/currency";
import { Button } from "~/app/_components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";

export type StripeProduct = Pick<
    Stripe.Product,
    "name" | "id" | "active" | "default_price" | "description"
>;

export const columns: ColumnDef<StripeProduct>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "active",
        header: "Active",
    },
    {
        accessorKey: "default_price",
        header: "Default price",
        cell: ({ row }) => {
            const priceObj: Stripe.Price = row.getValue("default_price");

            const amount = priceObj.unit_amount ?? 0;

            return <Currency price={amount / 100} />;
        },
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        id: "action",
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        onCloseAutoFocus={(e) => void e.preventDefault()}
                    >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
