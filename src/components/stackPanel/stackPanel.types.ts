import { StyleValue } from "../control/control.types";
import { LayoutControlProps } from "../control/layoutControl.types";

export interface StackPanelProps extends LayoutControlProps {
    /**
     * 等同于style属性"flex-direction"，指定主轴方向，可以设置的值如下
     */
    direction?: StyleValue<"row" | "row-reverse" | "column" | "column-reverse">;
    /**
     * 等同于style属性"justify-content"，控制子元素在主轴上的位置，可以设置的值如下
     */
    justifyContent?: StyleValue<
        | "flex-start"
        | "flex-end"
        | "center"
        | "space-between"
        | "space-around"
        | "space-evenly"
    >;
    /**
     * 等同于style属性"align-items"，控制子元素在副轴上的位置，可以设置的值如下
     */
    alignItems?: StyleValue<
        "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
    >;
}
