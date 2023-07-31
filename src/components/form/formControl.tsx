import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import './form.less';

import { FormControlProps } from './form.types';
import { FormContext } from './form';

import { LittenEvent } from '../control/control.types';
import { UserControlType } from '../../global/enum';
import { getCurrentValue } from '../control/contentControl';
import { TextFieldValue } from '../textField/textField.types';

/**
 * 
 * @param type 组件类型
 * @returns value
 */
// export function getInitialValue(type: string, defaultValue: any) {
//     let value;

//     switch (type) {
//         case UserControlType.TextField:
//             value = getCurrentValue<TextFieldValue>(value, defaultValue);
//             break;
//     }

//     return value;
// }

export const FormControl = (props: FormControlProps) => {
    const { children, valuePath } = props;

    const { type: Component, props: childrenProps } = children;

    const { onChange, defaultValue = '' } = childrenProps;

    // const { displayName } = Component;

    const [value, setValue] = useState();

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
            <Component {...childrenProps} value={value} defaultValue={defaultValue} onChange={handleChange} />
        </>
    );
}