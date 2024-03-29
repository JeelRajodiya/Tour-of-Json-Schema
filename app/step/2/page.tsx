"use client";
import { useContext, useEffect, useMemo, useState } from "react";
// import styles from "./2.module.css";
import { Button } from "@chakra-ui/react";
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
        const data = [1, 2, 3];
        const schema = JSON.parse(code!);

        const output = await hyperjumpValidate(data, schema);

        const avjErrors = ajv(data, schema).errors;
        if (output?.valid) {
            setValidity(
                "Great!\nLet's learn about $schema and specifications in the next step."
            );
            if (!schema.type) {
                setIsInvalid(true);
                setValidity(
                    "Please specify the type of the data with the 'type' property."
                );
                return;
            } else if (!schema.items) {
                setIsInvalid(true);
                setValidity("The schema should have an 'items' property.");
                return;
            }
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
                        onClick={() => router.push("/step/3")}
                        size={"sm"}
                        rightIcon={<ChevronRightIcon w={6} h={6} />}
                    >
                        Step 3
                    </Button>
                </>
            }
        />
    );
}
