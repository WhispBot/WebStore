"use client";
import React from "react";
import LoadingSpinner from "~/app/_components/loading-spinner";
import ProductCard from "~/app/_components/product-card";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";

const Posters = () => {
    const { data, fetchNextPage, hasNextPage, isInitialLoading, isLoading } =
        api.stripe.productByType.useInfiniteQuery(
            { type: "poster", limit: 1 },
            {
                getNextPageParam: (lastPage) => lastPage.next_page,
            }
        );
    return (
        <>
            <section className="grid grid-cols-[repeat(auto-fill,_minmax(350px_,_1fr))] gap-4">
                {data?.pages.map((page) => (
                    <>
                        {page?.data.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                    </>
                ))}
            </section>
            {isInitialLoading && (
                <div className="flex justify-center">
                    <LoadingSpinner size={48} />
                </div>
            )}
            {hasNextPage && (
                <div className="flex justify-center">
                    <Button onClick={() => fetchNextPage()} disabled={isLoading}>
                        {isLoading ? <LoadingSpinner size={48} /> : <>Load more</>}
                    </Button>
                </div>
            )}
        </>
    );
};

export default Posters;
