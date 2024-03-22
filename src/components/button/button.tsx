import "./button.less";

import classnames from "classnames";

import { Mode, Size, Color, ControlType } from "../../global/enum";
import { getPrefixNs } from "../control/userControl";
import { useFocusd } from "../control/focusControl";
import { useDisabled } from "../control/disabledControl";

import { getVisualStates, getFocusColor, getWaveColor } from "../buttonBase/buttonBase";
import { ButtonProps } from "./button.types";

import { Ripple } from "../ripple/ripple";

/**
 * 获取start icon的视觉状态
 * @param props
 * @returns visualStates 控件当前的视觉状态集合（css类组成的字符串） {string}
 */
function getStartIconVisualStates(props: ButtonProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs("button", customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__icon--start`);

    return visualStates;
}

function getEndIconVisualStates(props: ButtonProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs("button", customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__icon--end`);

    return visualStates;
}

export const Button = ({
    color = Color.default,
    mode = Mode.text,
    size = Size.medium,
    disabled: disabledProp = false,
    loading = false,
    startIcon,
    endIcon,
    rippleColor = {
        focusColor: getFocusColor({ mode, color }),
        waveColor: getWaveColor({ mode, color }),
    },
    onDisabledChange,
    ...props
}: ButtonProps) => {
    const { children } = props;

    const [focused, handleFocus, handleBlur] = useFocusd(props);

    const disabled = useDisabled({
        disabled: disabledProp,
        loading,
        controlType: ControlType.Button,
        onDisabledChange,
    });

    return (
        <button
            type="button"
            disabled={disabled}
            aria-disabled={disabled}
            className={getVisualStates(
                {
                    color,
                    mode,
                    size,
                    disabled,
                    ...props,
                },
                "button"
            )}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {startIcon && (
                <span className={getStartIconVisualStates(props)}>
                    {startIcon}
                </span>
            )}
            {children}
            {endIcon && (
                <span className={getEndIconVisualStates(props)}>{endIcon}</span>
            )}
            {disabled !== true && (
                <Ripple focused={focused} color={rippleColor} />
            )}
        </button>
    );
};

Button.displayName = ControlType.Button;
