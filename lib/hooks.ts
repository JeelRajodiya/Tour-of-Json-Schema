import { useContext, useEffect } from "react";
import { pageContext } from "./context";
import path from "path";

export function useInstructionsEffect(
    instructionsPath: string,
    newPageName: string,
    code: string,
    handleValidation: any,
    setInstructionsMarkdown: (instructions: string) => void,
    setIsInvalid: (isInvalid: boolean) => void,
    setValidity: (validity: string) => void
) {
    const { pageName, setPageName } = useContext(pageContext);
    const callerFilePath = new URL(import.meta.url).pathname;
    const instructionsFilePath = path.join(
        path.dirname(callerFilePath),
        "./instructions.md"
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Control") {
                event.preventDefault(); // Prevent default behavior
                handleValidation(setValidity, setIsInvalid, code);
            }
        };

        const textFile = import(instructionsFilePath).then((module) =>
            setInstructionsMarkdown(module.default)
        );

        setPageName(newPageName);

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [code]);
}
