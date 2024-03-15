"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./2.module.css";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { pageContext } from "@/lib/context";
import CodeLayout from "@/app/components/CodeLayout/page";
import {
    cfworkerValidate,
    hyperjumpValidate,
    isMyJsonValid,
} from "@/lib/validators";
async function handleValidation(
    setValidity: any,
    setIsInvalid: any,
    code: string | undefined
) {
    try {
        const schema = JSON.parse(code!);

        const output = await hyperjumpValidate([1, 2, 3], schema);
        const validation2 = cfworkerValidate([1, 2, 3], schema);

        if (output?.valid) {
            setValidity("Yes! This is a valid schema!");

            setIsInvalid(false);
        } else {
            // console.log(output);
            if (validation2.errors.length !== 0) {
                let errorString = "";
                for (const error of validation2.errors) {
                    errorString += error.error + "     ";
                }
                setValidity(errorString);
                setIsInvalid(true);
            }
        }
    } catch (e) {
        setValidity((e as Error).message);

        setIsInvalid(true);
    }
}
function ValidateBtn({
    code,
    setValidity,
    setIsInvalid,
}: {
    code: string;
    setValidity: (value: string) => void;
    setIsInvalid: (value: boolean) => void;
}) {
    return (
        <Button
            size={"sm"}
            variant={"default"}
            onClick={() => handleValidation(setValidity, setIsInvalid, code)}
        >
            {" "}
            Validate{" "}
        </Button>
    );
}

export default function Home() {
    const { pageName, setPageName } = useContext(pageContext);

    const router = useRouter();
    const [code, setCode] = useState<string>("{}");
    const [InstructionsMarkdown, setInstructionsMarkdown] =
        useState<string>("");
    const [validity, setValidity] = useState<string | undefined>("");
    const [isInvalid, setIsInvalid] = useState<boolean>(true);
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
                    <ValidateBtn
                        code={code}
                        setValidity={setValidity}
                        setIsInvalid={setIsInvalid}
                    />

                    <Button
                        variant={"success"}
                        isDisabled={isInvalid}
                        onClick={() => router.push("/")}
                        size={"sm"}
                    >
                        Home
                    </Button>
                </>
            }
        />
    );
}
