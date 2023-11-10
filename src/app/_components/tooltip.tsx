"use client";
import React from "react";
import * as TooltipPrim from "../_components/ui/tooltip";

interface TooltipProps extends React.PropsWithChildren {
    content: string;
    side?: "top" | "right" | "bottom" | "left";
}

const Tooltip: React.FC<TooltipProps> = ({ children, content, side }) => {
    return (
        <TooltipPrim.TooltipProvider>
            <TooltipPrim.Tooltip>
                <TooltipPrim.TooltipTrigger asChild>
                    {children}
                </TooltipPrim.TooltipTrigger>
                <TooltipPrim.TooltipContent side={side}>
                    {content}
                </TooltipPrim.TooltipContent>
            </TooltipPrim.Tooltip>
        </TooltipPrim.TooltipProvider>
    );
};

export default Tooltip;
