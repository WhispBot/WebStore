import { redirect } from "next/navigation";
import React from "react";
import { api } from "~/trpc/server";

interface PageProps {
    params: { id: string };
    searchParams: Record<string, string | string[] | undefined>;
}

const Return: React.FC<PageProps> = async ({ searchParams }) => {
    const sessionId = searchParams.session_id ?? "";
    const data = await api.stripe.returnSession.query({ sessionId: sessionId as string });

    if (data.status === "open") {
        redirect("/");
    }

    if (data.status === "complete") {
        return (
            <div>
                <section id="success">
                    <p>
                        We appreciate your business! A confirmation email will be sent to{" "}
                        {data.customer_email}. If you have any questions, please email{" "}
                        <a href="mailto:orders@example.com">orders@example.com</a>.
                    </p>
                </section>
            </div>
        );
    }

    return null;
};

export default Return;
