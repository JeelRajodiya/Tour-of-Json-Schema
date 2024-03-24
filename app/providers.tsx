"use-client";
import ReactGA from "react-ga4";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
// import { GoogleAnalytics } from "nextjs-google-analytics";

export function Providers({ children }: { children: React.ReactNode }) {
    ReactGA.initialize("G-DTPB1R139Y");
    return (
        <>
            {/* <GoogleAnalytics gaMeasurementId="G-DTPB1R139Y" /> */}
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </>
    );
}
