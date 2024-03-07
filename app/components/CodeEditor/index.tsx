"use client";
import React from "react";
import styles from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";

function CodeEditor({
    code,
    setCode,
}: {
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
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
        </div>
    );
}

export default CodeEditor;
