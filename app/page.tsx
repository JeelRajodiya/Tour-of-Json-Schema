"use client";

import { Button } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import Instructions from "./components/Instructions";
import styles from "./styles/page.module.css";
import Image from "next/image";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
export default function Home() {
    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <div className={styles.iconAndTitle}>
                    <Image
                        alt="logo"
                        src="/icons/json-schema-blue.png"
                        width={64}
                        height={64}
                    />
                    <div className={styles.title}>
                        <div>Tour Of</div>
                        <div>JSON</div>
                        <div>Schema</div>
                    </div>
                </div>
                <div className={styles.subtitleWrapper}>
                    <div className={styles.subtitle}>
                        Learn JSON Schema by examples.
                    </div>
                    <Link href="/step/1">
                        <Button
                            variant={"default"}
                            rightIcon={<ChevronRightIcon />}
                        >
                            Start The Tour
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                created by &nbsp;
                <Link
                    href="https://github.com/JeelRajodiya"
                    target="_blank"
                    style={{ color: "blue" }}
                >
                    JeelRajodiya
                </Link>
            </div>
        </div>
    );
}
