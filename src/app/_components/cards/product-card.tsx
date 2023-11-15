"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type Stripe from "stripe";
import { cn } from "~/lib/utils";
import Currency from "../currency";
import { buttonVariants } from "../ui/button";

interface ProductCardProps {
    product: Stripe.Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const price = product.default_price as Stripe.Price;

    return (
        <div className="flex flex-col justify-between rounded-md border ">
            <div
                className="flex aspect-video items-center justify-center overflow-hidden"
                style={{}}
            >
                <Image
                    src={product.images[0] ?? ""}
                    alt={product.name}
                    width={688}
                    height={386}
                    className="aspect-video"
                />
            </div>
            <div className="flex items-end justify-between border-t p-4">
                <div className="space-y-4 ">
                    <h3 className="font-bold">{product.name}</h3>
                    {/* <p className="text-muted-foreground">{product.description}</p> */}
                    <p className="font-semibold">
                        <Currency price={price} />
                    </p>
                </div>

                <Link
                    className={cn(buttonVariants())}
                    href={`/products/${product.metadata.type}s/${
                        product.id.split("_")[1]
                    }_${product.name.replace(" ", "_")}`}
                >
                    View
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
