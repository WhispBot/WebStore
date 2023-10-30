import React from "react";

interface CurrencyProps {
    price: number;
    local: string;
    currency: string;
}

const Currency: React.FC<CurrencyProps> = ({ price, local, currency }) => {
    const formated = price.toLocaleString(local, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 1,
    });

    return <span>{formated}</span>;
};

export default Currency;
