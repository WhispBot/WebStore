import React from "react";

interface CurrencyProps {
    price: number | null;
    local?: string;
    currency?: string;
}

const Currency: React.FC<CurrencyProps> = ({
    price,
    local = "sv-SE",
    currency = "SEK",
}) => {
    if (price === null) return <></>;

    const convert = price / 100;

    const formated = convert.toLocaleString(local, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 1,
    });

    return <>{formated}</>;
};

export default Currency;
