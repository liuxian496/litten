import { Color, Orientation, Size } from "../../global/enum";
import { ContentControlProps } from "../control/contentControl.types";
import { DisabledControlProps } from "../control/disabledControl.types";
import { FocusControlProps } from "../control/focusControl.types";

export type SliderMark = {
    /**
     * 刻度标签对应的值
     */
    value: number;
    /**
     * 刻度的标签
     */
    label: string;
};

export type SliderMarks = true | [{ value: number; label: string }];

export interface SliderProps
    extends FocusControlProps<HTMLInputElement>,
        DisabledControlProps,
        ContentControlProps<HTMLInputElement, number> {
    "aria-label"?: string;
    /**
     * 设置一个值，该值表示控件的使用风格
     */
    color?: Color;
    /**
     * 设置slider在全文档中，唯一的标识符
     */
    id?: string;
    /**
     * 设置一个值，该值表示slider的大小
     */
    size?: Size;
    /**
     * 设置slider的方向
     */
    orientation?: Orientation;
    /**
     * 每次移动时的最小粒度
     */
    step?: number;
    /**
     * 刻度。范围由min和max决定(待开发)
     */
    marks?: SliderMarks;
    /**
     * 可选范围的最小值，必须小于最大值
     */
    min?: number;
    /**
     * 可选范围的最大值
     */
    max?: number;
}

/**
 * LittenSlider
 */
export interface LittenSlider {
    value: number;
}
