import { CSSProperties, ChangeEvent, FocusEvent, ReactNode } from "react";

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

export interface ContentControlProps<T, V> extends UserControlProps<T> {
    /**
     * 输入的值
     */
    value?: V | undefined;
    /**
     * 默认值
     */
    defaultValue?: V | undefined,
    /**
     * 输入的值变化时触发。
     */
    onChange?: (e: LittenEvent<ChangeEvent<T>>) => void;
}

export interface CheckedControlProps<T> extends ContentControlProps<T, string | ReadonlyArray<string> | number | undefined> {
    /**
     * 设置一个值，该值表示chekbox是否勾选。true，代表勾选。
     */
    checked?: boolean,
    /**
     * 设置一个值，该值表示chekbox是否默认勾选，只在初始化后生效一次。true，表示默认勾选。
     */
    defaultChecked?: boolean
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
export interface LittenEvent<E> {
    e?: E
    value: any;
    checked?: boolean;
}