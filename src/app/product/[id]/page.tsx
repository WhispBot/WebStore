import { type PageProps } from ".next/types/app/page";
import React from "react";

const Page: React.FC<PageProps> = ({ params }) => {
    console.log(params);
    return <div>Page</div>;
};

export default Page;
