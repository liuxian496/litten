import { MutableRefObject, useEffect, useState } from "react";

import { MouseState } from "../../global/enum";
import { usePrevious } from "../../global/util";
import { RelativeRect } from "./userControl.types";
import { getPrefixNs as getLittenPrefixNs } from "cyndi/dist/getPrefixNs";

let littenLabelMouseState = MouseState.none;

/**
 * 获取littenLabelMouseState
 * @returns
 */
export function getLabelMouseState() {
    return littenLabelMouseState;
}

/**
 * 设置littenLabelMouseState
 * @param state 待设置的MouseState {MouseState}
 */
export function setLabelMouseState(state: MouseState) {
    littenLabelMouseState = state;
}

/**
 * 获取控件css前缀
 * @param componentName 控件名称 {string}
 * @param customizePrefix 用户自定义前缀 {string}
 * @returns prefix 控件css类前缀 {string}
 */
export function getPrefixNs(
    componentName: string,
    customizePrefix?: string
): string {
    return getLittenPrefixNs(componentName, customizePrefix, "litten");
}

/**
 * 鼠标按下时，获取鼠标相对于指定的DOM节点的相对位置
 * @param ref DOM节点的ref
 */
export function useRelativePosition(
    ref: MutableRefObject<HTMLElement | null>,
    onReactChange?: (rect: RelativeRect) => void
) {
    const [rect, setRect] = useState<RelativeRect>({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        targetWidth: 0,
        targetHeight: 0,
    });

    const previousRect = usePrevious(rect);

    useEffect(() => {
        if (previousRect !== rect) {
            // rect.targetWidth等于0时，鼠标没有移动
            rect.targetWidth > 0 && onReactChange && onReactChange(rect);
        }
    });

    function startMeasure() {
        document.addEventListener("mousedown", handleDocumentMouseMove);
        document.addEventListener("mousemove", handleDocumentMouseMove);
        document.addEventListener("mouseup", handleDocumentMouseUp);
    }

    function handleDocumentMouseMove(e: MouseEvent) {
        let targetRect;

        // 获得的边界矩形与当前的滚动位置无关。
        ref.current && (targetRect = ref.current.getBoundingClientRect());

        targetRect &&
            setRect({
                left: e.clientX - targetRect.left,
                right: e.clientX - targetRect.right,
                top: e.clientY - targetRect.top,
                bottom: e.clientY - targetRect.bottom,
                targetWidth: targetRect.width,
                targetHeight: targetRect.height,
            });
    }

    function handleDocumentMouseUp() {
        document.removeEventListener("mousedown", handleDocumentMouseMove);
        document.removeEventListener("mousemove", handleDocumentMouseMove);
        document.removeEventListener("mouseup", handleDocumentMouseUp);
    }

    return [startMeasure] as [() => void];
}
