"use client";
import { AnimatePresence, motion, wrap } from "framer-motion";
import { ChevronLeft, ChevronRight, Diamond } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

interface ImageCarouselProps {
    images: string[];
}

const variants = {
    enter: (direction: number) => {
        return {
            x: `${direction * 100}%`,

            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: `${direction * -100}%`,

            opacity: 0,
        };
    },
};

const swipeConfidenceThreshold = 1000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const imageIndex = wrap(0, images.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };
    return (
        <div className="space-y-2">
            <div className="relative h-[386px] w-[688px] overflow-hidden ">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        className="absolute left-0 top-0 h-[386px] w-[688px] "
                        key={page}
                        custom={direction}
                        variants={variants}
                        dragSnapToOrigin={true}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                    >
                        <Image
                            alt=""
                            src={images[imageIndex] ?? ""}
                            width={688}
                            height={386}
                            className="pointer-events-none aspect-video"
                        />
                    </motion.div>
                </AnimatePresence>
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-2 top-[calc(50%_-_20px)] z-10"
                    onClick={() => paginate(1)}
                >
                    <ChevronLeft size={20} />
                </Button>
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-[calc(50%_-_20px)] z-10"
                    onClick={() => paginate(-1)}
                >
                    <ChevronRight size={20} />
                </Button>
                <div className="absolute bottom-1 left-1 flex ">
                    {images.map((url) => (
                        <Diamond
                            key={url}
                            size={12}
                            className={cn(
                                "fill-secondary stroke-accent transition-colors",
                                images[imageIndex] === url &&
                                    "fill-primary stroke-primary"
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;
