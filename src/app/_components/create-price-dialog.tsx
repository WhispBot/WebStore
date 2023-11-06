import React from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Car, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { api } from "~/trpc/react";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
    currency: z.string(),
    price: z.string().min(0),
    pricingModel: z.string(),
    type: z.string(),
});

interface CreatePriceDialog {
    productId: string;
}

const CreatePriceDialog: React.FC<CreatePriceDialog> = ({ productId }) => {
    const { toast } = useToast();
    const utils = api.useUtils();

    const { mutate } = api.stripe.createPrice.useMutation({
        onSuccess: () => {
            toast({
                title: "Price added!",
            });
        },
        onSettled: () => {
            void utils.stripe.priceByProductId.invalidate({ id: productId });
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currency: "sek",
            price: "",
            pricingModel: "per_unit",
            type: "one_time",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate({
            id: productId,
            price: Number(values.price),
            currency: values.currency,
        });
    };

    const isNumber = (char: string) => {
        if (/^\d+$/.test(char)) {
            return char;
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex gap-2" size="sm" variant="secondary">
                    <Plus />
                    Add price
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 sm:max-w-[425px]">
                <DialogHeader className="p-4">
                    <DialogTitle>Add new price</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <div className="flex justify-center border-y bg-muted p-4">
                            <div className="w-2/3 space-y-6">
                                <FormField
                                    control={form.control}
                                    name="pricingModel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Pricing model</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="per_unit">
                                                        Standard Pricing
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-4">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder=""
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(
                                                                isNumber(e.target.value)
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="currency"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Currency</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="sek">
                                                            SEK
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel></FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex space-x-1"
                                                >
                                                    {/* <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="Recurring" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Recurring
                                                        </FormLabel>
                                                    </FormItem> */}
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="one_time" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            One time
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 p-4">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Add</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePriceDialog;
