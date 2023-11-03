import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

import { env } from "~/env.mjs";
import Stripe from "stripe";
const stripe = new Stripe(env.STRIPE_API_KEY, { apiVersion: "2023-10-16" });

export const stripeRouter = createTRPCRouter({
    getProducts: publicProcedure.query(async () => {
        const result = await stripe.products.list({ expand: ["data.default_price"] });

        return result.data;
    }),
    getProduct: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const result = await stripe.products.retrieve(input.id, {
                expand: ["default_price"],
            });

            return result;
        }),

    getPriceByProductId: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const result = await stripe.prices.search({
                query: `product:"${input.id}"`,
                expand: ["data.product"],
            });

            return result.data;
        }),

    createProduct: protectedProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async ({ input }) => {
            const result = await stripe.products.create({ name: input.name });
            return result;
        }),
});
