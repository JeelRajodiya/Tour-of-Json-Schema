"use client";
import { useContext, useEffect, useMemo, useState } from "react";

import styles from "./1.module.css";
import { Box, Button, Flex } from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import { pageContext } from "@/lib/context";
import CodeLayout from "@/app/components/CodeLayout";
import { ajv, hyperjumpValidate } from "@/lib/validators";
import { ChevronRightIcon } from "@chakra-ui/icons";

async function handleValidation(
    setValidity: any,
    setIsInvalid: any,
    code: string | undefined
) {
    try {
        const schema = JSON.parse(code!);
        const data1 = {};
        const data2: any[] = [];
        const output1 = await hyperjumpValidate(data1, schema);
        const output2 = await hyperjumpValidate(data2, schema);

        const avjErrors = ajv(data1, schema).errors;
        if (output1?.valid || output2?.valid) {
            setValidity("Correct! let's move on to the next step.");

            setIsInvalid(false);
        } else {
            setValidity(avjErrors);

            setIsInvalid(true);
        }
    } catch (e) {
        setValidity(JSON.stringify((e as Error).message));
        setIsInvalid(true);
    }
}

export default function Home() {
    const { pageName, setPageName } = useContext(pageContext);

    const router = useRouter();
    const [code, setCode] = useState<string>(
        `{\n    "$schema": "https://json-schema.org/draft/2020-12/schema"\n}`
    );
    const [InstructionsMarkdown, setInstructionsMarkdown] =
        useState<string>("");
    const [validity, setValidity] = useState<string>("");
    const [isInvalid, setIsInvalid] = useState<boolean>(true);

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
            output={{
                isInvalid,
                message: validity,
            }}
            buttons={
                <>
                    <Button
                        size={"sm"}
                        variant={"default"}
                        onClick={() =>
                            handleValidation(setValidity, setIsInvalid, code)
                        }
                    >
                        {" "}
                        Validate{" "}
                    </Button>

                    <Button
                        size={"sm"}
                        variant={"success"}
                        isDisabled={isInvalid}
                        onClick={() => router.push("/step/2")}
                        rightIcon={<ChevronRightIcon w={6} h={6} />}
                    >
                        Step 2
                    </Button>
                </>
            }
        />
    );
}
