import { getPrefixNs as getLittenPrefixNs } from "cyndi/dist/getPrefixNs";

export function getPrefixNs(
    componentName: string,
    customizePrefix?: string
): string {
    return getLittenPrefixNs(componentName, customizePrefix, "litten");
}
/**
 * 终止鼠标事件的冒泡
 * @param e 事件参数 {React.MouseEvent}
 */
export function handleMouseStopPropagation(e: React.MouseEvent) {
    e.stopPropagation();
}