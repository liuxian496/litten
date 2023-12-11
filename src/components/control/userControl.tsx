import { useState, FocusEvent } from "react";
import { UserControlProps } from "./control.types";
import { FocusState, MouseState } from "../../global/enum";
import { gettLabeMouseState, setLabeMouseState } from "../formLabel/formLabel";

/**
 * 获取用户控件的focused属性对应的值，以及onFocus和onBlur的事件处理函数
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

/**
 * 通过focused的值，获取焦点状态
 * @param focused 控件是否获得焦点
 * @returns 焦点状态
 */
export function getStateByFocused(focused: boolean) {
    return focused === true ? FocusState.focus : FocusState.blur;
}
