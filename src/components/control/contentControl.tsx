import {
    useState,
    useEffect,
    ChangeEvent,
    Dispatch,
    SetStateAction,
} from "react";
import { ContentControlProps } from "./control.types";
import { usePrevious } from "../../global/util";

/**
 * value值不是undefined时，返回value值。否则返回defaultValue的值
 * @param value 控件的值（外部传入） {V}
 * @param defaultValue 控件的默认值（外部传入） {V}
 * @returns 计算之后的控件的值
 */
export function getCurrentValue<V>(
    value: V | undefined,
    defaultValue: V | undefined
) {
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
    const { value, defaultValue, userControlType, onChange } = props;
    const prevValue = usePrevious(value);

    const [current, setCurrent] = useState<V | undefined>(
        getCurrentValue<V>(value, defaultValue)
    );
    const previous = usePrevious(current);

    const [originalEvent, setOriginalEvent] = useState<ChangeEvent<T>>();

    useEffect(() => {
        if (prevValue !== value) {
            setOriginalEvent(undefined);
            setCurrent(getCurrentValue<V>(value, defaultValue));
        }
    }, [prevValue, value, defaultValue]);

    useEffect(() => {
        if (previous !== current) {
            onChange?.({
                e: originalEvent,
                userControlType,
                value: current,
            });
        }
    });

    return [current, setCurrent, setOriginalEvent] as [
        V | undefined,
        Dispatch<SetStateAction<V | undefined>>,
        Dispatch<SetStateAction<ChangeEvent<T> | undefined>>
    ];
}
