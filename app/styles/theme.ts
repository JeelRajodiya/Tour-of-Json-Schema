"use client";
import {
    background,
    theme as chakraTheme,
    extendTheme,
} from "@chakra-ui/react";
const Button = {
    variants: {
        default: {
            color: "white",
            bg: "hsl(var(--primary))",
            _hover: {
                bg: "hsl(var(--primary) / 0.8)",
            },
            _active: {
                bg: "hsl(var(--primary) / 0.6)",
            },
        },
    },
};
export const theme = extendTheme({
    styles: {
        global: {},
    },
    components: { Button },
    fonts: {},
});
