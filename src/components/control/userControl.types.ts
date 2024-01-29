import { FocusEvent } from "react";

import { DisabledControlProps } from "./disabledControl.types";

export interface UserControlProps<T> extends DisabledControlProps {
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
