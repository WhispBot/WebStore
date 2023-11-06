"use client";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "~/app/_components/ui/popover";
import { useAtom } from "jotai";
import { Button } from "./ui/button";
import Link from "next/link";
import Currency from "./currency";
import { shoppingCartStorage } from "~/lib/store";

export interface Cart {
    id: string;
    product: CartItem;
    count: number;
}

interface CartItem {
    productId: string;
    name: string;
    image: string;
    price: number;
}

const ShopingCart = () => {
    const [cart, setCart] = useAtom(shoppingCartStorage);

    const updateCount = (id: string, newCount: number) => {
        const newCart = [...cart];
        const filter = newCart.filter((item) => item.id === id)[0];
        if (filter !== undefined && newCount > 0) {
            filter.count = newCount;
            setCart([filter]);
        }
    };

    const removeItem = (id: string) => {
        const newCart = [...cart];
        const filter = newCart.filter((item) => item.id !== id)[0];
        if (filter !== undefined) {
            setCart([filter]);
        } else {
            setCart([]);
        }
    };

    const total = cart.reduce((acc, obj) => {
        const sum = obj.product.price * obj.count;

        const total = acc + sum;

        return total;
    }, 0);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} size={"icon"} className="bg-transparent">
                    <ShoppingCart />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-96 flex-col gap-4">
                {/* <div className="border-b p-3">
                    <h2 className="text-2xl font-bold">Shopping cart</h2>
                </div> */}
                <div className="">
                    {cart.length === 0 ? (
                        <div className="flex justify-center ">
                            <span className=" text-xl font-bold text-muted-foreground">
                                Your Cart is Empty
                            </span>
                        </div>
                    ) : (
                        <ul className="flex flex-col gap-1">
                            {cart.map((item) => (
                                <li key={item.id} className="flex h-full border-b">
                                    <div className="h-16 w-16 bg-muted"></div>
                                    <div className="flex h-full w-full flex-col justify-between gap-4 px-2">
                                        <div className="flex justify-between">
                                            <Link href={"/"} className="">
                                                {item.product.name}
                                            </Link>
                                            <Currency
                                                price={item.product.price * item.count}
                                            />
                                        </div>
                                        <div className="flex h-full items-end justify-end">
                                            <div></div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-3">
                                                    <Button
                                                        variant={"outline"}
                                                        size={"smIcon"}
                                                        onClick={() =>
                                                            updateCount(
                                                                item.id,
                                                                item.count - 1
                                                            )
                                                        }
                                                    >
                                                        <Minus size={16} />
                                                    </Button>
                                                    <span>{item.count}</span>
                                                    <Button
                                                        variant={"outline"}
                                                        size={"smIcon"}
                                                        onClick={() =>
                                                            updateCount(
                                                                item.id,
                                                                item.count + 1
                                                            )
                                                        }
                                                    >
                                                        <Plus size={16} />
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Button
                                                        variant={"outline"}
                                                        size={"smIcon"}
                                                        onClick={() =>
                                                            removeItem(item.id)
                                                        }
                                                    >
                                                        <Trash size={16} />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {cart.length !== 0 && (
                    <>
                        <div className="flex justify-between bg-muted p-4 font-semibold">
                            <span className="">Sum:</span>
                            <div>
                                <Currency price={total} currency="SEK" local="sv-SE" />
                            </div>
                        </div>
                        <Button>Checkout</Button>
                    </>
                )}
            </PopoverContent>
        </Popover>
    );
};

const CartItem = () => {
    return <div></div>;
};

export default ShopingCart;
