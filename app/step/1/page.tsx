"use client";
import { useEffect, useState } from "react";
import CodeEditor from "../../components/CodeEditor";
import Instructions from "../../components/Instructions";
import styles from "./1.module.css";
import { Box, Button, Flex } from "@chakra-ui/react";
import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true });

export default function Home() {
    const [code, setCode] = useState<string | undefined>(
        "// remove the comment and write a valid JSON schema here"
    );
    const [InstructionsMarkdown, setInstructionsMarkdown] = useState<
        string | undefined
    >("");
    const [error, setError] = useState<string | undefined>("");
    useEffect(() => {
        const textFile = require("./instructions.md");
        setInstructionsMarkdown(textFile);
    }, []);
    return (
        <div className={styles.main}>
            <div className={styles.codeInstructions}>
                <Instructions markdownInstructions={InstructionsMarkdown!} />
                <CodeEditor code={code} setCode={setCode} />
            </div>
            <div>{error}</div>
            <div className={styles.actionBtn}>
                <Button
                    variant={"default"}
                    onClick={() => {
                        try {
                            const schema = JSON.parse(code!);
                            const validate = ajv.compile(schema);
                            const valid = validate({});
                            if (valid) {
                                setError("Valid JSON schema");
                            } else {
                                setError("Invalid JSON schema");
                            }
                        } catch (e) {
                            setError("Invalid JSON schema");
                        }
                    }}
                >
                    Check
                </Button>
            </div>
        </div>
    );
}
