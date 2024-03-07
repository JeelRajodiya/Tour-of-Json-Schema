"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./2.module.css";
import { Box, Button, Flex } from "@chakra-ui/react";
import Ajv from "ajv/dist/2020";
import { useRouter } from "next/navigation";
import { pageContext } from "@/lib/context";
import CodeLayout from "@/app/components/CodeLayout/page";

// const draft7MetaSchema = require("ajv/dist/refs/json-schema-draft-07.json");
// ajv.addMetaSchema(draft7MetaSchema);
export default function Home() {
    const { pageName, setPageName } = useContext(pageContext);

    const router = useRouter();
    const [code, setCode] = useState<string>("{}");
    const [InstructionsMarkdown, setInstructionsMarkdown] =
        useState<string>("");
    const [validity, setValidity] = useState<string | undefined>("");
    const [isInvalid, setIsInvalid] = useState<boolean>(true);
    const [count, setCount] = useState<number>(0);
    const ajv = useMemo(() => new Ajv({ allErrors: true }), [code, count]);
    useEffect(() => {
        const textFile = require("./instructions.md");
        setInstructionsMarkdown(textFile);
        setPageName("Step 2: Validating an array of numbers");
    }, []);
    return (
        <CodeLayout
            InstructionsMarkdown={InstructionsMarkdown}
            code={code}
            setCode={setCode}
            output={
                <div
                    className={styles.validity}
                    style={{ color: isInvalid ? "red" : "green" }}
                >
                    {validity}
                </div>
            }
            buttons={
                <>
                    <Button
                        size={"sm"}
                        variant={"default"}
                        onClick={() => {
                            setCount((i) => i + 1);
                            try {
                                const schema = JSON.parse(code!);
                                const validate = ajv.compile(schema);
                                const valid = validate([1, 2, 5, 6, 8, 9]);
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
                        {" "}
                        Validate{" "}
                    </Button>

                    <Button
                        variant={"success"}
                        isDisabled={isInvalid}
                        onClick={() => router.push("/")}
                        size={"sm"}
                    >
                        Go to Home
                    </Button>
                </>
            }
        />
    );
}
