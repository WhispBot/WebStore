import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

import { env } from "~/env.mjs";
import Stripe from "stripe";
import { utapi } from "~/server/uploadthing";
const stripe = new Stripe(env.STRIPE_API_KEY, { apiVersion: "2023-10-16" });

export const stripeRouter = createTRPCRouter({
    products: publicProcedure.query(async () => {
        const result = await stripe.products.list({ expand: ["data.default_price"] });

        return result.data;
    }),
    product: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const result = await stripe.products.retrieve(input.id, {
                expand: ["default_price"],
            });

            return result;
        }),

    priceByProductId: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const result = await stripe.prices.search({
                query: `product:"${input.id}"`,
                expand: ["data.product"],
            });

            return result.data;
        }),

    createPrice: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                price: z.number(),
                currency: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const res = await stripe.prices.create({
                currency: input.currency,
                unit_amount: input.price * 100,
                product: input.id,
            });
            return res;
        }),

    createProduct: protectedProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async ({ input }) => {
            const result = await stripe.products.create({ name: input.name });
            return result;
        }),

    updateDefaultPrice: protectedProcedure
        .input(z.object({ id: z.string(), priceId: z.string() }))
        .mutation(async ({ input }) => {
            const res = await stripe.products.update(input.id, {
                default_price: input.priceId,
            });
            return res;
        }),

    updateProductImages: protectedProcedure
        .input(z.object({ id: z.string(), url: z.string().array() }))
        .mutation(async ({ input }) => {
            const result = await stripe.products.retrieve(input.id);

            const newImages = [...result.images, ...input.url];

            // if (newImages.length >= 8) throw new TRPCError({ code: "FORBIDDEN" });

            await stripe.products.update(input.id, {
                images: newImages,
            });
        }),

    deleteProductImages: protectedProcedure
        .input(z.object({ urls: z.string().array(), id: z.string() }))
        .mutation(async ({ input }) => {
            const product = await stripe.products.retrieve(input.id);

            const newImages = product.images.filter((url) => !input.urls.includes(url));

            const fileKeys = input.urls.reduce((acc: string[], obj) => {
                const splitArr = obj.split("/");
                const fileKey = splitArr[splitArr.length - 1] ?? "";
                acc.push(fileKey);

                return acc;
            }, []);
            await utapi.deleteFiles(fileKeys);
            const res = await stripe.products.update(input.id, {
                images: newImages.length <= 0 ? null : newImages,
            });
            return res;
        }),
});
