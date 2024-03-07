import CodeEditor from "../CodeEditor";
import Instructions from "../Instructions";
import styles from "./CodeLayout.module.css";

import Output from "@/app/components/Output";

function CodeLayout({
    InstructionsMarkdown,
    code,
    setCode,
    output,
    buttons,
}: {
    InstructionsMarkdown: string;
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
    output: React.ReactNode;
    buttons: React.ReactNode;
}) {
    return (
        <div className={styles.main}>
            <Instructions markdownInstructions={InstructionsMarkdown!} />
            <div className={styles.editorNOutput}>
                <CodeEditor code={code} setCode={setCode} />
                <Output>{output}</Output>
            </div>
            <div className={styles.actionBtn}>{buttons}</div>
        </div>
    );
}

export default CodeLayout;
