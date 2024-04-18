import { ReactNode } from "react";
import { UserControlProps } from "./userControl.types";

export interface LayoutControlProps extends UserControlProps {
    /**
     * 设置元素的 class 属性
     */
    className?: string | undefined;
    /**
     * 子组件
     */
    children?: ReactNode;
}
