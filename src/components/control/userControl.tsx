import { useState, FocusEvent } from "react";
import { UserControlProps } from "./control.types";
import { MouseState } from "../../global/enum";
import { gettLabeMouseState, setLabeMouseState } from "../formLabel/formLabel";

/**
 * 获取用户控件的focused属性对应的值
 * @param props 用户控件属性
 */
export function useFocusd<T>(props: UserControlProps<T>) {
    const { onFocus, onBlur } = props;

    const [focused, setFocused] = useState(false);

    function handleFocus(e: FocusEvent<T>) {
        if (gettLabeMouseState() === MouseState.none) {
            setFocused(true);
        } else {
            setLabeMouseState(MouseState.none);
        }

        onFocus?.(e);
    }

    function handleBlur(e: FocusEvent<T>) {
        setFocused(false);
        onBlur?.(e);
    }

    return [focused, handleFocus, handleBlur] as [
        boolean,
        (e: FocusEvent<T>) => void,
        (e: FocusEvent<T>) => void
    ];
}
