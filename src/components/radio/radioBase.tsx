import classnames from "classnames";
import { getPrefixNs } from "../control/userControl";

import { RadioProps } from './radio.types';
import { CheckState } from "../../global/enum";

export const CheckedIcon = () => {
    return (
        <svg className="litten-svg" style={{ position: "absolute" }} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="radioCheckedIcon">
            <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
        </svg>
    )
};

export const UnCheckedIcon = () => {
    return (
        <svg className="litten-svg" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="radioUnCheckedIcon">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
        </svg>
    )
};

export function getVisualStates(props: RadioProps, checkStatus: CheckState) {
    const {
        prefixCls: customizePrefixCls,
        color,
        disabled,
        size,
    } = props;

    const prefixCls = getPrefixNs('radio', customizePrefixCls);

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

export function getInputVisualStates(props: RadioProps) {
    const {
        prefixCls: customizePrefixCls,
    } = props;

    const prefixCls = getPrefixNs('radio', customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__input`);

    return visualStates;
}

export function getIconContainerVisualStates(props: RadioProps) {
    const {
        prefixCls: customizePrefixCls,
    } = props;

    const prefixCls = getPrefixNs('radio', customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__iconContainer`);

    return visualStates;
}

/**
 * 
 * @param value checked的选中值
 * @param indeterminate 是否处于不确定状态
 * @returns 转换后的CheckState
 */
export function getCheckState(value?: boolean) {
    let result = CheckState.unChecked;

    // CheckState以checked属性为准，checked为true时是CheckState.checked状态
    // 反之是未CheckState.unChecked状态
    if (value === true) {
        result = CheckState.checked;
    } else {
        result = CheckState.unChecked;
    }

    return result;
}
