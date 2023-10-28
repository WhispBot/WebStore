import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

import { env } from "~/env.mjs";
import Stripe from "stripe";
const stripe = new Stripe(env.STRIPE_API_KEY, { apiVersion: "2023-10-16" });

interface ProductWirthPrice {
    product_id: string;
    price_id: string;
    name: string;
    price: number | null;
    active: boolean;
    images: string[];
    description: string | null;
}

export const stripeRouter = createTRPCRouter({
    getProducts: publicProcedure.query(async () => {
        const result = await stripe.products.list({ expand: ["data.default_price"] });

        //
        // const tempArr: ProductWirthPrice[] = [];
        // result.data.forEach((obj) => {
        //     price.data.forEach((price) => {
        //         if (price.product === obj.id) {
        //             tempArr.push({
        //                 product_id: obj.id,
        //                 price_id: price.id,
        //                 name: obj.name,
        //                 price: price.unit_amount,
        //                 active: obj.active,
        //                 images: obj.images,
        //                 description: obj.description,
        //             });
        //         }
        //     });
        // });

        return result.data;
    }),
});
