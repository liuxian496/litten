import { Color, Size } from "../../global/enum";
import { CheckedControlProps } from "litten-hooks/dist/control/checkedControl/checkedControl.types";
import { RippleColor } from "../ripple/ripple.types";

export interface CheckboxProps extends CheckedControlProps<HTMLInputElement> {
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
     * 设置一个值，表示checkbox是否处于不确定状态
     */
    indeterminate?: boolean;
    /**
     * 设置ripple组件的颜色
     */
    rippleColor?: RippleColor;
    /**
     * 设置一个值，该值表示checkbox大小
     */
    size?: Size;
}
