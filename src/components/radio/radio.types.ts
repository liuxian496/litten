import { ReactNode } from "react";
import { Color, Size } from "../../global/enum";

import { CheckedControlProps } from "../control/checkedControl.types";
import { ControlProps } from "../control/control.types";
import { LittenContentChangeEventHandler } from "../control/littenEvent.types";
import { RippleColor } from "../ripple/ripple.types";

export interface RadioProps extends CheckedControlProps<HTMLInputElement> {
    "aria-label"?: string;
    /**
     * 设置一个值，该值表示控件的使用风格
     */
    color?: Color;
    /**
     * 设置checkbox在全文档中，唯一的标识符
     */
    id?: string;
    /**
     * 设置ripple组件的颜色
     */
    rippleColor?: RippleColor;
    /**
     * 设置一个值，该值表示checkbox大小
     */
    size?: Size;
}

export interface RadioGroupProps extends ControlProps {
    /**
     * 输入的值
     */
    value?: string;
    /**
     * 默认值
     */
    defaultValue?: string;
    /**
     * 子组件
     */
    children?: ReactNode;
    /**
     * 单选按钮组的名称。当按钮组中的任一单选按钮选中时，其他单选按钮会自动取消选中状态
     */
    name?: string;
    /**
     * 输入的值变化时触发。
     */
    onChange?: LittenContentChangeEventHandler<HTMLInputElement, string>;
}
