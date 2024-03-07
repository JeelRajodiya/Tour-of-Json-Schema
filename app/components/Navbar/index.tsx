import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { pageContext } from "@/app/step/layout";
import { useContext } from "react";
function Navbar() {
    const { pageName, setPageName } = useContext(pageContext);

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
            {pageName}
        </div>
    );
}

export default Navbar;
