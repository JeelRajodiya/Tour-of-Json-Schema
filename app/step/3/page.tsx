"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { pageContext } from "@/lib/context";
import Instructions from "@/app/components/Instructions";
import styles from "./3.module.css";

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
