"use-client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";

export const Providers = ({ children }: { children: React.ReactNode }) => (
    <>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
);
