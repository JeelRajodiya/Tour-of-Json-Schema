import React from "react";
import styles from "./Output.module.css";

function Output({ children }: { children: React.ReactNode }) {
    return <div className={styles.output}>{children}</div>;
}

export default Output;
