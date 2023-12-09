"use client";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React from "react";
import { cartStorage, cartTotalPriceAtom } from "~/lib/store";
import Currency from "../_components/currency";
import { Button } from "../_components/ui/button";

const Cart = () => {
    const items = useAtomValue(cartStorage);
    const total = useAtomValue(cartTotalPriceAtom);

    return (
        <div className="container flex flex-1 flex-col justify-between gap-4 px-32 py-4">
            <div className="space-y-4">
                <h2 className="text-4xl font-semibold">{"Your cart"}</h2>
                {items.map((item) => (
                    <div key={item.id} className="flex rounded-md border bg-card">
                        <Image
                            className="w-32"
                            src={item.image}
                            width={688}
                            height={386}
                            alt={item.name}
                        />
                        <div className="flex flex-col justify-between py-1">
                            <span className="font-semibold">{item.name}</span>
                            <span>
                                <Currency price={item.price} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-4 rounded-md bg-card p-4">
                <span className="text-muted-foreground">Total:</span>
                <span className="text-3xl font-semibold">
                    <Currency price={Number(total)} />
                </span>
                <Button>Checkout</Button>
            </div>
        </div>
    );
};

export default Cart;
