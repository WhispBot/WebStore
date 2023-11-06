"use client";
import React from "react";
import { Separator } from "./ui/separator";
import LoadingSpinner from "./loading-spinner";
import DataTable from "../dashboard/products/data-table";
import { columns } from "../dashboard/products/[id]/columns";
import { Calculator } from "lucide-react";
import { api } from "~/trpc/react";
import CreatePriceDialog from "./create-price-dialog";

interface ProductPriceProps {
    productId: string;
}

const ProductPrices: React.FC<ProductPriceProps> = ({ productId }) => {
    const { data, isLoading } = api.stripe.priceByProductId.useQuery({ id: productId });

    return (
        <div className="">
            <div className="flex items-center justify-between ">
                <h3 className="text-lg font-medium">Pricing</h3>
                <div>
                    <CreatePriceDialog productId={productId} />
                </div>
            </div>
            <Separator className="mb-4 mt-1" />
            {isLoading ? (
                <div className="flex h-40 flex-col items-center justify-center gap-2">
                    <LoadingSpinner />
                </div>
            ) : (
                <>
                    {data?.length ?? 0 > 0 ? (
                        <div className="">
                            <DataTable columns={columns} data={data ?? []} />
                        </div>
                    ) : (
                        <div className="flex h-40 flex-col items-center justify-center gap-2">
                            <Calculator />
                            <span className=" text-sm font-semibold">
                                {"There's no price."}
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductPrices;
