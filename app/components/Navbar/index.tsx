import Image from "next/image";
import styles from "./Navbar.module.css";
function Navbar() {
	return (
		<div className={styles.main}>
			<Image
				alt="logo"
				src="/icons/json-schema-blue.png"
				width={44}
				height={44}
			/>
			<span className={styles.title}>Tour of JSON Schema</span>
		</div>
	);
}

export default Navbar;
