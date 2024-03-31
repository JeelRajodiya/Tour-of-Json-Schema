import React from "react";
import styles from "./Output.module.css";
import classnames from "classnames";
import KeyBindings from "../KeyBindings";

function Output({
    children,
    isInvalid,
}: {
    children: React.ReactNode;
    isInvalid: boolean;
}) {
    let textColor;
    let isChildrenEmpty = children?.toString().trim() === "";

    if (isChildrenEmpty) {
        textColor = "neutral";
    } else {
        textColor = isInvalid ? "invalid" : "valid";
    }
    console.log(textColor);
    return (
        <div className={classnames(styles.output, styles[textColor])}>
            <div className={styles.header}>
                <div className={styles.title}>Output</div>
            </div>
            <div
                className={classnames(
                    isInvalid ? styles.invalid : styles.valid,
                    styles.outputBody
                )}
            >
                {isChildrenEmpty && (
                    <KeyBindings
                        keys={["ctrl"]}
                        beforeText="Press "
                        afterText=" to validate"
                    />
                )}
                {children?.toString().replaceAll('"', "")}
            </div>
        </div>
    );
}

export default Output;
