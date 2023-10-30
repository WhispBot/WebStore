"use client";

import React from "react";
import { Button } from "./ui/button";
import { useAtom } from "jotai";
import { shoppingCartStorage } from "./shoping-cart";
import type Stripe from "stripe";

interface ProductCardProps {
    product: Stripe.Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [cart, setCart] = useAtom(shoppingCartStorage);

    const addItem = (product: Stripe.Product) => {
        const price = product.default_price;

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
        <div>
            {product.name}
            <Button onClick={() => addItem(product)}>add to cart</Button>
        </div>
    );
};

export default ProductCard;
