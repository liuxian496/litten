import React, { useContext, useEffect, useState } from 'react';
import './form.less';

import { FormControlProps } from './form.types';
import { FormContext } from './form';

import { ContentControlProps, LittenContentChangeEvent, LittenValue } from '../control/control.types';

export const FormControl = (props: FormControlProps) => {
    const { children, valuePath } = props;

    const { type: Component, props: childrenProps } = children;

    const { onChange, defaultValue = '' } = childrenProps as ContentControlProps;

    // const { displayName } = Component;

    const [value, setValue] = useState<LittenValue>();

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

    function handleChange(event: LittenContentChangeEvent) {
        const { value } = event;
        onChange?.(event);
        setValue(value);
    }

    return (
        <>
            <Component {...childrenProps} value={value} defaultValue={defaultValue} onChange={handleChange} />
        </>
    );
}