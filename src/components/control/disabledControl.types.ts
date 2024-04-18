import { UserControlProps } from "./userControl.types";
import { LittenDisabledChangeEventHandler } from "./littenEvent.types";

export interface DisabledControlProps extends UserControlProps {
    /**
     * 设置一个值，表示是否禁用按钮。默认值false，表示控件可用。
     * @default false 表示按钮可以使用。
     */
    disabled?: boolean;
    /**
     * 设置一个值，该值表示是否正在进行后台加载。默认值，false，表示没有进行后台加载。
     * @default false
     */
    loading?: boolean;
    /**
     * 在此元素的 disabled 属性值更改时发生。
     */
    onDisabledChange?: LittenDisabledChangeEventHandler;
}