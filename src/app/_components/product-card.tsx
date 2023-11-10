"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type Stripe from "stripe";
import { cn } from "~/lib/utils";
import Currency from "./currency";
import { buttonVariants } from "./ui/button";

interface ProductCardProps {
    product: Stripe.Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const price = product.default_price as Stripe.Price;

    return (
        <div className="w-[400px] rounded-md border">
            <div className="flex justify-center overflow-hidden border-b">
                <Image
                    src={product.images[0] ?? ""}
                    alt={product.name}
                    width={688}
                    height={386}
                />
            </div>
            <div className="flex items-end justify-between p-4">
                <div className="space-y-3 pt-4">
                    <h3 className="font-bold">{product.name}</h3>
                    {/* <p className="text-muted-foreground">{product.description}</p> */}
                    <p className="font-semibold">
                        <Currency price={price} />
                    </p>
                </div>

                <Link
                    className={cn(buttonVariants())}
                    href={`/products/${product.id.split("_")[1]}_${product.name.replace(
                        " ",
                        "_"
                    )}`}
                >
                    View
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
