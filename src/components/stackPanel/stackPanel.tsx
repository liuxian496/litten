import { StackPanelProps } from "./stackPanel.types";
import "./stackPanel.less";

import classnames from "classnames";

import { getPrefixNs } from "../control/control";
import { ControlType } from "../../global/enum";

function getVisualStates(props: StackPanelProps) {
    const {
        prefixCls: customizePrefixCls,
        direction,
        justifyContent,
        alignItems,
    } = props;

    const prefixCls = getPrefixNs("stackPanel", customizePrefixCls);

    const visualStates = classnames(
        prefixCls,
        `${prefixCls}--${direction}`,
        `${prefixCls}--jc-${justifyContent}`,
        `${prefixCls}--ai-${alignItems}`
    );

    return visualStates;
}

export const StackPanel = ({
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "stretch",
    ...props
}: StackPanelProps) => {
    const { children, ...others } = props;
    return (
        <div
            {...others}
            className={getVisualStates({
                direction,
                justifyContent,
                alignItems,
                ...props,
            })}
        >
            {children}
        </div>
    );
};

StackPanel.displayName = ControlType.StackPanel;
