"use client";
import { Grid, List } from "lucide-react";
import React from "react";
import LoadingSpinner from "~/app/_components/loading-spinner";
import ProductCard from "~/app/_components/product-card";
import { Button } from "~/app/_components/ui/button";
import { Checkbox } from "~/app/_components/ui/checkbox";
import { Label } from "~/app/_components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/app/_components/ui/select";
import { api } from "~/trpc/react";

const Stickers = () => {
    const { data, fetchNextPage, hasNextPage, isInitialLoading } =
        api.stripe.productByType.useInfiniteQuery(
            { type: "sticker", limit: 10 },
            {
                getNextPageParam: (lastPage) => lastPage.next_page,
            }
        );
    return (
        <main className="container flex flex-grow gap-4">
            <div className="hidden h-[32rem] w-52 rounded-md border bg-muted/50 p-4 lg:flex">
                <Button size="sm">Filter</Button>
            </div>
            <div className="flex-grow space-y-4 p-0">
                <div className="flex justify-end gap-4 space-x-2 rounded-md border bg-muted/50 p-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="stock" />
                        <Label
                            htmlFor="stock"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Products in stock
                        </Label>
                    </div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Newest first</SelectItem>
                            <SelectItem value="dark">Oldest first</SelectItem>
                            <SelectItem value="dark">Price: low to high</SelectItem>
                            <SelectItem value="dark">Price: high to low</SelectItem>
                            <SelectItem value="system">Name: A-Z</SelectItem>
                            <SelectItem value="system">Name: Z-A</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <section className="grid grid-cols-[repeat(auto-fill,_minmax(350px_,_1fr))] gap-4">
                    {data?.pages.map((page) => (
                        <>
                            {page?.data.map((product) => (
                                <ProductCard product={product} key={product.id} />
                            ))}
                        </>
                    ))}
                    {isInitialLoading && <LoadingSpinner size={48} />}
                </section>
                {hasNextPage && (
                    <Button onClick={() => fetchNextPage()}>Load more</Button>
                )}
            </div>
        </main>
    );
};

export default Stickers;
