"use client";
import React from "react";
import styles from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";

function CodeEditor({
    code,
    setCode,
}: {
    code: string | undefined;
    setCode: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
    return (
        <div className={styles.main}>
            <Editor
                className={styles.editor}
                height="70vh"
                defaultLanguage="json"
                defaultValue="{}"
                value={code}
                onChange={(value) => {
                    setCode(value);
                }}
            />
        </div>
    );
}

export default CodeEditor;
