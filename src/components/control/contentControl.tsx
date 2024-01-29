import {
    useState,
    useEffect,
    ChangeEvent,
    Dispatch,
    SetStateAction,
} from "react";
import { ContentControlProps } from "./contentControl.types";
import { usePrevious } from "../../global/util";
import { ControlType } from "../../global/enum";

/**
 * 检测一个数是否在给定的极值范围之内，并返回检测后的数值。如果小于最小值返回最小值，如果大于最大值返回最大值
 * @param value 待检测的数值
 * @param extremum 极值范围
 * @returns 检测后校准的数值
 */
// export function checkExtremum(value: number, extremum: Extremum) {
//     const { min, max } = extremum;
//     let result;

//     if (value >= min && value <= max) {
//         result = value;
//     } else if (value < min) {
//         result = min;
//     } else if (value > max) {
//         result = max;
//     }

//     return result;
// }

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
 * 如果没有设置DefaultValue，原生控件会有默认值。根据Litten控件displayName获取这个默认值
 * @param displayName Litten控件名称
 */
export function getDefaultValueByDisplayName(displayName: string) {
    let defaultValue;

    switch (displayName) {
        case ControlType.Slider:
            defaultValue = 50;
            break;
        default:
            defaultValue = "";
            break;
    }

    return defaultValue;
}

/**
 * value值不是undefined时，返回value值。否则返回defaultValue的值
 * @returns current 当前控件的默认值
 */
export function useCurrentValue<T, V>(props: ContentControlProps<T, V>) {
    const { value, defaultValue, controlType, onChange } = props;
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
                controlType,
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
