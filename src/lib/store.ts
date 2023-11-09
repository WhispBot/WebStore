import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface Product {
    id: string;
    name: string;
    image: string;
    description: string;
    quantity: number;
    price: number | null;
}

export const cartStorage = atomWithStorage<Product[]>("cart", []);

export const addToCartAtom = atom(null, (get, set, update: Product) => {
    const cart = get(cartStorage);
    const current = cart.find((product) => product.id === update.id);

    if (!current) {
        set(cartStorage, [...cart, update]);
    } else {
        set(
            cartStorage,
            cart.map((product) => {
                if (product.id === current.id) {
                    return { ...product, quantity: product.quantity + update.quantity };
                }
                return product;
            })
        );
    }
});

export const removeCartItemAtom = atom(null, (get, set, update: Pick<Product, "id">) => {
    const cart = get(cartStorage);
    const updateCart = cart.filter((item) => item.id !== update.id);
    set(cartStorage, updateCart);
});

export const updateCountAtom = atom(
    null,
    (get, set, update: Pick<Product, "id">, newCount: number) => {
        const cart = get(cartStorage);
        const updateCart = cart.map((item) => ({
            ...item,
            quantity:
                item.id === update.id ? (newCount <= 1 ? 1 : newCount) : item.quantity,
        }));
        set(cartStorage, updateCart);
    }
);

export const cartTotalQuantityAtom = atom((get) =>
    get(cartStorage)
        .reduce((acc, obj) => acc + obj.quantity, 0)
        .toFixed(2)
);

export const cartTotalPriceAtom = atom((get) =>
    get(cartStorage)
        .reduce((acc, obj) => acc + (obj.price ?? 0) * obj.quantity, 0)
        .toFixed(2)
);
