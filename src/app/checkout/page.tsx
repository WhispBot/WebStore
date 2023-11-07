import React, { useEffect } from "react";
import Embed from "./embed";
import { getServerAuthSession } from "~/server/auth";

const Checkout = async () => {
    const session = await getServerAuthSession();

    return (
        <div className="flex flex-grow items-center justify-center">
            <div
                className="container overflow-hidden rounded-md bg-card bg-white p-8"
                id="checkout"
            >
                <Embed email={session?.user.email ?? ""} />
            </div>
        </div>
    );
};

export default Checkout;
