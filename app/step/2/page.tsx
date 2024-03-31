"use client";
import { useState } from "react";
// import styles from "./2.module.css";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import CodeLayout from "@/app/components/CodeLayout";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useInstructionsEffect } from "@/lib/hooks";
import { handleValidation } from "./validationFunction";
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
    const router = useRouter();
    const [code, setCode] = useState<string>(
        `{\n    "$schema": "https://json-schema.org/draft/2020-12/schema"\n}`
    );
    const {
        InstructionsMarkdown,
        setIsInvalid,
        isInvalid,
        setValidity,
        validity,
    } = useInstructionsEffect(
        require("./instructions.md"),
        "Step 2: Validating an array of numbers",
        code,
        handleValidation
    );

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
