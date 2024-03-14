import React from "react";
import "./iconButton.less";

import { useDisabled } from "../control/disabledControl";
import { useFocusd } from "../control/focusControl";
import { Mode, Size, Color, ControlType } from "../../global/enum";

import { IconButtonProps } from "./iconButton.types";
import {
    getVisualStates,
    getFocusColor,
    getWaveColor,
} from "../buttonBase/buttonBase";

import { Ripple } from "../ripple/ripple";

export const IconButton = ({
    color = Color.default,
    mode = Mode.text,
    size = Size.medium,
    disabled: disabledProp = false,
    loading = false,
    rippleColor = {
        focusColor: getFocusColor({ mode, color }),
        waveColor: getWaveColor({ mode, color }),
    },
    onDisabledChange,
    ...props
}: IconButtonProps) => {
    const { children } = props;

    const [focused, handleFocus, handleBlur] = useFocusd(props);

    const disabled = useDisabled({
        disabled: disabledProp,
        loading,
        controlType: ControlType.IconButton,
        onDisabledChange,
    });

    return (
        <button
            className={getVisualStates(
                {
                    color,
                    mode,
                    size,
                    disabled,
                    ...props,
                },
                "iconButton"
            )}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {children}
            {disabled !== true && (
                <Ripple
                    focused={focused}
                    color={rippleColor}
                    diameterOffset={0}
                />
            )}
        </button>
    );
};

IconButton.displayName = ControlType.IconButton;
