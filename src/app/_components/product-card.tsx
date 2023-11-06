"use client";

import React from "react";
import { Button } from "./ui/button";
import { useAtom } from "jotai";
import type Stripe from "stripe";
import Link from "next/link";
import Currency from "./currency";
import { Package, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { shoppingCartStorage } from "~/lib/store";

interface ProductCardProps {
    product: Stripe.Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [cart, setCart] = useAtom(shoppingCartStorage);
    const price = product.default_price as Stripe.Price;

    const addItem = (product: Stripe.Product) => {
        const price = product.default_price as Stripe.Price;

        const filterCurrent = cart.filter(({ id }) => id === product.id);
        const filter = cart.filter(({ id }) => id !== product.id);

        if (filterCurrent.length > 0) {
            const count = filterCurrent[0]?.count ?? 0;
            setCart([
                ...filter,
                {
                    id: product.id,
                    product: {
                        name: product.name,
                        productId: product.id,
                        image: product.images[0] ?? "",
                        price: price.unit_amount ?? 0,
                    },
                    count: count + 1,
                },
            ]);
        } else {
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
    };

    return (
        <div className="flex h-[400px] flex-col  justify-between overflow-hidden rounded-md border bg-muted/25">
            <div className="flex flex-col items-center gap-6">
                {product.images.length > 0 ? (
                    <Link
                        href={`/product/${
                            product.id.split("_")[1]
                        }_${product.name.replace(" ", "_")}`}
                    >
                        <div className="hover:bg-muted">
                            <Image
                                width={256}
                                height={256}
                                src={product.images[0] ?? ""}
                                alt={`no image`}
                            />
                        </div>
                    </Link>
                ) : (
                    <Link
                        href={`/product/${
                            product.id.split("_")[1]
                        }_${product.name.replace(" ", "_")}`}
                        className="flex h-[256px] w-[256px] items-center justify-center"
                    >
                        <Package size={48} />
                    </Link>
                )}

                <Link
                    className="text-lg font-bold transition-colors hover:text-muted-foreground "
                    href={`/product/${product.id.split("_")[1]}_${product.name.replace(
                        " ",
                        "_"
                    )}`}
                >
                    {product.name}
                </Link>
            </div>

            <div className="flex items-center justify-between border-t  p-4">
                <span className="text-lg font-semibold text-primary">
                    <Currency price={price} />
                </span>
                <Button
                    onClick={() => addItem(product)}
                    variant="outlinePrimary"
                    size="icon"
                >
                    <ShoppingCart size={20} />
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
