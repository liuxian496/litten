import classnames from "classnames";

import { getPrefixNs } from "../control/userControl";

import { TextFieldProps } from "./textField.types";
import { VisualStates } from "../control/userControl.types";


export function getVisualStates(props: TextFieldProps, states: VisualStates) {
    const {
        prefixCls: customizePrefixCls,
        disabled,
    } = props;

    const { focusState } = states;
    const prefixCls = getPrefixNs('textField', customizePrefixCls);

    const visualStates = classnames(
        prefixCls,
        `${prefixCls}--${focusState}`,
        {
            [`${prefixCls}--disabled`]: disabled === true,
        });

    return visualStates;
}

export function getInputVisualStates(props: TextFieldProps) {
    const {
        prefixCls: customizePrefixCls,
    } = props;
    const prefixCls = getPrefixNs('textField', customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__input`);

    return visualStates;
}