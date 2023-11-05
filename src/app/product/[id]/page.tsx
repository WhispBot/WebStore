import React from "react";
import { api } from "~/trpc/server";

interface PageProps {
    params: { id: string };
    searchParams: Record<string, string | string[] | undefined>;
}

const Product: React.FC<PageProps> = async ({ params }) => {
    const id = `prod_${params.id.split("_")[0]}`;

    const product = await api.stripe.product.query({ id });

    return (
        <main className="flex-grow">
            <div className="container h-full border-x bg-card">
                <h1 className="text-4xl">{product.name}</h1>

                <div></div>
            </div>
        </main>
    );
};

export default Product;
