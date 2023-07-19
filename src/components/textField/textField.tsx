import React, { useState, FocusEvent, ChangeEvent, useEffect } from 'react';
import './textField.less';

import classnames from 'classnames';

import { getPrefixNs } from '../control/control';
import { useDisabled } from '../control/userControl';
import { VisualStates } from '../control/control.types';

import { TextFieldProps } from './textField.types';
import { usePrevious } from '../../global/util';
import { ChangeEventState } from '../../global/enum';

function getVisualStates(props: TextFieldProps, states: VisualStates) {
    const {
        prefixCls: customizePrefixCls,
        disabled,
    } = props;

    const { focused } = states;
    const prefixCls = getPrefixNs('textField', customizePrefixCls);

    const visualStates = classnames(
        prefixCls,
        {
            [`${prefixCls}--disabled`]: disabled === true,
            [`${prefixCls}--focused`]: focused === true,
        });

    return visualStates;
}

function getInputVisualStates(props: TextFieldProps) {
    const {
        prefixCls: customizePrefixCls,
    } = props;
    const prefixCls = getPrefixNs('textField', customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__input`);

    return visualStates;
}

export const TextField = ({
    disabled: disabledProp = false,
    loading = false,
    value,
    style,
    ...props
}: TextFieldProps) => {
    const { onChange, onFocus, onBlur } = props;

    const disabled = useDisabled({ disabled: disabledProp, loading });

    const [focused, setFocused] = useState(false);
    const previousValue = usePrevious(value);

    const [status, setStatus] = useState(ChangeEventState.Default);

    useEffect(() => {
        if (status !== ChangeEventState.UserInput) {
            onChange?.({
                previousValue,
                value
            });
        }
        setStatus(ChangeEventState.DevSet);
    }, [value])

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setStatus(ChangeEventState.UserInput);
        onChange?.({
            e,
            previousValue,
            value: e.target.value
        });
    }

    function handleFocus(e: FocusEvent<HTMLInputElement>) {
        setFocused(true);
        onFocus?.(e);
    }

    function handleBlur(e: FocusEvent<HTMLInputElement>) {
        setFocused(false);
        onBlur?.(e);
    }

    return (
        <div
            className={getVisualStates({
                disabled,
                ...props,
            }, { focused })}
            style={style}
        >
            <input
                className={getInputVisualStates({
                    disabled,
                    ...props,
                })}
                disabled={disabled}
                {...props}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    )
}