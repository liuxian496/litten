import { CSSProperties } from "react";

import { StackPanelProps } from "./stackPanel.types";
import "./stackPanel.less";

import classnames from "classnames";

import { getPrefixNs } from "../control/control";

function getVisualStates(props: StackPanelProps) {
    const { prefixCls: customizePrefixCls, direction } = props;

    const prefixCls = getPrefixNs("stackPanel", customizePrefixCls);

    const visualStates = classnames(prefixCls, `${prefixCls}--${direction}`);

    return visualStates;
}

export const StackPanel = ({
    direction = "row",
    ...props
}: StackPanelProps) => {
    const { children, ...others } = props;
    return (
        <div
            {...others}
            className={getVisualStates({
                direction,
                ...props,
            })}
        >
            {children}
        </div>
    );
};
