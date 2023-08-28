import React, { ChangeEvent, useEffect } from 'react';
import './radio.less';

import { RadioGroupProps } from './radio.types';
import { useCurrentValue } from '../control/contentControl';
import { UserControlType } from '../../global/enum';
import { setCheckedByGroupValue } from '../control/checkedControl';

export const RadioGroup = (props: RadioGroupProps) => {
    const { name, value, defaultValue, children, onChange } = props;

    const [currentValue, setCurrentValue, setOriginalEvent] = useCurrentValue<HTMLInputElement, string>({ value, defaultValue, userControlType: UserControlType.Radio, onChange });

    useEffect(() => {
        currentValue !== undefined && name !== undefined && setCheckedByGroupValue(name, UserControlType.Radio, currentValue);
    }, [currentValue, name]);

    function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
        setOriginalEvent(e);
        setCurrentValue(e.target.value);
    }

    return (
        <span onChange={handleRadioChange}>
            {children}
        </span>
    )
};