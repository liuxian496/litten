import { useState, useEffect } from 'react';
import { UserControlProps } from './control.types';

/**
 * 获取disabled
 * @returns value 当前控件的disabled值 {boolean}
 */
export function useDisabled<T>(props: UserControlProps<T>) {
    const { disabled, loading } = props;

    const [value, setValue] = useState<boolean | undefined>(false);

    useEffect(() => {
        setValue(disabled || loading);
    }, [disabled, loading]);


    return value;
}