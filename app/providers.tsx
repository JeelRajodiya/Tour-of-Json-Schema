"use-client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { GoogleAnalytics } from "nextjs-google-analytics";

export const Providers = ({ children }: { children: React.ReactNode }) => (
    <>
        <GoogleAnalytics gaMeasurementId="G-DTPB1R139Y" />
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
);
