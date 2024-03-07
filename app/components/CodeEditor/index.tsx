"use client";
import React from "react";
import styles from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";

function CodeEditor({
    code,
    setCode,
    buttons,
}: {
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
    buttons: React.ReactNode;
}) {
    return (
        <div className={styles.main}>
            <Editor
                className={styles.editor}
                height="100%"
                defaultLanguage="json"
                defaultValue="{}"
                value={code}
                onChange={(value) => {
                    setCode(value as string);
                }}
            />
            <div className={styles.actionBtn}>{buttons}</div>
        </div>
    );
}

export default CodeEditor;
