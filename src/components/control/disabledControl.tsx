import { useEffect, useState } from "react";
import { DisabledControlProps } from "./control.types";
import { usePrevious } from "../../global/util";

/**
 * 根据disabled和loading属性的值，计算控件的可用性
 * @param props DisabledControlProps
 * @returns {boolean} 控件的可用性
 */
export function useDisabled(props: DisabledControlProps) {
    const { disabled, loading, controlType, onDisabledChange } = props;

    const [value, setValue] = useState<boolean | undefined>(false);
    const previous = usePrevious(value);

    useEffect(() => {
        setValue(disabled || loading);
    }, [disabled, loading]);

    useEffect(() => {
        if (previous !== value) {
            onDisabledChange?.({
                controlType,
                disabled: value,
            });
        }
    });

    return value;
}
