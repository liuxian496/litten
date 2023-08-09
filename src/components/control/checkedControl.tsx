import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { CheckedControlProps } from './control.types';
import { getCurrentValue } from './contentControl';

/**
 * value值不是undefined时，返回value值。否则返回defaultValue的值
 * @returns current 当前控件的默认值
 */
export function useCurrentChecked<T>(props: CheckedControlProps<T>) {

    const { checked, defaultChecked } = props;

    const [current, setCurrent] = useState<boolean | undefined>(getCurrentValue<boolean>(checked, defaultChecked));

    //defaultChecked值在初始化后，生效一次。
    useEffect(() => {
        setCurrent(getCurrentValue<boolean>(checked, defaultChecked));
    }, [checked]);


    return [current, setCurrent] as [boolean | undefined, Dispatch<SetStateAction<boolean | undefined>>];
}
