import { LayoutControlProps, StyleValue } from "../control/control.types";

export interface StackPanelProps extends LayoutControlProps {
    /**
     * 等同于style属性"flex-direction"，可以设置的值如下
     */
    direction?: StyleValue<"row" | "row-reverse" | "column" | "column-reverse">;
}
