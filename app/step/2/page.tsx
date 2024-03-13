"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import styles from "./2.module.css";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { pageContext } from "@/lib/context";
import CodeLayout from "@/app/components/CodeLayout/page";
import { hyperjumpValidate, isMyJsonValid } from "@/lib/validators";

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
                        onClick={async () => {
                            try {
                                const schema = JSON.parse(code!);

                                const output = await hyperjumpValidate(
                                    [1, 2, 3],
                                    schema
                                );
                                console.log(output);
                                if (output.valid) {
                                    setValidity("Yes! This is a valid schema!");

                                    setIsInvalid(false);
                                } else {
                                    console.log(output);
                                    const validation2 = isMyJsonValid(
                                        [1, 2, 3],
                                        schema
                                    );
                                    console.log(validation2);
                                    let errorString = "";
                                    for (const error of validation2) {
                                        errorString +=
                                            JSON.stringify(error) + "      ";
                                    }

                                    setValidity(errorString);

                                    setIsInvalid(true);
                                }
                            } catch (e) {
                                console.log(e);
                                setValidity(e.message);
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
                        Home
                    </Button>
                </>
            }
        />
    );
}
