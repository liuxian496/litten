import React, { useState, ChangeEvent, useEffect } from "react";
import "./checkbox.less";

import { useFocusd } from "../control/userControl";
import { useCurrentChecked } from "../control/checkedControl";
import { useDisabled } from "../control/disabledControl";
import {
    CheckState,
    Color,
    Mode,
    Size,
    UserControlType,
} from "../../global/enum";

import { Ripple } from "../ripple/ripple";
import { getFocusColor, getWaveColor } from "../button/buttonBase";
import { CheckboxProps } from "./checkbox.types";
import {
    CheckedIcon,
    IndeterminateIcon,
    UnCheckedIcon,
    getCheckState,
    getInputVisualStates,
    getVisualStates,
} from "./checkboxBase";

export const Checkbox = ({
    disabled: disabledProp = false,
    loading = false,
    color = Color.default,
    rippleColor = {
        focusColor: getFocusColor({ mode: Mode.text, color }),
        waveColor: getWaveColor({ mode: Mode.text, color }),
    },
    size = Size.medium,
    style,
    checked,
    defaultChecked = false,
    defaultValue,
    value = "on",
    indeterminate = false,
    ...props
}: CheckboxProps) => {
    const { onChange } = props;

    const disabled = useDisabled({ disabled: disabledProp, loading });

    const [currentChecked, setCurrentChecked, setOriginalEvent] =
        useCurrentChecked({
            checked,
            defaultChecked,
            onChange,
            userControlType: UserControlType.Checkbox,
        } as CheckboxProps);

    const [focused, handleFocus, handleBlur] = useFocusd(props);

    const [checkStatus, setCheckStatus] = useState(
        getCheckState(currentChecked, indeterminate)
    );

    useEffect(() => {
        setCheckStatus(getCheckState(currentChecked, indeterminate));
    }, [currentChecked, indeterminate]);

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setOriginalEvent(e);
        setCurrentChecked(e.target.checked);
    }

    return (
        <span
            className={getVisualStates(
                {
                    color,
                    size,
                    disabled,
                    ...props,
                },
                checkStatus
            )}
        >
            {checkStatus === CheckState.checked && <CheckedIcon />}
            {checkStatus === CheckState.unChecked && <UnCheckedIcon />}
            {checkStatus === CheckState.indeterminate && <IndeterminateIcon />}

            <Ripple focused={focused} color={rippleColor} diameterOffset={0}>
                <input
                    {...props}
                    type="checkbox"
                    className={getInputVisualStates(props)}
                    disabled={disabled}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={value}
                    checked={currentChecked}
                    onChange={handleInputChange}
                />
            </Ripple>
        </span>
    );
};

Checkbox.displayName = UserControlType.Checkbox;
