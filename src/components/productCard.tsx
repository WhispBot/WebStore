import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
// import { type Product } from "./atoms/productAtom";
import type { Product, Tag, Rating } from "@prisma/client";
import { cartAtomAdd } from "./atoms/cartAtom";
import { useAtom } from "jotai";

const ProductCard: React.FC<{
    discount: { discount: number };
    product: Product & {
        rating: Rating | null;
        tags: Tag[];
    };
}> = ({ product, discount }) => {
    const [, cartAdd] = useAtom(cartAtomAdd);

    return (
        <div className="min-w-[100%] max-w-[100%] flex-[0_0_25%] select-none p-1 sm:min-w-[50%] sm:max-w-[50%] lg:min-w-[25%] lg:max-w-[25%]">
            <div className="flex h-full flex-col justify-between rounded-md border">
                <div>
                    <Link
                        href={`/product/${product.id}`}
                        className="flex aspect-video items-center justify-center border-b bg-secondary/40"
                    >
                        {product.image !== "" ? (
                            <Image
                                width={300}
                                height={300}
                                src={product.image}
                                alt="Image"
                                className=" h-full w-full rounded-md object-contain"
                            />
                        ) : (
                            <span className="text-muted-foreground">No Image</span>
                        )}
                    </Link>
                    <div className="flex overflow-clip text-ellipsis whitespace-nowrap p-2 ">
                        <Link
                            href={`/product/${product.id}`}
                            className="text-lg font-semibold hover:underline"
                        >
                            <span>{product.name}</span>
                        </Link>
                        <ul className="flex  gap-1 overflow-clip text-ellipsis text-sm text-muted-foreground">
                            {product.tags.map((tag, index, arr) => (
                                <React.Fragment key={index}>
                                    <li key={tag.id} className="">
                                        {tag.text}
                                    </li>
                                    {arr.length - 1 !== index && "|"}
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex items-end justify-between p-2">
                    <div className="flex items-center gap-2">
                        <div>{product.rating?.rate}</div>
                        <div className="text-sm text-muted-foreground">
                            ({product.rating?.count})
                        </div>
                    </div>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="hidden h-fit p-1 md:block"
                        onClick={() =>
                            void cartAdd({
                                id: product.id,
                                name: product.name,
                                image: product.image,
                                price: product.price,
                            })
                        }
                    >
                        Add to cart
                    </Button>
                    <div className="text-right">
                        <div
                            className={cn(
                                "rounded-md text-lg font-semibold",
                                discount.discount !== 0 &&
                                    "text-sm font-normal line-through"
                            )}
                        >
                            {product.price} kr
                        </div>
                        {discount.discount !== 0 && discount.discount !== undefined && (
                            <div
                                className={cn(
                                    "rounded-md text-lg font-semibold",
                                    discount.discount !== 0 && "text-red-500"
                                )}
                            >
                                {product.price - discount.discount} kr
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
