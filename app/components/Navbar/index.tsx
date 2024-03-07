import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";
function Navbar() {
    return (
        <div className={styles.main}>
            <Link
                href={"/"}
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
            >
                <Image
                    alt="logo"
                    src="/icons/json-schema-blue.png"
                    width={44}
                    height={44}
                />
                <span className={styles.title}>Tour of JSON Schema</span>
            </Link>
        </div>
    );
}

export default Navbar;
