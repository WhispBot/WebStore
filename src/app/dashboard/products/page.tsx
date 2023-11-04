import React from "react";
import DataTable from "./data-table";
import { columns } from "./columns";
import { api } from "~/trpc/server";
import CreateDialog from "~/app/_components/create-dialog";
import { Separator } from "~/app/_components/ui/separator";

const Page = async () => {
    const data = await api.stripe.getProducts.query();
    // const addMutation = api.stripe.createProduct;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium">Products table</h3>
                    <p className="text-sm text-muted-foreground">
                        List of all the products
                    </p>
                </div>
                <CreateDialog />
            </div>
            <Separator />

            <div className="">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
};

export default Page;
