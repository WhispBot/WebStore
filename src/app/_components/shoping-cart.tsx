"use client";
import { PopoverClose } from "@radix-ui/react-popover";
import { useAtomValue, useSetAtom } from "jotai";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "~/app/_components/ui/popover";
import {
    cartStorage,
    cartTotalPriceAtom,
    cartTotalQuantityAtom,
    removeCartItemAtom,
    updateCountAtom,
} from "~/lib/store";
import { cn } from "~/lib/utils";
import Currency from "./currency";
import { Button, buttonVariants } from "./ui/button";

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
    const totalQty = parseInt(useAtomValue(cartTotalQuantityAtom));
    const totalPrice = parseInt(useAtomValue(cartTotalPriceAtom));
    const items = useAtomValue(cartStorage);
    const removeCartItem = useSetAtom(removeCartItemAtom);
    const updateCartCount = useSetAtom(updateCountAtom);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    size={"icon"}
                    className="relative bg-transparent"
                >
                    {totalQty > 0 && (
                        <span className="absolute -bottom-2 -right-1 flex h-5 w-5 items-center justify-center rounded-md bg-foreground px-1 text-background">
                            {totalQty}
                        </span>
                    )}
                    <ShoppingCart />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-96 flex-col gap-4">
                {totalQty <= 0 ? (
                    <span className="text-center text-lg font-semibold text-muted-foreground">
                        Cart is empty
                    </span>
                ) : (
                    <>
                        <div className="border-b p-2">
                            <h2 className="text-2xl font-bold">Cart</h2>
                        </div>
                        <div className="space-y-3">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-2  ">
                                    <Image
                                        src={item.image ?? ""}
                                        alt={item.name}
                                        width={64}
                                        height={64}
                                        className="rounded-md border"
                                    />
                                    <div className="flex flex-grow flex-col justify-between ">
                                        <span className="font-bold">{item.name}</span>
                                        <span className="font-semibold">
                                            <Currency
                                                price={(item.price ?? 0) * item.quantity}
                                            />
                                        </span>
                                    </div>
                                    <div className="flex items-end gap-3">
                                        <Button
                                            variant="secondary"
                                            size="smIcon"
                                            onClick={() =>
                                                updateCartCount(
                                                    { id: item.id },
                                                    item.quantity - 1
                                                )
                                            }
                                        >
                                            <Minus size={20} />
                                        </Button>
                                        {item.quantity}
                                        <Button
                                            variant="secondary"
                                            size="smIcon"
                                            onClick={() =>
                                                updateCartCount(
                                                    { id: item.id },
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            <Plus size={20} />
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                removeCartItem({ id: item.id })
                                            }
                                            variant="destructive"
                                            size="smIcon"
                                        >
                                            <Trash size={20} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {totalQty > 0 && (
                    <>
                        <div className="flex justify-between bg-muted p-4 font-semibold">
                            <span className="">Total:</span>
                            <span>
                                <Currency price={totalPrice} />
                            </span>
                        </div>
                        <PopoverClose asChild>
                            <Link href="/cart" className={cn(buttonVariants())}>
                                To checkout
                            </Link>
                        </PopoverClose>
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
