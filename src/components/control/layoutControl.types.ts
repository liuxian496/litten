import { ReactNode } from "react";
import { ControlProps } from "./control.types";

export interface LayoutControlProps extends ControlProps {
    /**
     * 子组件
     */
    children?: ReactNode;
}