"use client";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import CodeLayout from "@/app/components/CodeLayout";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useInstructionsEffect } from "@/lib/hooks";
import Ajv2020 from "ajv/dist/2020";

async function handleValidation(
    setValidity: any,
    setIsInvalid: any,
    code: string | undefined
) {
    const ajv = new Ajv2020({ strict: true, allErrors: true });
    try {
        const schema = JSON.parse(code!);
        if (!schema.$schema) {
            setValidity(
                "Unable to determine a dialect for the schema. The dialect can be declared in a number of ways, but the recommended way is to use the '$schema' keyword in your schema."
            );
            setIsInvalid(true);
            return;
        } else if (
            schema.$schema !== "https://json-schema.org/draft/2020-12/schema"
        ) {
            setValidity(
                "Not a valid JSON Schema for draft 2020-12.\nPlease set $schema to https://json-schema.org/draft/2020-12/schema"
            );
            setIsInvalid(true);
            return;
        }
        // I did not find any function in hyperjump that validates the schema without any data
        // So decided to use ajv for this step only

        const valid = await ajv.validateSchema(schema);
        if (valid) {
            setValidity("Correct! let's move on to the next step.");
            setIsInvalid(false);
        } else {
            setValidity(ajv.errorsText());
            setIsInvalid(true);
        }
    } catch (e) {
        setValidity(JSON.stringify((e as Error).message));
        setIsInvalid(true);
    }
}

export default function Home() {
    const router = useRouter();
    const [code, setCode] = useState<string>(`{\n    \n}`);

    const {
        InstructionsMarkdown,
        setIsInvalid,
        isInvalid,
        setValidity,
        validity,
    } = useInstructionsEffect(
        require("./instructions.md"),
        "Step 1: Writing a valid schema",
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
