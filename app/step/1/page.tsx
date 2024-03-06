"use client";
import { useEffect, useMemo, useState } from "react";
import CodeEditor from "../../components/CodeEditor";
import Instructions from "../../components/Instructions";
import styles from "./1.module.css";
import { Box, Button, Flex } from "@chakra-ui/react";
import Ajv from "ajv/dist/2020";

// const draft7MetaSchema = require("ajv/dist/refs/json-schema-draft-07.json");
// ajv.addMetaSchema(draft7MetaSchema);
export default function Home() {
    const [code, setCode] = useState<string | undefined>(
        "// remove the comment and write a valid JSON schema here"
    );
    const [InstructionsMarkdown, setInstructionsMarkdown] = useState<
        string | undefined
    >("");
    const [error, setError] = useState<string | undefined>("");
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const ajv = useMemo(() => new Ajv({ allErrors: true }), [code]);
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
            <div style={{ color: isInvalid ? "red" : "green" }}>{error}</div>
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
                                setIsInvalid(false);
                            } else {
                                setError("Invalid JSON schema");
                                setIsInvalid(true);
                            }
                        } catch (e) {
                            console.log(e);
                            setError("Invalid JSON schema");
                            setIsInvalid(true);
                        }
                    }}
                >
                    Check
                </Button>
            </div>
        </div>
    );
}
