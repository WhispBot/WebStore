import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useMediaQuery } from "react-responsive";
import ProductCard from "./productCard";
import type { Product, Rating, Tag } from "@prisma/client";

interface CarucelProps {
    title: string;
    data: (Product & {
        rating: Rating | null;
        tags: Tag[];
    })[];
}

const Carucel: React.FC<CarucelProps> = ({ data, title }) => {
    const [page, setPage] = useState(0);
    const lg = useMediaQuery({ query: "(min-width: 1024px)" });
    const sm = useMediaQuery({ query: "(min-width: 640px)" });
    const pageSize = lg ? 4 : sm ? 2 : 1;
    const totalPages = data.length / pageSize;

    const handlePageChange = (
        page: number,
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        setPage(page);
    };

    return (
        <div className="space-y-4 border-y-2 p-2">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold"> {title} </h2>
                <span className="text-muted-foreground">
                    {page + 1} / {Math.ceil(totalPages)}
                </span>
            </div>
            <div className="relative touch-pan-y overflow-hidden">
                <div className="absolute left-0 top-0 z-10 flex h-full items-center justify-center ">
                    <Button
                        className="h-full p-0 hover:bg-secondary/60 disabled:hidden"
                        variant="ghost"
                        onClick={(e) => void handlePageChange(page - 1, e)}
                        disabled={page === 0}
                    >
                        <ChevronLeftIcon className="h-8 w-8" />
                    </Button>
                </div>
                <div
                    className={cn("flex ")}
                    style={{
                        transform: `translateX(-${page * 100}%)`,
                        transition: "transform 250ms ease-in-out",
                    }}
                >
                    {data.map((item) => {
                        return (
                            <ProductCard
                                key={item.id}
                                product={item}
                                discount={{ discount: 0 }}
                            />
                        );
                    })}
                </div>

                <div className="absolute right-0 top-0 z-10 flex h-full items-center justify-center ">
                    <Button
                        className="h-full p-0 hover:bg-secondary/60 disabled:hidden"
                        variant="ghost"
                        onClick={(e) => void handlePageChange(page + 1, e)}
                        disabled={page === totalPages - 1 || totalPages < 1}
                    >
                        <ChevronRightIcon className="h-8 w-8" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default Carucel;
