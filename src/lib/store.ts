import { atomWithStorage } from "jotai/utils";

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

export const shoppingCartStorage = atomWithStorage<Cart[]>("cart", []);
