import { Separator } from "../_components/ui/separator";

const Page = () => {
    return (
        <main className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Dashboard</h3>
                <p className="text-sm text-muted-foreground">Overview off the shop</p>
            </div>
            <Separator />
            <div></div>
        </main>
    );
};

export default Page;
