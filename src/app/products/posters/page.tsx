"use client";
import React from "react";
import ProductCard from "~/app/_components/cards/product-card";
import LoadingSpinner from "~/app/_components/loading-spinner";
import { Button } from "~/app/_components/ui/button";
import { api } from "~/trpc/react";

const Posters = () => {
    const { data, fetchNextPage, hasNextPage, isInitialLoading, isFetchingNextPage } =
        api.stripe.productByType.useInfiniteQuery(
            { type: "poster", limit: 9 },
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
                    <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                        {isFetchingNextPage ? <LoadingSpinner /> : <>Load more</>}
                    </Button>
                </div>
            )}
        </>
    );
};

export default Posters;
