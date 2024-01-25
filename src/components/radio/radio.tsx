import React, { useState, ChangeEvent, useEffect } from "react";
import "./radio.less";

import { useDisabled } from "../control/disabledControl";
import { RadioProps } from "./radio.types";
import { useFocusd } from "../control/userControl";
import { useCurrentChecked } from "../control/checkedControl";
import { CheckState, Color, Mode, Size, ControlType } from "../../global/enum";

import { Ripple } from "../ripple/ripple";
import { getFocusColor, getWaveColor } from "../button/buttonBase";
import {
    CheckedIcon,
    UnCheckedIcon,
    getCheckState,
    getIconContainerVisualStates,
    getInputVisualStates,
    getVisualStates,
} from "./radioBase";

export const Radio = ({
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
    defaultValue,
    defaultChecked = false,
    value = "on",
    onDisabledChange,
    ...props
}: RadioProps) => {
    const { onChange, name } = props;

    const disabled = useDisabled({
        disabled: disabledProp,
        loading,
        controlType: ControlType.Radio,
        onDisabledChange,
    });

    const [currentChecked, setCurrentChecked, setOriginalEvent] =
        useCurrentChecked<HTMLInputElement>({
            checked,
            defaultChecked,
            value,
            name,
            controlType: ControlType.Radio,
            onChange,
        });

    const [focused, handleFocus, handleBlur] = useFocusd(props);

    const [checkStatus, setCheckStatus] = useState(
        getCheckState(currentChecked)
    );

    useEffect(() => {
        setCheckStatus(getCheckState(currentChecked));
    }, [currentChecked]);

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
            <span className={getIconContainerVisualStates(props)}>
                {checkStatus === CheckState.checked && <CheckedIcon />}
                <UnCheckedIcon />
            </span>

            <Ripple focused={focused} color={rippleColor} diameterOffset={0}>
                <input
                    {...props}
                    type="radio"
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

Radio.displayName = ControlType.Radio;
