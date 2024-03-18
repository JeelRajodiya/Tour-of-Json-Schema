"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./2.module.css";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { pageContext } from "@/lib/context";
import CodeLayout from "@/app/components/CodeLayout/page";
import {
    ajv,
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
        const data = [1, 2, 3];
        const output = await hyperjumpValidate(data, schema);

        const avjErrors = ajv(data, schema).errors;
        if (output?.valid) {
            setValidity("Congratulations! You have finished the tour!");

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
            output={{
                isInvalid,
                message: validity,
            }}
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
