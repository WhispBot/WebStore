import { ArrowLeft, Calculator, LinkIcon, Package, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import type Stripe from "stripe";
import Currency from "~/app/_components/currency";
import { Separator } from "~/app/_components/ui/separator";
import { api } from "~/trpc/server";
import dayjs from "dayjs";
import { Button } from "~/app/_components/ui/button";
import DataTable from "../data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "~/app/_components/ui/card";

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
        <main className="h-full border-x ">
            <div className="flex flex-col gap-8 p-4">
                <div className="space-y-4">
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
                    <div className="">
                        <div>
                            <div className="flex gap-4">
                                <div className="flex items-center justify-center rounded-md border bg-secondary p-4 text-muted-foreground">
                                    <Package />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-2xl">{product.name}</span>
                                    <span>
                                        <Currency price={priceObj} />
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
                </div>

                {/* <Card>
                    <CardHeader>
                        <CardTitle className="flex justify-between">
                            <span>Pricing</span>
                            <Button variant="outline" className="">
                                <Plus />
                                Add
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {prices.length > 0 ? (
                            <div className="rounded-md border">
                                <DataTable columns={columns} data={prices} />
                            </div>
                        ) : (
                            <div className="flex h-28 flex-col items-center justify-center gap-2 border-t bg-muted/50">
                                <Calculator />
                                <span className=" text-sm font-semibold">
                                    {"There's no price."}
                                </span>
                            </div>
                        )}
                    </CardContent>
                </Card> */}

                <div className="">
                    <div className="flex items-center justify-between pb-4">
                        <span className="text-2xl font-semibold leading-none tracking-tight">
                            Pricing
                        </span>
                    </div>
                    {prices.length > 0 ? (
                        <div className="rounded-md border">
                            <DataTable columns={columns} data={prices} />
                        </div>
                    ) : (
                        <div className="flex h-28 flex-col items-center justify-center gap-2 border-t bg-muted/50">
                            <Calculator />
                            <span className=" text-sm font-semibold">
                                {"There's no price."}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Page;
