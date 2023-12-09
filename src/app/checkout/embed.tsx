"use client";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { env } from "~/env.mjs";
import { cartToCheckoutAtom } from "~/lib/store";
import { api } from "~/trpc/react";

interface EmbedProps {
    email: string;
}

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Embed: React.FC<EmbedProps> = ({ email }) => {
    const cartItems = useAtomValue(cartToCheckoutAtom);
    const [secret, setSecret] = useState<string | null>(null);

    const { mutate } = api.stripe.checkoutSession.useMutation({
        onSuccess: (res) => {
            setSecret(res);
        },
    });

    useEffect(() => {
        if (email) {
            mutate({
                email: email,
                items: cartItems,
            });
        } else {
            mutate({
                items: cartItems,
            });
        }
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
