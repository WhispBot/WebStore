import { ArrowLeft, Clipboard, LinkIcon, MoreHorizontal, Package } from "lucide-react";
import Link from "next/link";
import React from "react";
import type Stripe from "stripe";
import Currency from "~/app/_components/currency";
import { Separator } from "~/app/_components/ui/separator";
import { api } from "~/trpc/server";
import dayjs from "dayjs";
import { Input } from "~/app/_components/ui/input";
import { Button } from "~/app/_components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "~/app/_components/ui/tooltip";

interface PageProps {
    params: { id: string };
    searchParams: Record<string, string | string[] | undefined>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
    // const id = `prod_${params.id.split("_")[0]}`;

    const product = await api.stripe.getProduct.query({ id: params.id });
    const prices = await api.stripe.getPriceByProductId.query({ id: params.id });

    const priceObj = product.default_price as Stripe.Price;

    const updated = dayjs(product.updated * 1000);
    const created = dayjs(product.created * 1000);

    return (
        <main className="">
            <div className="p-4">
                <div className="flex justify-between">
                    <Link
                        href="/dashboard/products"
                        className="flex w-fit items-center gap-1 font-semibold text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft size={20} /> Products
                    </Link>

                    <Link
                        href={`https://dashboard.stripe.com/test/products/${product.id}`}
                        className="flex w-fit items-center gap-1 font-semibold text-muted-foreground hover:text-foreground"
                        target="_blank"
                    >
                        <LinkIcon size={20} /> View product on stripe
                    </Link>
                </div>
                <div className="pt-4">
                    <div>
                        <div className="flex gap-4">
                            <div className="flex items-center justify-center rounded-md border bg-secondary p-4 text-muted-foreground">
                                <Package />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl">{product.name}</span>
                                <span>
                                    <Currency price={priceObj.unit_amount} />
                                </span>
                            </div>
                        </div>
                        <div>
                            <span></span>
                        </div>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex h-12 items-center gap-2">
                        <div className="flex flex-col ">
                            <span className="text-muted-foreground">Updated</span>
                            <span>{updated.format("DD MMM. YYYY")}</span>
                        </div>
                        <Separator orientation="vertical" />
                        <div className="flex flex-col">
                            <span className="text-muted-foreground">Created</span>
                            <span>{created.format("DD MMM. YYYY")}</span>
                        </div>
                    </div>
                </div>
                <div className="pt-10">
                    <span className=" text-3xl font-bold">Prices</span>
                    <Separator className="my-2" />
                    <div>
                        {prices.map((price) => (
                            <div
                                key={price.id}
                                className="flex items-center justify-between gap-2"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">
                                        <Currency price={price.unit_amount} />
                                    </span>

                                    {price.id === priceObj.id && (
                                        <span className="rounded bg-sky-200 px-2 font-semibold text-sky-800">
                                            Defualt
                                        </span>
                                    )}
                                </div>
                                <div className="flex min-w-[350px] items-center gap-2">
                                    <Input value={price.id} />
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button variant="outline" size="icon">
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                    <Clipboard size={16} />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                Copy to ClipBoard
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="icon">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal size={16} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem></DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-10">
                        <span className=" text-3xl font-bold">Metadata</span>
                        <Separator className="my-2" />
                        <div></div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Page;
