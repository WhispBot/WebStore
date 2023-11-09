"use client";
import { Provider } from "jotai";
import React from "react";

const JotaiProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <Provider>{children}</Provider>;
};

export default JotaiProvider;
