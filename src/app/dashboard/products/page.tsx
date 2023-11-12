import React from "react";
import CreateProductDialog from "~/app/_components/create-product-dialog";
import { Separator } from "~/app/_components/ui/separator";
import { api } from "~/trpc/server";
import { columns } from "./columns";
import DataTable from "./data-table";

const Page = async () => {
    const data = await api.stripe.products.query();

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
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
};

export default Page;
