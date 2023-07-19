import { ReactNode } from "react";
import { LayoutControl } from "../control/control.types";
import { Color } from "../../global/enum";

export interface SummaryProps extends LayoutControl {
    /**
     * 设置内容
     */
    children?: ReactNode;
    /**
     * 设置一个值，该值表示Summary的类型
     */
    color?: Color;
}