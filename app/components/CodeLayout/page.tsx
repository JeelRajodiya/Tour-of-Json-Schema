import { useContext, useEffect, useMemo, useState } from "react";
import CodeEditor from "../CodeEditor";
import Instructions from "../Instructions";
import styles from "./CodeLayout.module.css";
import { Box, Button, Flex } from "@chakra-ui/react";
import Ajv from "ajv/dist/2020";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Output from "@/app/components/Output";
import { pageContext } from "@/lib/context";

function CodeLayout({
    InstructionsMarkdown,
    code,
    setCode,
    output,
    buttons,
}: {
    InstructionsMarkdown: string | undefined;
    code: string | undefined;
    setCode: React.Dispatch<React.SetStateAction<string | undefined>>;
    output: React.ReactNode;
    buttons: React.ReactNode;
}) {
    return (
        <div className={styles.main}>
            <Instructions markdownInstructions={InstructionsMarkdown!} />
            <div className={styles.editorNOutput}>
                <CodeEditor code={code} setCode={setCode} />
                <Output>{output}</Output>
            </div>
            <div className={styles.actionBtn}>{buttons}</div>
        </div>
    );
}

export default CodeLayout;
