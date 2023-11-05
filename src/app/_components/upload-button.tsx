"use client";
import { useUploadThing } from "~/lib/uploadthing";

import React, { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Upload } from "lucide-react";
import { Input } from "./ui/input";
import {
    allowedContentTextLabelGenerator,
    generateMimeTypes,
    generatePermittedFileTypes,
} from "uploadthing/client";
import { Label } from "./ui/label";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import LoadingSpinner from "./loading-spinner";

interface UploadButtonProps {
    productId: string;
}

const UploadButton: React.FC<UploadButtonProps> = ({ productId }) => {
    const { toast } = useToast();

    const update = toast({
        title: "",
        description: "",
    });

    const [files, setFiles] = useState<File[]>([]);
    const utils = api.useUtils();
    const updateMutation = api.stripe.updateProduct.useMutation({
        onSettled: () => {
            void utils.stripe.getProduct.invalidate({ id: productId });
        },
    });

    const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
        "imageUploader",
        {
            onUploadBegin: () => {
                toast({
                    title: "Upload has begun!",
                    description: "",
                });
            },
            onClientUploadComplete: (res) => {
                const urls = res?.reduce((acc: string[], obj) => {
                    acc.push(obj.url);

                    return acc;
                }, []);
                updateMutation.mutate({ id: productId, url: urls ?? [] });
                toast({
                    title: "Uploaded successfully!",
                    description: "",
                });
                setFiles([]);
            },
            onUploadError: () => {
                toast({
                    title: "Uh oh!, something went wrong!",
                    description: "error occurred while uploading",
                    variant: "destructive",
                });
            },
        }
    );

    const { fileTypes, multiple } = generatePermittedFileTypes(permittedFileInfo?.config);

    return (
        <div className="flex items-center gap-4">
            <span className="whitespace-nowrap text-sm text-muted-foreground">
                {allowedContentTextLabelGenerator(permittedFileInfo?.config)}
            </span>

            {files.length > 0 && (
                <Button
                    size="sm"
                    variant="secondary"
                    className="flex gap-2"
                    onClick={() => startUpload(files, { productId: productId })}
                >
                    <Upload size={20} />
                    Upload {files.length}
                </Button>
            )}

            <Label
                className={cn(
                    "cursor-pointer",
                    buttonVariants({ variant: "secondary", size: "sm" })
                )}
            >
                <input
                    className="hidden"
                    type="file"
                    multiple={multiple}
                    accept={generateMimeTypes(fileTypes ?? [])?.join(", ")}
                    onChange={(e) => {
                        if (!e.target.files) return;
                        void setFiles(Array.from(e.target.files));
                    }}
                />
                <span className="ut-px-3 ut-py-2 ut-text-white">
                    {isUploading ? (
                        <LoadingSpinner />
                    ) : (
                        `Choose File${multiple ? `(s)` : ``}`
                    )}
                </span>
            </Label>
        </div>
    );
};

export default UploadButton;
