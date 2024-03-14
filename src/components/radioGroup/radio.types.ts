import { ReactNode } from "react";

import { ContentControlProps } from "../control/contentControl.types";

export interface RadioGroupProps extends ContentControlProps<HTMLInputElement, string> {
    /**
     * 子组件
     */
    children?: ReactNode;
    /**
     * 单选按钮组的名称。当按钮组中的任一单选按钮选中时，其他单选按钮会自动取消选中状态
     */
    name?: string;
}
