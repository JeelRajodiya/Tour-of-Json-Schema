import CodeEditor from "./components/CodeEditor";
import Instructions from "./components/Instructions";
import styles from "./styles/page.module.css";
import Image from "next/image";
export default async function Home() {
    return (
        <div className={styles.main}>
            <div className={styles.iconAndTitle}>
                <Image
                    alt="logo"
                    src="/icons/json-schema-blue.png"
                    width={64}
                    height={64}
                />
                <div className={styles.title}>
                    <div>Tour Of</div>
                    <div>JSON</div>
                    <div>Schema</div>
                </div>
            </div>

            <div className={styles.subtitle}>
                Learn JSON Schema by examples.
            </div>
        </div>
    );
}
