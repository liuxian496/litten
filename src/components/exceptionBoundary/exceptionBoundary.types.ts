import { ReactNode } from "react";
import { UserControlProps } from "../control/control.types";

export interface ExceptionBoundaryProps extends UserControlProps {
    /**
     * 错误信息
     */
    errorMsg: string | undefined;
    /**
     * 子组件
     */
    children: ReactNode;
}