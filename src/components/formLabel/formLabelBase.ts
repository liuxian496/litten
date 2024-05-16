import classnames from "classnames";
import { getPrefixNs } from "cyndi/dist/getPrefixNs";
import { MouseState } from "litten-hooks/dist/enum";

import { FormLabelProps } from "./formLabel.types";

let littenLabelMouseState = MouseState.none;

/**
 * 获取littenLabelMouseState
 * @returns
 */
function getLabelMouseState() {
    return littenLabelMouseState;
}

/**
 * 设置littenLabelMouseState
 * @param state 待设置的MouseState {MouseState}
 */
export function setLabelMouseState(state: MouseState) {
    littenLabelMouseState = state;
}

export function getVisualStates(props: FormLabelProps) {
    const { prefixCls: customizePrefixCls, labelPlacement, disabled } = props;

    const prefixCls = getPrefixNs("formLabel", customizePrefixCls);

    const visualStates = classnames(
        prefixCls,
        `${prefixCls}--${labelPlacement}`,
        {
            [`${prefixCls}--disabled`]: disabled === true,
        }
    );

    return visualStates;
}

export function getLabelVisualStates(props: FormLabelProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs("formLabel", customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__label`);

    return visualStates;
}

/**
 * 检测labelMouseState
 * @returns result 检测后的结果 {boolean}
 */
export function handleLabelMouseStateCheck() {
    let result = false;
    if (getLabelMouseState() === MouseState.none) {
        result = true;
    } else {
        setLabelMouseState(MouseState.none);
    }

    return result;
}
