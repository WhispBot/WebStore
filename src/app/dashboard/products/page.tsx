"use client";
import React from "react";
import CreateProductDialog from "~/app/_components/dialogs/create-product-dialog";
import LoadingSpinner from "~/app/_components/loading-spinner";
import { Separator } from "~/app/_components/ui/separator";
import { api } from "~/trpc/react";
import { columns } from "./columns";
import DataTable from "./data-table";

const Page = () => {
    const { data, isLoading } = api.stripe.products.useQuery();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Products table</h3>
                    <p className="text-sm text-muted-foreground">
                        List of all the products
                    </p>
                </div>
                <CreateProductDialog />
            </div>
            <Separator />
            <div className="">
                {isLoading ? (
                    <div className="flex justify-center">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <DataTable columns={columns} data={data ?? []} />
                )}
            </div>
        </div>
    );
};

export default Page;
