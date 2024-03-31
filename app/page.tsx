"use client";

import { Button } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import Instructions from "./components/Instructions";
import styles from "./styles/page.module.css";
import Image from "next/image";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
import JsonIcon from "@/public/icons/json-schema-blue.png";
export default function Home() {
    return (
        <div className={styles.main}>
            <div className={styles.wrapper}>
                <div className={styles.iconAndTitle}>
                    <img
                        alt="logo"
                        src={JsonIcon.src}
                        style={{ width: "64px", height: "64px" }}
                    />
                    <div className={styles.title}>
                        <div>Tour of</div>
                        <div>JSON</div>
                        <div>Schema</div>
                    </div>
                </div>
                {/* <img
                    src="./icons/example.png"
                    alt="example"
                    style={{
                        height: 256,
                    }}
                /> */}
                <div className={styles.subtitleWrapper}>
                    <div className={styles.subtitle}>
                        Learn JSON Schema by Examples.
                    </div>
                    <Link href="/step/1">
                        <Button
                            variant={"default"}
                            rightIcon={
                                <ChevronRightIcon width={8} height={8} />
                            }
                        >
                            Start the Tour
                        </Button>
                    </Link>
                </div>
            </div>
            <div>
                created by&nbsp;
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
