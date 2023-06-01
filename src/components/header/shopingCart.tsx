import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, ShoppingCartIcon, XIcon } from "lucide-react";
import { useAtom } from "jotai";
import {
    CartAtom,
    cartAtomUpdateCount,
    cartAtomDelete,
} from "~/components/atoms/cartAtom";

const ShoppingCart = () => {
    const [cart] = useAtom(CartAtom);
    const [, cartUpdate] = useAtom(cartAtomUpdateCount);
    const [, cartDelete] = useAtom(cartAtomDelete);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"ghost"} size={"sm"} className=" p-2 ">
                    <div className="relative">
                        {cart.length !== 0 && (
                            <span className="absolute -top-2 right-0 flex h-5 w-5 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                {cart.length}
                            </span>
                        )}
                        <ShoppingCartIcon className="mr-2 "></ShoppingCartIcon>
                    </div>
                    {cart.length !== 0 && (
                        <span className="!visible hidden lg:flex">
                            {cart.reduce((acc, obj) => acc + obj.product.price, 0)}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent
                size="sm"
                className="flex w-full flex-col justify-between xl:w-1/4"
            >
                <div className="space-y-4">
                    <SheetHeader>
                        <SheetTitle className="flex items-center text-4xl font-bold">
                            <ShoppingCartIcon className="mr-4 h-9 w-9" />
                            Cart
                        </SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <ul className="space-y-2">
                        {cart.map((item) => {
                            return (
                                <li key={item.id} className="rounded-md bg-secondary/30">
                                    <div className="relative flex justify-between p-2 ">
                                        <span className="text-xl">
                                            {item.product.name}
                                        </span>
                                        <div className="flex items-center gap-4">
                                            <span>{item.product.price}</span>
                                            <Button
                                                variant="destructive"
                                                className=" h-5 w-5 p-0"
                                                onClick={() => void cartDelete(item.id)}
                                            >
                                                <XIcon className="" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end gap-2 p-2">
                                        <Button
                                            onClick={() =>
                                                void cartUpdate({
                                                    id: item.id,
                                                    value:
                                                        item.count === 1
                                                            ? item.count
                                                            : item.count - 1,
                                                })
                                            }
                                            variant="secondary"
                                            className="h-5 w-5 p-0"
                                        >
                                            <MinusIcon />
                                        </Button>
                                        <span className="rounded-md bg-secondary/40 px-5">
                                            {item.count}
                                        </span>
                                        <Button
                                            onClick={() =>
                                                void cartUpdate({
                                                    id: item.id,
                                                    value: item.count + 1,
                                                })
                                            }
                                            variant="secondary"
                                            className="h-5 w-5  p-0"
                                        >
                                            <PlusIcon />
                                        </Button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="space-y-4">
                    <div>
                        <span className="text-lg font-bold">
                            Total: {cart.reduce((acc, obj) => acc + obj.product.price, 0)}{" "}
                            $
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
