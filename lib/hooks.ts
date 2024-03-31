import { useContext, useEffect, useState } from "react";
import { pageContext } from "./context";
import path from "path";

export function useInstructionsEffect(
    instructionsFile: any,
    newPageName: string,
    code: string,
    handleValidation: any
) {
    const { pageName, setPageName } = useContext(pageContext);
    const [InstructionsMarkdown, setInstructionsMarkdown] =
        useState<string>("");
    const [validity, setValidity] = useState<string>("");
    const [isInvalid, setIsInvalid] = useState<boolean>(true);
    const callerFilePath = new URL(import.meta.url).pathname;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key == "." && event.ctrlKey) {
                event.preventDefault(); // Prevent default behavior
                handleValidation(setValidity, setIsInvalid, code);
            }
        };

        setPageName(newPageName);
        setInstructionsMarkdown(instructionsFile);

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [code]);
    return {
        InstructionsMarkdown,
        validity,
        setValidity,
        isInvalid,
        setIsInvalid,
    };
}
