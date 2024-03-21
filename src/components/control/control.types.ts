import { CSSProperties } from "react";

import {
    EnableState,
    FocusState,
    MouseState,
    ControlType,
} from "../../global/enum";

export interface UserControlProps {
    /**
     * 设置自定义控件前缀
     */
    prefixCls?: string | undefined;
    /**
     * 设置内联样式
     */
    style?: CSSProperties | undefined;
    /**
     * UserControl类型，代表在litten中的唯一标识
     */
    controlType?: ControlType | undefined;
}

export type StyleValue<T> = T;

export type ResponsiveStyleValue<T> = T | { [key: string]: T | null };

export type LittenValue =
    | string
    | ReadonlyArray<string>
    | number
    | boolean
    | undefined;

/**
 * 极值
 */
export type Extremum = {
    readonly min: number;
    readonly max: number;
};

/**
 * 视觉状态组
 */
export interface VisualStates {
    /**
     * 设置一个值，该值表示控件的焦点状态。
     */
    focusState?: FocusState;
    /**
     * 设置一个值，表示是控件的可用状态。
     */
    enableState?: EnableState;
    /**
     * 设置一个值，该值表示控件的鼠标状态。
     */
    mouseState?: MouseState;
}

/**
 * 相对于目标DOM节点的位置
 */
export type RelativeRect = {
    /**
     * 鼠标位置与目标DOM的相对位置的左坐标
     */
    readonly left: number;
    /**
     * 鼠标位置与目标DOM的相对位置的右坐标
     */
    readonly right: number;
    /**
     * 鼠标位置与目标DOM的相对位置的上坐标
     */
    readonly top: number;
    /**
     * 鼠标位置与目标DOM的相对位置的下坐标
     */
    readonly bottom: number;
    /**
     * 目标节点的宽度
     */
    readonly targetWidth: number;
    /**
     * 目标节点的高度
     */
    readonly targetHeight: number;
};
