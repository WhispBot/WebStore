"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type Stripe from "stripe";
import { cn } from "~/lib/utils";
import Currency from "../currency";
import Tooltip from "../tooltip";
import { Button, buttonVariants } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

interface ProductCardProps {
    product: Stripe.Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const price = product.default_price as Stripe.Price;

    return (
        <Card>
            <CardContent className="relative p-0">
                <Link
                    href={`/products/${product.metadata.type}s/${
                        product.id.split("_")[1]
                    }_${product.name.replace(" ", "_")}`}
                >
                    <Image
                        src={product.images[0] ?? ""}
                        alt={product.name}
                        width={688}
                        height={386}
                        className="aspect-video"
                    />
                </Link>

                <Tooltip content="Add to wishlist" side="left">
                    <Button
                        className="absolute right-0 top-0"
                        variant="ghost"
                        size="icon"
                    >
                        <Heart size={20} className={cn("text-muted-foreground")} />
                    </Button>
                </Tooltip>
            </CardContent>
            <CardFooter className="flex items-end justify-between border-t p-2">
                <div className="space-y-4">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-lg font-bold ">
                        <Currency price={price} />
                    </p>
                </div>
                <Link
                    className={cn(buttonVariants({ size: "sm" }))}
                    href={`/products/${product.metadata.type}s/${
                        product.id.split("_")[1]
                    }_${product.name.replace(" ", "_")}`}
                >
                    View
                </Link>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
