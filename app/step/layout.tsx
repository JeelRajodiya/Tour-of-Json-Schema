"use client";

import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import React, { useState } from "react";
import { pageContext } from "@/lib/context";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
