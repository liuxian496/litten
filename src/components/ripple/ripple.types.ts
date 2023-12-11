import { ReactNode } from "react";
import { ControlProps } from "../control/control.types";
import { MouseState, WaveMode } from "../../global/enum";

/**
 * 波浪组件的参数
 */
export interface RippleProps extends ControlProps {
    /**
     * 获取一个布尔值，该值表示父控件是否获取了焦点，true表示已经获取焦点
     */
    focused: boolean;
    /**
     * 设置波浪组件的颜色
     */
    color: RippleColor;
    /**
     * 设置按钮内容
     */
    children?: ReactNode;
    /**
     * 直径偏移量
     */
    diameterOffset?: number;
    /**
     * wave部件的计算的方式
     */
    waveMode?: WaveMode;
}

/**
 * 波浪组件的参数
 */
export interface RippleColor {
    /**
     * 焦点部件颜色
     */
    focusColor: string;
    /**
     * 波纹部件颜色
     */
    waveColor: string;
}

/**
 * 波纹部件的参数
 */
export interface WaveProps extends ControlProps {
    isPressed: boolean;
    index: number;
    containerSpanWidth: number;
    containerSpanHeight: number;
    mouseClientX: number;
    mouseClientY: number;
    parentOffsetLeft: number;
    parentOffsetTop: number;
    color: RippleColor;
    /**
     * wave部件的计算的方式
     */
    waveMode?: WaveMode;
    onWaveAnimationEnd?: (index: number) => void;
}

/**
 * 焦点部件的参数
 */
export interface RippleFocusProps extends ControlProps {
    isFocused: boolean;
    containerSpanWidth: number;
    containerSpanHeight: number;
    color: RippleColor;
    //直径偏移量
    diameterOffset?: number;
}

/**
 * LittenRipple
 */
export interface LittenRipple {
    setMouseState: (state: MouseState) => void;
}
