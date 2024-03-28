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
        textColor = isInvalid ? "valid" : "invalid";
    }

    return (
        <div className={classnames(styles.output, styles[textColor])}>
            {isChildrenEmpty && (
                <KeyBindings
                    keys={["ctrl", "enter"]}
                    beforeText="Press "
                    afterText=" to validate"
                />
            )}
            {children?.toString().replaceAll('"', "")}
        </div>
    );
}

export default Output;
