import { Heart } from "lucide-react";
import React from "react";
import type Stripe from "stripe";
import AddToCartButton from "~/app/_components/add-to-cart-button";
import Currency from "~/app/_components/currency";
import ImageCarousel from "~/app/_components/image-carousel";
import Tooltip from "~/app/_components/tooltip";
import { Button } from "~/app/_components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/app/_components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/app/_components/ui/tabs";
import { api } from "~/trpc/server";

interface PageProps {
    params: { id: string };
    searchParams: Record<string, string | string[] | undefined>;
}

const Product: React.FC<PageProps> = async ({ params }) => {
    const id = params.id.split("%20")[0] ?? "";
    const product = await api.stripe.product.query({ id });
    const price = product.default_price as Stripe.Price;

    return (
        <main className="flex-grow">
            <div className="container flex h-full flex-col gap-4 pt-4">
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
                <div></div>
            </div>
        </main>
    );
};

export default Product;
