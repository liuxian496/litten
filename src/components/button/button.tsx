import "./button.less";

import classnames from "classnames";
import { ControlType } from "litten-hooks/dist/enum";
import { useFocused } from "litten-hooks/dist/focusControl";
import { useDisabled } from "litten-hooks/dist/disabledControl";

import { Mode, Size, Color } from "../../global/enum";
import { getPrefixNs } from "../../global/util";

import {
    getVisualStates,
    getFocusColor,
    getWaveColor,
} from "../buttonBase/buttonBase";
import { ButtonProps } from "./button.types";

import { Ripple } from "../ripple/ripple";
import { handleLabelMouseStateCheck } from "../formLabel/formLabelBase";

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

    const [focused, handleFocus, handleBlur] = useFocused({
        onLabelMouseStateCheck: handleLabelMouseStateCheck,
        ...props,
    });

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
