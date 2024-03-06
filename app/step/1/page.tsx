"use client";
import { useEffect, useState } from "react";
import CodeEditor from "../../components/CodeEditor";
import Instructions from "../../components/Instructions";
import styles from "./1.module.css";

export default function Home() {
	const [code, setCode] = useState<string | undefined>("{}");
	const [InstructionsMarkdown, setInstructionsMarkdown] = useState<
		string | undefined
	>("");
	useEffect(() => {
		const textFile = require("./instructions.md");
		setInstructionsMarkdown(textFile);
	}, []);
	return (
		<div className={styles.main}>
			<Instructions markdownInstructions={InstructionsMarkdown!} />
			<CodeEditor code={code} setCode={setCode} />
		</div>
	);
}
