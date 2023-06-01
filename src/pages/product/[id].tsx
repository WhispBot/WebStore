import type { InferGetServerSidePropsType, GetStaticProps } from "next";
import { api } from "~/utils/api";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import React from "react";
import Image from "next/image";

export const getStaticProps: GetStaticProps<{ id: string }> = async (context) => {
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: { prisma, session: null },
        transformer: superjson,
    });

    const id = context.params?.id as string;

    await helpers.product.getProductById.prefetch({ id });

    return {
        props: {
            trpcState: helpers.dehydrate(),
            id: id,
        },
    };
};

const Product: React.FC<InferGetServerSidePropsType<typeof getStaticProps>> = ({
    id,
}) => {
    const { data } = api.product.getProductById.useQuery({ id });

    return (
        <>
            <main className="flex h-full flex-1">
                <div className="container border-x bg-background pt-8">
                    <div>
                        <h1 className="text-4xl font-bold">{data?.name}</h1>
                        <ul className="flex gap-1 overflow-clip text-ellipsis text-accent-foreground">
                            {data?.tags.map((tag, index, arr) => (
                                <React.Fragment key={index}>
                                    <li key={tag.id} className="">
                                        {tag.text}
                                    </li>
                                    {arr.length - 1 !== index && "|"}
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                    <div className="grid grid-cols-[2fr_1fr] ">
                        <div className="flex flex-col rounded-md border">
                            <div className="aspect-video bg-secondary">
                                <Image
                                    src={data?.image as string}
                                    width={1000}
                                    height={1000}
                                    className="aspect-video h-[500px] object-contain"
                                    alt=""
                                />
                            </div>
                            <div className="aspect-video h-[100px]  p-4">
                                <div className="aspect-video bg-secondary">
                                    <Image
                                        src={data?.image as string}
                                        width={1000}
                                        height={1000}
                                        className="aspect-video h-[100px] object-contain"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </main>
        </>
    );
};

export const getStaticPaths = () => {
    return { paths: [], fallback: "blocking" };
};

export default Product;
