import { useState, useEffect } from 'react';
import { ContentControlProps } from './control.types';

/**
 * value值不是undefined时，返回value值。否则返回defaultValue的值
 * @param value 控件的值 {V}
 * @param defaultValue 控件的默认值 {V}
 * @param defaultValue 控件是否处于不确定状态 {boolean}
 * @returns 控件的值
 */
export function getCurrentValue<V>(value: V | undefined, defaultValue: V | undefined) {
    let current;
    if (value !== undefined) {
        current = value;
    } else {
        current = defaultValue;
    }

    return current;
}

/**
 * value值不是undefined时，返回value值。否则返回defaultValue的值
 * @returns current 当前控件的默认值
 */
export function useCurrentValue<T, V>(props: ContentControlProps<T, V>) {

    const { value, defaultValue } = props;

    const [current, setCurrent] = useState<V | undefined>(getCurrentValue<V>(value, defaultValue));

    useEffect(() => {
        setCurrent(getCurrentValue<V>(value, defaultValue));
    }, [value]);


    return current;
}