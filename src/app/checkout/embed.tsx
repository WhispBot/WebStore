"use client";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { env } from "~/env.mjs";
import { api } from "~/trpc/react";

interface EmbedProps {
    email: string;
}

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Embed: React.FC<EmbedProps> = ({ email }) => {
    const [secret, setSecret] = useState<string | null>(null);

    const { mutate } = api.stripe.checkoutSession.useMutation({
        onSuccess: (res) => {
            setSecret(res);
        },
    });

    useEffect(() => {
        mutate({
            email: email,
            items: [
                {
                    price: "price_1O9RG0HN414GCozdMtWFuKeH",
                    quantity: 1,
                },
                {
                    price: "price_1O82ASHN414GCozdom3uHPaD",
                    quantity: 2,
                },
            ],
        });
    }, []);

    return (
        <>
            {secret && (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret: secret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </>
    );
};

export default Embed;
