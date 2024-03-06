"use client";
import React from "react";
import styles from "./CodeEditor.module.css";
import Editor from "@monaco-editor/react";
import Ajv from "ajv";
const ajv = new Ajv({ allErrors: true });

function CodeEditor() {
	const [code, setCode] = React.useState<string | undefined>("");
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
					try {
						const schema = JSON.parse(value as string);
						ajv.compile(schema);
					} catch (error) {
						console.error(error);
					}
				}}
				theme=""
			/>
		</div>
	);
}

export default CodeEditor;
