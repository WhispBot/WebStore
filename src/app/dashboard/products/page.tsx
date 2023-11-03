import React from "react";
import DataTable from "./data-table";
import { columns } from "./columns";
import { api } from "~/trpc/server";
import { Button } from "~/app/_components/ui/button";
import { Plus } from "lucide-react";
import CreateDialog from "~/app/_components/create-dialog";

const Page = async () => {
    const data = await api.stripe.getProducts.query();
    // const addMutation = api.stripe.createProduct;

    return (
        <div className="">
            <div className="flex justify-between px-4 py-2">
                <span className="text-3xl font-bold">Products table</span>

                <CreateDialog />
            </div>
            <div className="">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
};

export default Page;
