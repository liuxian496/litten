import { CSSProperties, ChangeEvent, FocusEvent, ReactNode } from "react";
import { TextFieldValue } from "../textField/textField.types";

export interface ControlProps {
    /**
     * 设置自定义控件前缀
     */
    prefixCls?: string;
    /**
     * 设置内联样式
     */
    style?: CSSProperties;
}

export interface UserControlProps<T> extends ControlProps {
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
     * 设置元素是否可以聚焦
     */
    tabindex?: number;
    /**
     * 
     * @returns void
     */
    onFocus?: (e: FocusEvent<T>) => void;
    /**
     * 
     * @returns void
     */
    onBlur?: (e: FocusEvent<T>) => void;
}

export interface LayoutControl extends ControlProps { }

export type LittenValue = string | ReadonlyArray<string> | number | undefined;

export interface ContentControlProps<T = Element, V = LittenValue> extends UserControlProps<T> {
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

export interface CheckedControlProps<T> extends ContentControlProps<T, string> {
    /**
     * 设置一个值，该值表示chekbox是否勾选。true，代表勾选。
     */
    checked?: boolean;
    /**
     * 设置一个值，该值表示chekbox是否默认勾选，只在初始化后生效一次。true，表示默认勾选。
     */
    defaultChecked?: boolean;
    /**
     * 单选按钮组的名称。当按钮组中的任一单选按钮选中时，其他单选按钮会自动取消选中状态
     */
    name?: string;
}

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

/**
 * 视觉状态组
 */
export interface VisualStates {
    /**
     * 设置一个值，该值表示控件是否处于焦点状态
     */
    focused?: boolean;
    /**
     * 设置一个值，表示是否处于禁用状态。
     * 
     */
    disabled?: boolean;
}

/**
 * 自定义事件参数
 */
export interface LittenEvent<E, V> {
    e?: E
    value?: V;
    checked?: boolean;
}

export type LittenContentChangeEvent = LittenEvent<ChangeEvent<Element>, LittenValue>;
export type LittenContentChangeEventHandler<T, V> = (e: LittenEvent<ChangeEvent<T>, V>) => void;


export type LittenTextChangeEvent = LittenEvent<ChangeEvent<HTMLInputElement>, TextFieldValue>;
export type LittenCheckedChangeEvent = LittenEvent<ChangeEvent<HTMLInputElement>, string>;


