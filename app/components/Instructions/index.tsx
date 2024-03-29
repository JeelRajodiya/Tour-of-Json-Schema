"use client";
import React from "react";
import styles from "./Instructions.module.css";
import MarkdownPreview from "@uiw/react-markdown-preview";
function Instructions({
    markdownInstructions,
}: {
    markdownInstructions: string;
}) {
    return (
        <div className={styles.main} data-color-mode="light">
            <div className={styles.wrapper}>
                <MarkdownPreview
                    source={markdownInstructions}
                    style={{
                        backgroundColor: "transparent",
                        color: "black",
                        height: "100%",
                    }}
                />
            </div>
        </div>
    );
}

export default Instructions;
