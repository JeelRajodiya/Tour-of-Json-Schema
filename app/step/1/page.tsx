"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import CodeEditor from "../../components/CodeEditor";
import Instructions from "../../components/Instructions";
import styles from "./1.module.css";
import { Box, Button, Flex } from "@chakra-ui/react";
import Ajv from "ajv/dist/2020";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Output from "@/app/components/Output";
import { pageContext } from "../layout";
// const draft7MetaSchema = require("ajv/dist/refs/json-schema-draft-07.json");
// ajv.addMetaSchema(draft7MetaSchema);
export default function Home() {
    const { pageName, setPageName } = useContext(pageContext);

    const router = useRouter();
    const [code, setCode] = useState<string | undefined>(
        "// remove the comment and write a valid JSON schema here"
    );
    const [InstructionsMarkdown, setInstructionsMarkdown] = useState<
        string | undefined
    >("");
    const [validity, setValidity] = useState<string | undefined>("");
    const [isInvalid, setIsInvalid] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const ajv = useMemo(() => new Ajv({ allErrors: true }), [code, count]);
    useEffect(() => {
        const textFile = require("./instructions.md");
        setInstructionsMarkdown(textFile);
        setPageName("Step 1: Writing a valid schema");
    }, []);
    return (
        <div className={styles.main}>
            <div className={styles.codeInstructions}>
                <Instructions markdownInstructions={InstructionsMarkdown!} />
                <CodeEditor code={code} setCode={setCode} />
            </div>
            <Output>
                <div
                    className={styles.validity}
                    style={{ color: isInvalid ? "red" : "green" }}
                >
                    {validity}
                </div>
            </Output>
            <div className={styles.actionBtn}>
                <Button
                    variant={"default"}
                    onClick={() => {
                        setCount((i) => i + 1);
                        try {
                            const schema = JSON.parse(code!);
                            const validate = ajv.compile(schema);
                            const valid = validate({}) || validate([]);
                            if (valid) {
                                setValidity("🎉🎉Valid JSON schema");
                                setIsInvalid(false);
                            } else {
                                setValidity("Invalid JSON schema");
                                setIsInvalid(true);
                            }
                        } catch (e) {
                            console.log(e);
                            setValidity("Invalid JSON schema");
                            setIsInvalid(true);
                        }
                    }}
                >
                    Validate
                </Button>
                {!isInvalid && (
                    <Button
                        variant={"success"}
                        onClick={() => router.push("/step/2")}
                    >
                        Next
                    </Button>
                )}
            </div>
        </div>
    );
}
