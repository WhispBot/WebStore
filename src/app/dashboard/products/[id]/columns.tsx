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

            return (
                <div className="flex gap-2">
                    <span className="font-semibold">
                        <Currency price={priceObj} />
                    </span>
                    <div>
                        {id === value.default_price && (
                            <Badge className="bg-sky-200 text-sky-900 hover:bg-sky-200">
                                Default
                            </Badge>
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
                    {/* <span>{value}</span> */}
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
                        <DropdownMenuContent align="end">
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
