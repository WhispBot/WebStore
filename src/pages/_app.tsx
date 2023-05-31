import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";
import Header from "~/components/header/header";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <ThemeProvider attribute="class">
                <div>
                    <Header />
                    <Component {...pageProps} />
                </div>
            </ThemeProvider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
