import { Calculator, ImageIcon, LinkIcon, Package, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import type Stripe from "stripe";
import Currency from "~/app/_components/currency";
import { Separator } from "~/app/_components/ui/separator";
import { api } from "~/trpc/server";
import dayjs from "dayjs";
import { buttonVariants } from "~/app/_components/ui/button";
import DataTable from "../data-table";
import { columns } from "./columns";
import { cn } from "~/lib/utils";
import Image from "next/image";
import UploadButton from "~/app/_components/upload-button";
import ProductImage from "~/app/_components/product-image";

interface PageProps {
    params: { id: string };
    searchParams: Record<string, string | string[] | undefined>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const product = await api.stripe.getProduct.query({ id: params.id });
    const prices = await api.stripe.getPriceByProductId.query({ id: params.id });

    const priceObj = product.default_price as Stripe.Price;

    const updated = dayjs(product.updated * 1000);
    const created = dayjs(product.created * 1000);

    return (
        <main className="space-y-6">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="">
                            <h3 className="text-lg font-medium">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                <Currency price={priceObj} />
                            </p>
                        </div>
                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-md border bg-secondary text-muted-foreground">
                            {product.images.length > 0 ? (
                                <>
                                    <Image
                                        width={64}
                                        height={64}
                                        src={product.images[0] ?? ""}
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
                        href={`https://dashboard.stripe.com/test/products/${product.id}`}
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
            <Separator />
            <div className="">
                <div className="flex items-center justify-between pb-4">
                    <h3 className="text-lg font-medium">Pricing</h3>
                </div>
                {prices.length > 0 ? (
                    <div className="rounded-md border">
                        <DataTable columns={columns} data={prices} />
                    </div>
                ) : (
                    <div className="flex h-40 flex-col items-center justify-center gap-2 border-t bg-muted/50">
                        <Calculator />
                        <span className=" text-sm font-semibold">
                            {"There's no price."}
                        </span>
                    </div>
                )}
            </div>
            <Separator />
            <div className="">
                <div className="flex items-center justify-between pb-4">
                    <h3 className="text-lg font-medium">Images</h3>
                    <div>
                        <UploadButton productId={params.id} />
                    </div>
                </div>
                {product.images.length > 0 ? (
                    <div className="flex gap-4">
                        {product.images.map((url) => (
                            <ProductImage key={url} url={url} productId={params.id} />
                        ))}
                    </div>
                ) : (
                    <div className="flex h-40 flex-col items-center justify-center gap-2 border-t bg-muted/50">
                        <ImageIcon />
                        <span className=" text-sm font-semibold">
                            {"There's no Imgaes."}
                        </span>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Page;
