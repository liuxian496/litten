import React, { useState, FocusEvent, ChangeEvent, useEffect } from 'react';
import './checkbox.less';

import { CheckboxProps } from './checkbox.types';
import { useDisabled } from '../control/userControl';
import { CheckState, Color, Mode, MouseState, Size } from '../../global/enum';
import { Ripple } from '../ripple/ripple';
import { getFocusColor, getWaveColor } from '../button/buttonBase';
import { CheckedIcon, IndeterminateIcon, UnCheckedIcon, getCheckState, getInputVisualStates, getVisualStates } from './checkboxBase';
import { useCurrentChecked } from '../control/checkedControl';
import { littenLabeMouseState, setLabeMouseState } from '../form/formLabel';


export const Checkbox = ({
    disabled: disabledProp = false,
    loading = false,
    color = Color.default,
    rippleColor = {
        focusColor: getFocusColor({ mode: Mode.text, color }),
        waveColor: getWaveColor({ mode: Mode.text, color })
    },
    size = Size.medium,
    style,
    checked,
    defaultChecked,
    value = "on",
    indeterminate = false,
    ...props
}: CheckboxProps) => {

    const { onChange, onFocus, onBlur } = props;

    const disabled = useDisabled<HTMLInputElement>({ disabled: disabledProp, loading });

    const [currentChecked, setCurrentChecked, setOriginalEvent] = useCurrentChecked<HTMLInputElement>({ checked, defaultChecked, onChange });

    const [focused, setFocused] = useState(false);

    const [checkStatus, setCheckStatus] = useState(getCheckState(currentChecked, indeterminate));

    useEffect(() => {
        setCheckStatus(getCheckState(currentChecked, indeterminate));
    }, [currentChecked, indeterminate]);

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setOriginalEvent(e);
        setCurrentChecked(e.target.checked);
    }

    function handleFocus(e: FocusEvent<HTMLInputElement>) {
        if (littenLabeMouseState === MouseState.none) {
            setFocused(true);
        } else {
            setLabeMouseState(MouseState.none);
        }
        onFocus?.(e);
    }

    function handleBlur(e: FocusEvent<HTMLInputElement>) {
        setFocused(false);
        onBlur?.(e);
    }

    return (
        <span
            className={getVisualStates({
                color,
                size,
                disabled,
                ...props
            }, checkStatus)}
        >

            {checkStatus === CheckState.checked && <CheckedIcon />}
            {checkStatus === CheckState.unChecked && <UnCheckedIcon />}
            {checkStatus === CheckState.indeterminate && <IndeterminateIcon />}

            <Ripple focused={focused} color={rippleColor} diameterOffset={0} >
                <input
                    {...props}
                    type='checkbox'
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
    )
};