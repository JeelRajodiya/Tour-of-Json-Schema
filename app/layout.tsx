import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./styles/globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Tour Of Json Schema",
	description: "A Tour of Json Schema",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
