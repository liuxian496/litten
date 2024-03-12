import { LittenValue, UserControlProps } from "./control.types";
import { LittenContentChangeEventHandler } from "./littenEvent.types";

export interface ContentControlProps<T = Element, V = LittenValue>
    extends UserControlProps {
    /**
     * 输入的值
     */
    value?: V;
    /**
     * 默认值
     */
    defaultValue?: V;
    /**
     * 输入的值变化时触发。
     */
    onChange?: LittenContentChangeEventHandler<T, V>;
}