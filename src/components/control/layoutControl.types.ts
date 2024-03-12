import { ReactNode } from "react";
import { UserControlProps } from "./control.types";

export interface LayoutControlProps extends UserControlProps {
    /**
     * 子组件
     */
    children?: ReactNode;
}