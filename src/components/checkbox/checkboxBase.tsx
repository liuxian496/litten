import classnames from "classnames";
import { CheckState } from "litten-hooks/dist/enum";

import { getPrefixNs } from "../../global/util";

import { CheckboxProps } from './checkbox.types';

export const CheckedIcon = () => {
    return (
        <svg className="litten-svg" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="checkBoxCheckedIcon">
            <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
        </svg>
    )
};

export const UnCheckedIcon = () => {
    return (
        <svg className="litten-svg" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="checkBoxUnCheckedIcon">
            <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
        </svg>
    )
};

export const IndeterminateIcon = () => {
    return (
        <svg className="litten-svg" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="checkBoxIndeterminateIcon">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"></path>
        </svg>
    )
}

export function getVisualStates(props: CheckboxProps, checkStatus: CheckState) {
    const {
        prefixCls: customizePrefixCls,
        color,
        disabled,
        size,
    } = props;

    const prefixCls = getPrefixNs('checkbox', customizePrefixCls);

    const visualStates = classnames(
        prefixCls,
        `${prefixCls}--${size}`,
        `${prefixCls}--${color}`,
        `${prefixCls}--${checkStatus}`,
        {
            [`${prefixCls}--disabled`]: disabled === true,
        });

    return visualStates;
}

export function getInputVisualStates(props: CheckboxProps) {
    const {
        prefixCls: customizePrefixCls,
    } = props;

    const prefixCls = getPrefixNs('checkbox', customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__input`);

    return visualStates;
}

/**
 * 
 * @param value checked的选中值
 * @param indeterminate 是否处于不确定状态
 * @returns 转换后的CheckState
 */
export function getCheckState(value?: boolean, indeterminate?: boolean) {
    let result = CheckState.unChecked;

    if (indeterminate === true) {
        // 如果checkbox处于不确定状态，CheckState是CheckState.indeterminate状态
        result = CheckState.indeterminate;
    } else {
        // 如果checkbox处于确定状态，CheckState以checked属性为准，checked为true时是CheckState.checked状态
        // 反之是未CheckState.unChecked状态
        if (value === true) {
            result = CheckState.checked;
        } else {
            result = CheckState.unChecked;
        }
    }

    return result;
}