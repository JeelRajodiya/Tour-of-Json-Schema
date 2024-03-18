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
    output: {
        isInvalid: boolean;
        message: string | undefined;
    };
    buttons: React.ReactNode;
}) {
    return (
        <div className={styles.main}>
            <Instructions markdownInstructions={InstructionsMarkdown!} />
            <div className={styles.editorNOutput}>
                <CodeEditor code={code} setCode={setCode} buttons={buttons} />
                <Output isInvalid={output.isInvalid}>{output.message}</Output>
            </div>
        </div>
    );
}

export default CodeLayout;
