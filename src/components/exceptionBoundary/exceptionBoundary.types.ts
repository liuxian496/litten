import { ReactNode } from "react";
import { ControlProps } from "../control/control.types";

export interface ExceptionBoundaryProps extends ControlProps {
    /**
     * 错误信息
     */
    errorMsg: string | undefined;
    /**
     * 子组件
     */
    children: ReactNode;
}