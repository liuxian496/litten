import classnames from "classnames";
import {
    SelectedValue,
    VisualStates,
} from "litten-hooks/dist/control/userControl/userControl.types";
import isArray from "lodash/isArray";

import { getPrefixNs } from "../../global/util";
import { ListItemProps } from "./listItem.types";

/**
 * 获取当前项是否选中，true表示选中，false表示未选中
 * @param value 选项的值
 * @param selectedValue listbox的选中值
 * @param multiple 是否多选
 * @returns 当前项是否选中
 */
export function getAriaSelected(
    value: string | undefined,
    selectedValue?: SelectedValue,
    multiple?: boolean
) {
    let result = false;
    if (multiple === true) {
        const values = selectedValue as string[];
        if (isArray(values)) {
            result = values.findIndex((item) => item === value) !== -1;
        }
    } else {
        result = value === selectedValue;
    }
    return result;
}

export function getVisualStates(
    props: ListItemProps,
    states: VisualStates,
    selected: boolean
) {
    const { prefixCls: customizePrefixCls, disabled } = props;
    const { focusState } = states;

    const prefixCls = getPrefixNs("listItem", customizePrefixCls);

    const visualStates = classnames(prefixCls, `${prefixCls}--${focusState}`, {
        [`${prefixCls}--disabled`]: disabled === true,
        [`${prefixCls}--selected`]: selected === true,
    });

    return visualStates;
}
