import { useState, ChangeEvent, useEffect } from "react";
import "./checkbox.less";

import { useFocused } from "litten-hooks/dist/focusControl";
import { useCurrentChecked } from "litten-hooks/dist/checkedControl";
import { CheckState, ControlType } from "litten-hooks/dist/enum";

import { useDisabled } from "litten-hooks/dist/disabledControl";

import { Color, Mode, Size } from "../../global/enum";

import { Ripple } from "../ripple/ripple";
import { handleLabelMouseStateCheck } from "../formLabel/formLabelBase";
import { getFocusColor, getWaveColor } from "../buttonBase/buttonBase";

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
    checked,
    defaultChecked = false,
    value = "on",
    indeterminate = false,
    onDisabledChange,
    ...props
}: CheckboxProps) => {
    const { onChange } = props;

    const disabled = useDisabled({
        disabled: disabledProp,
        loading,
        controlType: ControlType.Checkbox,
        onDisabledChange,
    });

    const [currentChecked, setCurrentChecked, setOriginalEvent] =
        useCurrentChecked({
            checked,
            defaultChecked,
            controlType: ControlType.Checkbox,
            onChange,
        });

    const [focused, handleFocus, handleBlur] = useFocused({
        onLabelMouseStateCheck: handleLabelMouseStateCheck,
        ...props,
    });

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

Checkbox.displayName = ControlType.Checkbox;
