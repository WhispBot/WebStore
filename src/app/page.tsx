// import Link from "next/link";

// import { CreatePost } from "~/app/_components/create-post";
// import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import ProductCard from "./_components/product-card";

export default async function Home() {
    const res = await api.stripe.products.query();

    // const hello = await api.post.hello.query({ text: "from tRPC" });
    // const session = await getServerAuthSession();

    return (
        <main className="">
            <div className="flex gap-2">
                {res.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </main>
    );
}
