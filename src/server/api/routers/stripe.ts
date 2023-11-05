import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

import { env } from "~/env.mjs";
import Stripe from "stripe";
import { utapi } from "~/server/uploadthing";
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

    updateProduct: protectedProcedure
        .input(z.object({ id: z.string(), url: z.string().array() }))
        .mutation(async ({ input }) => {
            const result = await stripe.products.retrieve(input.id);

            const newImages = [...result.images, ...input.url];

            // if (newImages.length >= 8) throw new TRPCError({ code: "FORBIDDEN" });

            await stripe.products.update(input.id, {
                images: newImages,
            });
        }),

    getImages: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const res = await stripe.products.retrieve(input.id);
            return res.images;
        }),

    DeleteImage: protectedProcedure
        .input(z.object({ url: z.string(), id: z.string() }))
        .mutation(async ({ input }) => {
            const product = await stripe.products.retrieve(input.id);
            const newimages = product.images.filter((url) => input.url !== url);
            const splitArr = input.url.split("/");
            const fileKey = splitArr[splitArr.length - 1] ?? "";

            await utapi.deleteFiles(fileKey);
            const res = await stripe.products.update(input.id, { images: newimages });

            return res;
        }),
});
