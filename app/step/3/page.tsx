"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { pageContext } from "@/lib/context";
import CodeLayout from "@/app/components/CodeLayout";
import { ajv, hyperjumpValidate } from "@/lib/validators";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Instructions from "@/app/components/Instructions";
import styles from "./3.module.css";
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

export default function Home() {
    const { pageName, setPageName } = useContext(pageContext);

    const router = useRouter();

    const [InstructionsMarkdown, setInstructionsMarkdown] =
        useState<string>("");
    useEffect(() => {
        const textFile = require("./instructions.md");
        setInstructionsMarkdown(textFile);
        setPageName("Learn: Specifications and $schema");
    }, []);
    return (
        <div className={styles.main}>
            <Instructions markdownInstructions={InstructionsMarkdown} />
            <Button
                variant={"default"}
                className={styles.nextBtn}
                onClick={() => {
                    router.push("/");
                }}
            >
                Finish
            </Button>
        </div>
    );
}
