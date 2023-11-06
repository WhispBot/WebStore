"use client";
import { LinkIcon, Package } from "lucide-react";
import Link from "next/link";
import React from "react";
import type Stripe from "stripe";
import Currency from "~/app/_components/currency";
import { Separator } from "~/app/_components/ui/separator";
import dayjs from "dayjs";
import { buttonVariants } from "~/app/_components/ui/button";
import { cn } from "~/lib/utils";
import Image from "next/image";
import { api } from "~/trpc/react";
import ProductImages from "~/app/_components/product-images";
import ProductPrices from "~/app/_components/product-prices";

interface PageProps {
    params: { id: string };
    searchParams: Record<string, string | string[] | undefined>;
}

const Page: React.FC<PageProps> = ({ params }) => {
    const { data: product } = api.stripe.product.useQuery({ id: params.id });

    const priceObj = product?.default_price as Stripe.Price;

    const updated = dayjs(product?.updated ?? 0 * 1000);
    const created = dayjs(product?.created ?? 0 * 1000);

    return (
        <main className="space-y-6">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="">
                            <h3 className="text-lg font-medium">{product?.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                <Currency price={priceObj ?? null} />
                            </p>
                        </div>
                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-md border bg-secondary text-muted-foreground">
                            {product?.images.length ?? 0 > 0 ? (
                                <>
                                    <Image
                                        width={64}
                                        height={64}
                                        src={product?.images[0] ?? ""}
                                        alt=""
                                    />
                                </>
                            ) : (
                                <>
                                    <Package />
                                </>
                            )}
                        </div>
                    </div>

                    <Link
                        href={`https://dashboard.stripe.com/test/products/${params.id}`}
                        // className="flex w-fit items-center gap-1 font-semibold text-muted-foreground hover:text-foreground"
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            "flex gap-2"
                        )}
                        target="_blank"
                    >
                        <LinkIcon size={20} /> View product on stripe
                    </Link>
                </div>
                <Separator />
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
            <ProductPrices productId={params.id} />
            <ProductImages urls={product?.images} productId={params.id} />
        </main>
    );
};

export default Page;
