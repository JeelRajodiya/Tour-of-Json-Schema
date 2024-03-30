import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { pageContext } from "@/lib/context";
import { useContext } from "react";
import jsonIcon from "@/public/icons/json-schema-blue.png";
import Github from "@/public/icons/Github";
import BackIcon from "@/public/icons/back.png";

function Navbar() {
    const { pageName, setPageName } = useContext(pageContext);

    return (
        <div className={styles.main}>
            <div className={styles.navbarLeft}>
                <Link
                    href={"/"}
                    style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                    }}
                >
                    <img
                        alt="logo"
                        src={jsonIcon.src}
                        style={{ width: "44px", height: "44px" }}
                    />
                    <span className={styles.title}>Tour of JSON Schema</span>
                </Link>
                <div
                    className={styles.backButton}
                    onClick={() => {
                        window.history.back();
                    }}
                >
                    <img
                        src={BackIcon.src}
                        alt="back"
                        style={{ width: "16px", height: "16px" }}
                    />
                </div>
                {pageName}
            </div>
            <Link
                href={"https://github.com/JeelRajodiya/Tour-of-Json-Schema"}
                target="_blank"
            >
                <Github />
            </Link>
        </div>
    );
}

export default Navbar;
