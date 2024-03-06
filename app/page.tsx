import CodeEditor from "./components/CodeEditor";
import Instructions from "./components/Instructions";
import styles from "./styles/page.module.css";

export default async function Home() {
	return (
		<div className={styles.main}>
			<Instructions />
			<CodeEditor />
		</div>
	);
}
