"use client";

import React from "react";
import { Button } from "./ui/button";
import { useAtom } from "jotai";
import { shoppingCartStorage } from "./shoping-cart";
import type Stripe from "stripe";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import Currency from "./currency";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
    product: Stripe.Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [cart, setCart] = useAtom(shoppingCartStorage);
    const price = product.default_price as Stripe.Price;

    const addItem = (product: Stripe.Product) => {
        if (typeof price === "object") {
            if (price !== null) {
                setCart([
                    ...cart,
                    {
                        id: product.id,
                        product: {
                            name: product.name,
                            productId: product.id,
                            image: product.images[0] ?? "",
                            price: price.unit_amount ?? 0,
                        },
                        count: 1,
                    },
                ]);
            }
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Link
                        href={`/product/${
                            product.id.split("_")[1]
                        }_${product.name.replace(" ", "_")}`}
                    >
                        {product.name}
                    </Link>
                </CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-64 w-64 rounded border">
                    <Image
                        width={1025}
                        height={1025}
                        src={product.images[0] ?? ""}
                        alt={`no image`}
                    />
                </div>
            </CardContent>
            <CardFooter className="justify-between">
                <Currency price={price} />
                <Button onClick={() => addItem(product)} size="icon">
                    <ShoppingCart size={20} />
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
