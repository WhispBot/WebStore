import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const result = await ctx.prisma.product.findMany({
            include: { rating: true, tags: true },
        });

        return result;
    }),

    getProductById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const result = await ctx.prisma.product.findUnique({
                where: {
                    id: input.id,
                },
                include: {
                    tags: true,
                    rating: true,
                    category: true,
                },
            });
            return result;
        }),

    addProduct: publicProcedure
        .input(
            z.object({
                name: z.string(),
                image: z.string(),
                price: z.number(),
                categoryName: z.string(),
                categoryId: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const result = await ctx.prisma.product.create({
                data: {
                    name: input.name,
                    image: input.image,
                    price: input.price,
                    category: {
                        connectOrCreate: {
                            where: {
                                id: input.categoryId,
                            },
                            create: {
                                name: input.categoryName,
                            },
                        },
                    },
                    rating: {
                        create: {
                            rate: 0,
                            count: 0,
                        },
                    },
                    tags: {
                        create: {
                            text: "",
                        },
                    },
                },
            });

            return result;
        }),
});
