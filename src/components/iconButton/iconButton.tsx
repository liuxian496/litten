import React, { FocusEvent, useState } from 'react';
import './iconButton.less';

import { Mode, Size, Color } from '../../global/enum';

import { IconButtonProps } from './iconButton.types';
import { useDisabled } from '../control/userControl';
import { getVisualStates, getFocusColor, getWaveColor } from '../button/buttonBase';

import { Ripple } from '../ripple/ripple';

export const IconButton = ({
    color = Color.default,
    mode = Mode.text,
    size = Size.medium,
    disabled: disabledProp = false,
    loading = false,
    rippleColor = {
        focusColor: getFocusColor({ mode, color }),
        waveColor: getWaveColor({ mode, color })
    },
    ...props
}: IconButtonProps) => {
    const { children, onFocus, onBlur } = props;

    const [focused, setFocused] = useState(false);

    const disabled = useDisabled({ disabled: disabledProp, loading });

    function handleFocus(e: FocusEvent<HTMLButtonElement>) {
        setFocused(true);
        onFocus?.(e);
    }

    function handleBlur(e: FocusEvent<HTMLButtonElement>) {
        setFocused(false);
        onBlur?.(e);
    }

    return (
        <button
            className={getVisualStates({
                color,
                mode,
                size,
                disabled,
                ...props,
            }, 'iconButton')}
            {...props}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {children}
            {disabled !== true && <Ripple focused={focused} color={rippleColor} diameterOffset={0} />}
        </button>
    )
}