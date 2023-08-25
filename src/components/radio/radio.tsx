import React, { useState, FocusEvent, ChangeEvent, useEffect } from 'react';
import './radio.less';

import { RadioProps } from './radio.types';
import { useDisabled } from '../control/userControl';
import { CheckState, Color, Mode, MouseState, Size, UserControlType } from '../../global/enum';
import { Ripple } from '../ripple/ripple';
import { getFocusColor, getWaveColor } from '../button/buttonBase';
import { CheckedIcon, UnCheckedIcon, getCheckState, getIconContainerVisualStates, getInputVisualStates, getVisualStates } from './radioBase';
import { useCurrentChecked } from '../control/checkedControl';
import { littenLabeMouseState, setLabeMouseState } from '../form/formLabel';


export const Radio = ({
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
    defaultChecked = false,
    value = "on",
    ...props
}: RadioProps) => {
    const { onChange, onFocus, onBlur, name } = props;

    const disabled = useDisabled<HTMLInputElement>({ disabled: disabledProp, loading });

    const [currentChecked, setCurrentChecked, setOriginalEvent] = useCurrentChecked<HTMLInputElement>({ checked, defaultChecked, value, name, userControlType: UserControlType.Radio, onChange });

    const [focused, setFocused] = useState(false);

    const [checkStatus, setCheckStatus] = useState(getCheckState(currentChecked));

    useEffect(() => {
        setCheckStatus(getCheckState(currentChecked));
    }, [currentChecked]);

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
            <span className={getIconContainerVisualStates(props)}>
                {checkStatus === CheckState.checked && <CheckedIcon />}
                <UnCheckedIcon />
            </span>

            <Ripple focused={focused} color={rippleColor} diameterOffset={0} >
                <input
                    {...props}
                    type='radio'
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