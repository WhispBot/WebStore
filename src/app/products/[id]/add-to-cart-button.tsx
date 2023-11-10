"use client";
import { useSetAtom } from "jotai";
import React from "react";
import { Button } from "~/app/_components/ui/button";
import { addToCartAtom, type Product } from "~/lib/store";

interface AddToCartButtonProps {
    product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
    const addToCart = useSetAtom(addToCartAtom);

    return (
        <Button size="lg" onClick={() => addToCart(product)}>
            Add to cart
        </Button>
    );
};

export default AddToCartButton;
