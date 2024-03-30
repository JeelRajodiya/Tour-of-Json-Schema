"use client";
import React from "react";
import styles from "./Instructions.module.css";
import MarkdownPreview from "@uiw/react-markdown-preview";
import BackIcon from "@/public/icons/back.png";
function Instructions({
    markdownInstructions,
}: {
    markdownInstructions: string;
}) {
    return (
        <div className={styles.main} data-color-mode="light">
            <div
                className={styles.backButton}
                onClick={() => {
                    window.history.back();
                }}
            >
                <img
                    src={BackIcon.src}
                    alt="back"
                    style={{ width: "16px", height: "16px" }}
                />
            </div>
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
