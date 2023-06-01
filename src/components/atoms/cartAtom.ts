import { type Product } from "@prisma/client";
import { atom } from "jotai";
import { uuid } from "~/lib/utils";

interface CartItem {
    id: string;
    count: number;
    product: Product;
}

export const CartAtom = atom<CartItem[]>([]);

const deleteCartItem = (cart: CartItem[], id: string) =>
    cart.filter((item) => item.id !== id);

const updateCartCount = (cart: CartItem[], id: string, count: number): CartItem[] => {
    return cart.map((item) => ({
        ...item,
        count: item.id === id ? count : item.count,
    }));
};

const addCartItem = (
    cart: CartItem[],
    id: string,
    name: string,
    price: number,
    image: string
) => [
    ...cart,
    {
        id: uuid(),
        count: 1,
        product: {
            id,
            name,
            price,
            image,
        },
    },
];

export const cartAtomUpdateCount = atom(
    () => 0,
    (get, set, { id, value }: { id: string; value: number }) => {
        set(CartAtom, updateCartCount(get(CartAtom), id, value));
    }
);

export const cartAtomAdd = atom(
    () => 0,
    (
        get,
        set,
        {
            id,
            name,
            price,
            image,
        }: { id: string; name: string; price: number; image: string }
    ) => {
        set(CartAtom, addCartItem(get(CartAtom), id, name, price, image));
    }
);

export const cartAtomDelete = atom(
    () => 0,
    (get, set, id: string) => {
        set(CartAtom, deleteCartItem(get(CartAtom), id));
    }
);
