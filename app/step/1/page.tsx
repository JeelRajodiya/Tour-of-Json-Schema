"use client";
import { useContext, useEffect, useMemo, useState } from "react";

import styles from "./1.module.css";
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
        setPageName("Step 1: Writing a valid schema");
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
                                const valid = validate({}) || validate([]);
                                if (code !== "{}" && valid) {
                                    setValidity("Correct! 🎉🎉");

                                    setIsInvalid(false);
                                } else {
                                    setValidity("Invalid schema provided!");
                                    setIsInvalid(true);
                                }
                            } catch (e) {
                                setValidity("Invalid schema provided!");

                                setIsInvalid(true);
                            }
                        }}
                    >
                        {" "}
                        Validate{" "}
                    </Button>

                    <Button
                        size={"sm"}
                        variant={"success"}
                        isDisabled={isInvalid}
                        onClick={() => router.push("/step/2")}
                    >
                        Next
                    </Button>
                </>
            }
        />
    );
}
