import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";
import type Stripe from "stripe";
import Currency from "~/app/_components/currency";
import ImageCarousel from "~/app/_components/image-carousel";
import Tooltip from "~/app/_components/tooltip";
import { Button, buttonVariants } from "~/app/_components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/app/_components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/app/_components/ui/tabs";
import { cn } from "~/lib/utils";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import AddToCartButton from "./add-to-cart-button";

interface PageProps {
    params: { id: string };
    searchParams: Record<string, string | string[] | undefined>;
}

const Product: React.FC<PageProps> = async ({ params }) => {
    const session = await getServerAuthSession();

    const id = `prod_${params.id.split("_")[0]}`;
    const product = await api.stripe.product.query({ id });
    const price = product.default_price as Stripe.Price;

    const type = product.metadata.type;
    return (
        <main className="flex-grow">
            <div className="container flex h-full flex-col gap-4 pt-4">
                <div className="flex justify-between rounded-sm border bg-card">
                    <div>
                        <Link
                            href="/products"
                            className={cn(
                                buttonVariants({ variant: "link", size: "sm" })
                            )}
                        >
                            products
                        </Link>
                        <span className="text-muted-foreground">/</span>
                        <Link
                            href={`/products/${type}s`}
                            className={cn(
                                "",
                                buttonVariants({ variant: "link", size: "sm" })
                            )}
                        >
                            {`${type}s`}
                        </Link>
                    </div>
                    {session?.user.role === "admin" && (
                        <Link
                            className={cn(
                                "",
                                buttonVariants({ variant: "link", size: "sm" })
                            )}
                            href={`/dashboard/products/${id}`}
                        >
                            Admin dashboard
                        </Link>
                    )}
                </div>
                <div className="flex gap-4 px-16">
                    <ImageCarousel images={product.images} />
                    <div className="flex w-full flex-col">
                        <div className="flex-grow">
                            <h1 className="text-2xl font-bold">{product.name}</h1>
                            <p className="text-muted-foreground">{product.description}</p>
                        </div>
                        <div className="flex items-center justify-start gap-4">
                            <div>
                                <span className="text-3xl font-bold ">
                                    <Currency price={price} />
                                </span>
                            </div>
                            <AddToCartButton
                                product={{
                                    id: product.id,
                                    description: product.description ?? "",
                                    image: product.images[0] ?? "",
                                    name: product.name,
                                    price: price.unit_amount ?? 0,
                                    quantity: 1,
                                }}
                            />
                            <Tooltip content="Add to wishlist" side="right">
                                <Button variant="outline" size="icon">
                                    <Heart size={20} />
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <Tabs defaultValue="overview" className="flex-grow">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                                <CardDescription></CardDescription>
                            </CardHeader>
                            <CardContent></CardContent>
                            <CardFooter></CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="reviews">
                        <Card>
                            <CardHeader>
                                <CardTitle>Reviews</CardTitle>
                                <CardDescription></CardDescription>
                            </CardHeader>
                            <CardContent></CardContent>
                            <CardFooter></CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
};

export default Product;
