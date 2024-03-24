"use client";
import ReactGA from "react-ga4";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        ReactGA.initialize("G-DTPB1R139Y");
    }, []);

    return (
        <>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </>
    );
}
