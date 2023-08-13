import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from 'react';
import { CheckedControlProps } from './control.types';
import { getCurrentValue } from './contentControl';
import { usePrevious } from '../../global/util';

/**
 * 控制控件的选中状态，并触发对应的change事件
 * @param props 控件属性 CheckedControlProps
 */
export function useCurrentChecked<T>(props: CheckedControlProps<T>) {

    const { checked, defaultChecked, onChange, value } = props;

    const prevChecked = usePrevious(checked);

    const [current, setCurrent] = useState<boolean | undefined>(getCurrentValue<boolean>(checked, defaultChecked));
    const previous = usePrevious(current);

    const [originalEvent, setOriginalEvent] = useState<ChangeEvent<T>>();

    useEffect(() => {
        if (prevChecked !== checked) {
            setOriginalEvent(undefined);
            setCurrent(getCurrentValue<boolean>(checked, defaultChecked));
        }
    }, [prevChecked, checked, defaultChecked]);

    useEffect(() => {
        if (previous !== current) {
            onChange?.({
                e: originalEvent,
                value,
                checked: current
            })
        }
    });

    return [
        current,
        setCurrent,
        setOriginalEvent
    ] as [
            boolean | undefined,
            Dispatch<SetStateAction<boolean | undefined>>,
            Dispatch<SetStateAction<ChangeEvent<T> | undefined>>
        ];
}

