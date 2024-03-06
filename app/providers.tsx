"use-client";

import { ChakraProvider } from "@chakra-ui/react";
// import { GoogleAnalytics } from "nextjs-google-analytics";
import { theme } from "./styles/theme";

export const Providers = ({ children }: { children: React.ReactNode }) => (
	<>
		{/* <GoogleAnalytics /> */}
		<ChakraProvider theme={theme}>{children}</ChakraProvider>
	</>
);
