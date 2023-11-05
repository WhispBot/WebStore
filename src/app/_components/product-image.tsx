"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { api } from "~/trpc/react";
import { X } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface ProductImageProps {
    url: string;
    productId: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ productId, url }) => {
    const { toast } = useToast();

    const router = useRouter();

    const DeleteMutation = api.stripe.DeleteImage.useMutation({
        onSuccess: () => {
            toast({
                title: "Image Deleted",
            });
        },
        onSettled: () => {
            router.refresh();
        },
    });

    return (
        <div className="relative">
            {DeleteMutation.isLoading && (
                <div className="absolute  left-0 top-0 flex h-full w-full items-center justify-center bg-black/50">
                    loading...
                </div>
            )}
            <Button
                disabled={DeleteMutation.isLoading}
                variant="destructive"
                size="smIcon"
                className="absolute -right-2 -top-2 rounded-full"
                onClick={() => DeleteMutation.mutate({ id: productId, url: url })}
            >
                <X size={20} />
            </Button>

            <Image className="rounded-md" width={150} height={150} src={url} alt="" />
        </div>
    );
};

export default ProductImage;
