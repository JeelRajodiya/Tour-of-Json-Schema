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
        <div
            className={classnames(
                styles.output,
                isInvalid ? styles.invalid : styles.valid
            )}
        >
            {children?.toString().replaceAll('"', "")}
        </div>
    );
}

export default Output;
