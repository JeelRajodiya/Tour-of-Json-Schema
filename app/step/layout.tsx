"use client";

import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import React, { useState } from "react";
export const pageContext = React.createContext<
    Readonly<{
        pageName: string | null;
        setPageName: React.Dispatch<React.SetStateAction<string | null>>;
    }>
>({
    pageName: "Hey",
    setPageName: () => {},
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [pageName, setPageName] = useState<string | null>(null);

    return (
        <pageContext.Provider
            value={{
                pageName,
                setPageName,
            }}
        >
            <Navbar />
            {children}
        </pageContext.Provider>
    );
}
