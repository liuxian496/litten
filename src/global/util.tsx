import { useEffect, useRef } from "react";

/**
 * 保存前一个状态的值
 * @param value 要保存的值
 * @returns current 前一个状态的值 {any}
 */
export function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

/**
 * 终止鼠标事件的冒泡
 * @param e 事件参数 {React.MouseEvent}
 */
export function handleMouseStopPropagation(e: React.MouseEvent) {
    e.stopPropagation();
}

/**
 * 输出控制台错误信息
 * @param msg 错误信息
 * @returns errorMsg 处理后的错误信息 {string}
 */
export function error(msg?: string) {
    const errorMsg = `[litten error]: ${msg}`;
    console.error(errorMsg);

    return errorMsg;
}

/**
 * 输出控制台警告信息
 * @param msg 警告信息
 */
export function warn(msg: string) {
    console.warn(`[litten warning]: ${msg}`);
}
