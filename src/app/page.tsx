// import Link from "next/link";

// import { CreatePost } from "~/app/_components/create-post";
// import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/server";
import ProductCard from "./_components/product-card";
import { Button, buttonVariants } from "./_components/ui/button";

export default async function Home() {
    const res = await api.stripe.products.query();

    // const hello = await api.post.hello.query({ text: "from tRPC" });
    // const session = await getServerAuthSession();

    return (
        <main className="container flex-grow">
            <div className="grid h-[700px] max-h-full grid-cols-4 grid-rows-3 gap-2">
                <div className="col-span-3 row-span-2 flex flex-col items-center justify-center gap-8 border bg-muted/25">
                    <span className="text-4xl font-semibold uppercase">
                        {" - featured -"}
                    </span>
                    <Link
                        href={"/"}
                        className={cn(buttonVariants({ variant: "outlinePrimary" }), "")}
                    >
                        Shop now
                    </Link>
                </div>
                <div className="row-span-2  border bg-muted/25 p-10">
                    <div className="flex h-full w-full flex-col items-center justify-center gap-8 border-2 ">
                        <span className="text-4xl font-semibold uppercase">
                            {" - 50% off-"}
                        </span>
                        <Link
                            href={"/"}
                            className={cn(
                                buttonVariants({ variant: "outlinePrimary" }),
                                ""
                            )}
                        >
                            Shop now
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-8 border bg-muted/25">
                    <span className="text-2xl font-semibold uppercase">
                        {" - Stickers -"}
                    </span>
                    <Link
                        href={"/"}
                        className={cn(buttonVariants({ variant: "outlinePrimary" }), "")}
                    >
                        Shop now
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center gap-8 border bg-muted/25">
                    <span className="text-2xl font-semibold uppercase">
                        {" - Posters -"}
                    </span>
                    <Link
                        href={"/"}
                        className={cn(buttonVariants({ variant: "outlinePrimary" }), "")}
                    >
                        Shop now
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center gap-8 border bg-muted/25">
                    <span className="text-2xl font-semibold uppercase">
                        {" - Clothing -"}
                    </span>
                    <Link
                        href={"/"}
                        className={cn(buttonVariants({ variant: "outlinePrimary" }), "")}
                    >
                        Shop now
                    </Link>
                </div>
                <div className="flex flex-col items-center justify-center gap-8 border bg-muted/25">
                    <span className="text-2xl font-semibold uppercase">
                        {" - Accessories -"}
                    </span>
                    <Link
                        href={"/"}
                        className={cn(buttonVariants({ variant: "outlinePrimary" }), "")}
                    >
                        Shop now
                    </Link>
                </div>
            </div>
            <div className="py-16 text-center font-bold uppercase">products</div>
            <div className="">
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px_,_1fr))] gap-4">
                    {res.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            </div>
            <div className="py-16 text-center font-bold uppercase"></div>
        </main>
    );
}
