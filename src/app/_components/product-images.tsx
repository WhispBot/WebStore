"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { api } from "~/trpc/react";
import { ImageIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { cn } from "~/lib/utils";
import { Separator } from "./ui/separator";
import UploadButton from "./upload-button";
import LoadingSpinner from "./loading-spinner";

interface ProductImageProps {
    urls: string[] | undefined;
    productId: string;
}

const ProductImages: React.FC<ProductImageProps> = ({ productId, urls }) => {
    const { toast } = useToast();
    const utils = api.useUtils();
    const [selected, setSelected] = useState<string[]>([]);
    const [edit, setEdit] = useState(false);

    const { mutate, isLoading } = api.stripe.deleteProductImages.useMutation({
        onSuccess: () => {
            toast({
                title: "Image Deleted",
            });
        },
        onSettled: () => {
            void utils.stripe.product.invalidate({ id: productId });
            setSelected([]);
            setEdit(false);
        },
    });

    const handleSelected = (url: string) => {
        if (!edit) return;

        const isSelected = selected.find((selected) => selected === url);
        if (!isSelected) {
            setSelected([...selected, url]);
        } else {
            const filterSelected = selected.filter((selected) => selected !== url);
            setSelected(filterSelected);
        }
    };

    const handleDelete = () => {
        if (selected.length <= 0) setEdit(!edit);
        else {
            mutate({ id: productId, urls: selected });
        }
    };

    return (
        <div className="">
            <div className="flex items-center justify-between ">
                <h3 className="text-lg font-medium">Images</h3>
                <div className="flex gap-4">
                    {(urls?.length ?? 0) > 0 && (
                        <Button
                            variant={
                                edit && selected.length > 0 ? "destructive" : "secondary"
                            }
                            size="sm"
                            onClick={() => handleDelete()}
                        >
                            {isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <>{edit && selected.length > 0 ? "Delete" : "Edit"}</>
                            )}
                        </Button>
                    )}
                    {(urls?.length ?? 0) < 8 && (
                        <>
                            <UploadButton productId={productId} />
                        </>
                    )}
                </div>
            </div>
            <Separator className="mb-4 mt-1" />
            {urls?.length ?? 0 > 0 ? (
                <>
                    <div
                        className={cn(
                            "flex gap-4 rounded-md",
                            edit && "p-2 ring ring-destructive"
                        )}
                    >
                        {urls?.map((url) => (
                            <div
                                key={url}
                                className={cn(
                                    "select-none  rounded-md",
                                    selected.find((selected) => selected === url)
                                        ? "ring ring-destructive"
                                        : ""
                                )}
                                onClick={() => handleSelected(url)}
                            >
                                <Image
                                    className="pointer-events-none rounded-md"
                                    width={150}
                                    height={150}
                                    src={url}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="flex h-40 flex-col items-center justify-center gap-2 ">
                        <ImageIcon />
                        <span className=" text-sm font-semibold">
                            {"There's no Imgaes."}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductImages;
