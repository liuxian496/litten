import classnames from "classnames";
import NP from "number-precision";

import { getPrefixNs } from "../control/control";

import { SliderProps } from "./slider.types";
import { RelativeRect, VisualStates } from "../control/control.types";
import { Orientation } from "../../global/enum";

const componentName = "slider";

/**
 * 获取step对应的像素值
 * @param step
 * @param range
 * @param sliderLength
 * @returns
 */
export function getStepPx(step: number, range: number, sliderLength: number) {
    return NP.times(NP.divide(step, range), sliderLength);
}

export function getTrackStyle(orientation: Orientation, persent: string) {
    let style;
    if (orientation === Orientation.horizontal) {
        style = {
            width: persent,
        };
    } else {
        style = {
            height: persent,
        };
    }

    return style;
}

export function getThumbStyle(orientation: Orientation, persent: string) {
    let style;
    if (orientation === Orientation.horizontal) {
        style = {
            left: persent,
        };
    } else {
        style = {
            bottom: persent,
        };
    }

    return style;
}

export function getPersentByValue(value: number | undefined, min: number) {
    const current = value || 0;
    return current - min + "%";
}

export function getVisualStates(props: SliderProps) {
    const {
        prefixCls: customizePrefixCls,
        color,
        disabled,
        size,
        orientation,
    } = props;

    const prefixCls = getPrefixNs(componentName, customizePrefixCls);

    const visualStates = classnames(
        prefixCls,
        `${prefixCls}--${size}`,
        `${prefixCls}--${orientation}`,
        `${prefixCls}--${color}`,
        {
            [`${prefixCls}--disabled`]: disabled === true,
        }
    );

    return visualStates;
}

export function getRailVisualStates(props: SliderProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs(componentName, customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__rail`);

    return visualStates;
}

export function getTrackVisualStates(props: SliderProps, states: VisualStates) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs(componentName, customizePrefixCls);

    const { mouseState } = states;

    const visualStates = classnames(`${prefixCls}__track`, {
        [`${prefixCls}__track--${mouseState}`]: mouseState !== undefined,
    });

    return visualStates;
}

/**
 * 获取滑块相对于控件原点的偏移量
 * @param rect 相对于目标DOM节点的位置
 * @param orientation 控件布局的方向
 * @returns displacement 相当于控件原点的偏移量
 */
export function getThumbDisplacement(
    rect: RelativeRect,
    orientation: Orientation
) {
    const value = orientation === Orientation.horizontal ? rect.left : rect.top;

    let displacement = value < 0 ? 0 : value;

    const max =
        orientation === Orientation.horizontal
            ? rect.targetWidth
            : rect.targetHeight;

    return displacement < max ? displacement : max;
}

export function getThumbVisualStates(props: SliderProps, states: VisualStates) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs(componentName, customizePrefixCls);

    const { mouseState, focusState } = states;

    const visualStates = classnames(`${prefixCls}__thumb`, {
        [`${prefixCls}__thumb--${mouseState}`]: mouseState !== undefined,
        [`${prefixCls}__thumb--${focusState}`]: focusState !== undefined,
    });

    return visualStates;
}

export function getInputVisualStates(props: SliderProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs(componentName, customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__input`);

    return visualStates;
}
