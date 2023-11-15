"use client";
import React from "react";
import { api } from "~/trpc/react";
import ProductCard from "../_components/cards/product-card";
import LoadingSpinner from "../_components/loading-spinner";
import { Button } from "../_components/ui/button";

const Products = () => {
    const { data, isInitialLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
        api.stripe.productInfinite.useInfiniteQuery(
            {
                limit: 9,
            },
            {
                getNextPageParam: (lastPage) =>
                    lastPage.has_more
                        ? lastPage.data[lastPage.data.length - 1]?.id
                        : null,
            }
        );

    return (
        <div>
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
        </div>
    );
};

export default Products;
