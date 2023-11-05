import React from "react";

import type Stripe from "stripe";

interface CurrencyProps {
    price: Stripe.Price | null | number;
    local?: string;
    currency?: string;
}

const Currency: React.FC<CurrencyProps> = ({
    price,
    local = "sv-SE",
    currency = "SEK",
}) => {
    if (typeof price === "number") {
        const convert = price / 100;
        const formated = convert.toLocaleString(local, {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 1,
        });
        return <>{formated}</>;
    }

    if (price === null) return <>No Prices</>;

    if (price.unit_amount === null) return <>No Prices</>;

    const convert = price.unit_amount / 100;

    const formated = convert.toLocaleString(local, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
    });

    return <>{formated}</>;
};

export default Currency;
