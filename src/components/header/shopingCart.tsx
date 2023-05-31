import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";

const test = [
    { id: "s", title: "Asus laptop 14", price: 14999 },
    { id: "3", title: "Iphone 13", price: 9999 },
];

const ShoppingCart = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"ghost"} size={"sm"} className="p-2">
                    <ShoppingCartIcon className="mr-2 " />
                    <span>{test.reduce((acc, obj) => acc + obj.price, 0)}</span>
                </Button>
            </SheetTrigger>
            <SheetContent size="sm" className="flex flex-col justify-between">
                <div className="space-y-4">
                    <SheetHeader>
                        <SheetTitle className="flex items-center text-4xl font-bold">
                            <ShoppingCartIcon className="mr-4 h-9 w-9" />
                            Cart
                        </SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <ul className="space-y-1">
                        {test.map((item) => {
                            return (
                                <div key={item.id} className="rounded-md border">
                                    <div className="flex justify-between  p-4">
                                        <span className="text-xl">{item.title}</span>
                                        <div className="flex flex-col">
                                            <span>{item.price}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between p-2">
                                        <Button className="h-8 w-8 rounded-bl-full rounded-tl-full p-0">
                                            <MinusIcon />
                                        </Button>
                                        <span className="w-full border-y text-center">
                                            1
                                        </span>
                                        <Button className="h-8 w-8 rounded-br-full rounded-tr-full p-0">
                                            <PlusIcon />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </ul>
                </div>
                <div className="space-y-4">
                    <div>
                        <span className="text-lg font-bold">
                            Total: {test.reduce((acc, obj) => acc + obj.price, 0)} $
                        </span>
                    </div>
                    <Button className="w-full text-lg" size="lg">
                        To Checkout
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};
export default ShoppingCart;
