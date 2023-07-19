import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import './form.less';

import { FormControlProps } from './form.types';
import { FormContext } from './form';
import { getInitialValue } from '../../global/util';

import { LittenEvent } from '../control/control.types';

export const FormControl = (props: FormControlProps) => {
    const { children, valuePath } = props;

    const { type: Component, props: childrenProps } = children;

    const { onChange } = childrenProps;

    const { displayName } = Component;

    const [value, setValue] = useState(getInitialValue(displayName));

    const formContext = useContext(FormContext);

    useEffect(() => {
        // 检测value path是否重复,并注册
        formContext?.checkValuePath(valuePath);
        return () => {
            formContext?.uninstall(valuePath);
        }
    }, []);

    useEffect(() => {
        formContext?.register({
            get: getValue,
            set: setValue,
            path: valuePath
        });
    }, [value])

    function getValue() {
        return value;
    }

    function handleChange(event: LittenEvent<ChangeEvent<HTMLInputElement>>) {
        const { value } = event;
        onChange?.(event);
        setValue(value);
    }

    return (
        <>
            <Component value={value} {...childrenProps} onChange={handleChange} />
        </>
    );
}