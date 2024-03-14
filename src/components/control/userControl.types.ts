import { FocusEvent } from "react";

import { UserControlProps } from "./control.types";

export interface FocusControlProps<T> extends UserControlProps {
    /**
     * 设置元素是否可以聚焦
     */
    tabIndex?: number;
    /**
     *
     * @returns void
     */
    onFocus?: (e: FocusEvent<T>) => void;
    /**
     *
     * @returns void
     */
    onBlur?: (e: FocusEvent<T>) => void;
}
