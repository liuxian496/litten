import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import "./switch.less";

import { useDisabled } from "../control/disabledControl";
import { useFocusd } from "../control/userControl";
import { useCurrentChecked } from "../control/checkedControl";
import {
    Color,
    MouseState,
    Size,
    UserControlType,
    WaveMode,
} from "../../global/enum";

import { SwitchProps } from "./switch.types";
import { LittenRipple } from "../ripple/ripple.types";
import { Ripple } from "../ripple/ripple";
import {
    getCheckState,
    getTrackVisualStates,
    getInputVisualStates,
    getThumbContainerVisualStates,
    getVisualStates,
    getThumbVisualStates,
    getRippleColor,
} from "./switchBase";

export const Switch = ({
    disabled: disabledProp = false,
    loading = false,
    color = Color.default,
    size = Size.medium,
    style,
    checked,
    defaultValue,
    defaultChecked = false,
    value = "on",
    ...props
}: SwitchProps) => {
    const { onChange, name } = props;

    const rippleRef = useRef<LittenRipple | null>(null);

    const disabled = useDisabled({ disabled: disabledProp, loading });

    const [currentChecked, setCurrentChecked, setOriginalEvent] =
        useCurrentChecked<HTMLInputElement>({
            checked,
            defaultChecked,
            value,
            name,
            userControlType: UserControlType.Switch,
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

    function handleInputMouseOver() {
        rippleRef.current?.setMouseState(MouseState.mouseover);
    }

    function handleInputMouseOut() {
        rippleRef.current?.setMouseState(MouseState.mouseout);
    }

    function handleInputMouseDown() {
        rippleRef.current?.setMouseState(MouseState.mousedown);
    }

    function handleInputMouseUp() {
        rippleRef.current?.setMouseState(MouseState.mouseup);
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
            <span className={getThumbContainerVisualStates(props, checkStatus)}>
                <span className={getThumbVisualStates(props)}></span>
                <Ripple
                    ref={rippleRef}
                    focused={focused}
                    color={getRippleColor({ color, checked: currentChecked })}
                    diameterOffset={0}
                    waveMode={WaveMode.center}
                ></Ripple>
            </span>
            <span className={getTrackVisualStates(props)}></span>
            <input
                {...props}
                type="checkbox"
                role="switch"
                className={getInputVisualStates(props)}
                disabled={disabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                checked={currentChecked}
                onChange={handleInputChange}
                onMouseOver={handleInputMouseOver}
                onMouseOut={handleInputMouseOut}
                onMouseDown={handleInputMouseDown}
                onMouseUp={handleInputMouseUp}
            />
        </span>
    );
};

Switch.displayName = UserControlType.Switch;
