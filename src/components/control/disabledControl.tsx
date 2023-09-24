import { useEffect, useState } from "react";
import { DisabledControlProps } from "./control.types";

/**
 * 获取用户控件的disabled属性对应的值
 * @param props 可禁用控件属性
 * @returns 
 */
export function useDisabled(props: DisabledControlProps) {
    const { disabled, loading } = props;

    const [value, setValue] = useState<boolean | undefined>(false);

    useEffect(() => {
        setValue(disabled || loading);
    }, [disabled, loading]);

    return value;
}
