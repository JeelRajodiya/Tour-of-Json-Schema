import React from "react";
import styles from "./Output.module.css";
import classnames from "classnames";

function Output({
    children,
    isInvalid,
}: {
    children: React.ReactNode;
    isInvalid: boolean;
}) {
    return (
        <div className={classnames(styles.output)}>
            <div className={styles.header}>
                <div className={styles.title}>Output</div>
            </div>
            <div
                className={classnames(
                    isInvalid ? styles.invalid : styles.valid,
                    styles.outputBody
                )}
            >
                {children?.toString().replaceAll('"', "")}
            </div>
        </div>
    );
}

export default Output;
