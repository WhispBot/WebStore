"use client";
import { useAtomValue } from "jotai";
import React from "react";
import { cartStorage } from "~/lib/store";

const Cart = () => {
    const items = useAtomValue(cartStorage);

    return (
        <div>
            {items.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
};

export default Cart;
