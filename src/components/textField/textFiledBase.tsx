import classnames from "classnames";
import { VisualStates } from "litten-hooks/dist/control/userControl/userControl.types";

import { getPrefixNs } from "../../global/util";

import { TextFieldProps } from "./textField.types";

export function getVisualStates(props: TextFieldProps, states: VisualStates) {
    const { prefixCls: customizePrefixCls, disabled } = props;

    const { focusState } = states;
    const prefixCls = getPrefixNs("textField", customizePrefixCls);

    const visualStates = classnames(prefixCls, `${prefixCls}--${focusState}`, {
        [`${prefixCls}--disabled`]: disabled === true,
    });

    return visualStates;
}

export function getInputVisualStates(props: TextFieldProps) {
    const { prefixCls: customizePrefixCls } = props;
    const prefixCls = getPrefixNs("textField", customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__input`);

    return visualStates;
}
