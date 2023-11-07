"use client";
import { Loader2 } from "lucide-react";
import React from "react";

interface LoadingSpinnerProps {
    size?: string | number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size }) => {
    return <Loader2 className="animate-spin" size={size} />;
};

export default LoadingSpinner;
