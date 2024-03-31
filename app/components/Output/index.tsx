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
    return (
        <div className={classnames(styles.output, styles[textColor])}>
            <div className={styles.header}>
                <div className={styles.title}>Output </div>
                <div
                    className={styles.keyBindingsWrapper}
                    style={{
                        opacity: isChildrenEmpty ? 1 : 0.8,
                    }}
                >
                    <KeyBindings
                        keys={["Ctrl", "."]}
                        beforeText="Press "
                        afterText=" to validate"
                    />
                </div>
            </div>
            <div className={classnames(styles.outputBody)}>
                {children?.toString().replaceAll('"', "")}
            </div>
        </div>
    );
}

export default Output;
