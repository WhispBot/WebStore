import React from "react";
import DataTable from "./data-table";
import { columns } from "./columns";
import { api } from "~/trpc/server";

const Page = async () => {
    const data = await api.stripe.getProducts.query();

    return (
        <div className="">
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Page;
