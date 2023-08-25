import classnames from "classnames";

import { getPrefixNs } from "../control/control";

import { TextFieldProps } from "./textField.types";
import { VisualStates } from "../control/control.types";


export function getVisualStates(props: TextFieldProps, states: VisualStates) {
    const {
        prefixCls: customizePrefixCls,
        disabled,
    } = props;

    const { focused } = states;
    const prefixCls = getPrefixNs('textField', customizePrefixCls);

    const visualStates = classnames(
        prefixCls,
        {
            [`${prefixCls}--disabled`]: disabled === true,
            [`${prefixCls}--focused`]: focused === true,
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