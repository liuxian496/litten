import { MutableRefObject, useState } from "react";
import { isString } from "lodash";
import { isEmptyString } from "../../global/util";
import { RelativeRect } from "./control.types";

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
    return isString(customizePrefix) && !isEmptyString(customizePrefix)
        ? customizePrefix + "-" + componentName
        : `litten-${componentName}`;
}

/**
 * 鼠标按下时，获取鼠标相对于指定的DOM节点的相对位置
 * @param ref DOM节点的ref
 */
export function useRelativePosition(ref: MutableRefObject<HTMLElement | null>) {
    const [rect, setRect] = useState<RelativeRect>({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        targetWidth: 0,
        targetHeight: 0,
    });

    function startMeasure() {
        document.addEventListener("mousemove", handleDocumentMouseMove);
        document.addEventListener("mouseup", handleDocumentMouseUp);
    }

    function handleDocumentMouseMove(e: MouseEvent) {
        let targetRect;

        ref.current && (targetRect = ref.current.getBoundingClientRect());

        targetRect &&
            setRect({
                left: e.pageX - targetRect.left,
                right: e.pageX - targetRect.right,
                top: e.pageY - targetRect.top,
                bottom: e.pageY - targetRect.bottom,
                targetWidth: targetRect.width,
                targetHeight: targetRect.height,
            });
    }

    function handleDocumentMouseUp() {
        document.removeEventListener("mousemove", handleDocumentMouseMove);
        document.removeEventListener("mouseup", handleDocumentMouseUp);
    }

    return [rect, startMeasure] as [RelativeRect, () => void];
}
