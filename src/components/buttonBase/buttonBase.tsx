import classnames from "classnames";
import { getPrefixNs } from "../../global/util";

import { ButtonBaseProps } from '../buttonBase/buttonBase.types';
import { Color, Mode, White, Blue, Red, Green, Orange } from "../../global/enum";


/**
 * 获取视觉状态
 * @param prefixCls 控件css类前缀 {string}
 * @returns visualStates 控件当前的视觉状态集合（css类组成的字符串） {string}
 */
export function getVisualStates(props: ButtonBaseProps, componentName: string) {
    const {
        prefixCls: customizePrefixCls,
        color,
        disabled,
        mode,
        size,
    } = props;
    const prefixCls = getPrefixNs(componentName, customizePrefixCls);

    const visualStates = classnames(
        prefixCls,
        `${prefixCls}--${size}`,
        `${prefixCls}--${mode}`,
        `${prefixCls}--${color}`,
        {
            [`${prefixCls}--disabled`]: disabled === true,
        });

    return visualStates;
}

export function getFocusColor(props: ButtonBaseProps) {
    const { mode, color } = props;
    let focusColor: string = White.rippleFocus;

    switch (color) {
        case Color.default:
            focusColor = (mode === Mode.text || mode === Mode.outlined) ? Blue.rippleFocus : White.rippleFocus;
            break;
        case Color.danger:
            focusColor = (mode === Mode.text || mode === Mode.outlined) ? Red.rippleFocus : White.rippleFocus;
            break;
        case Color.success:
            focusColor = (mode === Mode.text || mode === Mode.outlined) ? Green.rippleFocus : White.rippleFocus;
            break;
        case Color.warning:
            focusColor = (mode === Mode.text || mode === Mode.outlined) ? Orange.rippleFocus : White.rippleFocus;
            break;
    }

    return focusColor;
}

export function getWaveColor(props: ButtonBaseProps) {
    const { mode, color } = props;
    let waveColor: string = White.main;

    switch (color) {
        case Color.default:
            waveColor = (mode === Mode.text || mode === Mode.outlined) ? Blue.rippleWave : White.rippleFocus;
            break;
        case Color.danger:
            waveColor = (mode === Mode.text || mode === Mode.outlined) ? Red.rippleWave : White.rippleFocus;
            break;
        case Color.success:
            waveColor = (mode === Mode.text || mode === Mode.outlined) ? Green.rippleWave : White.rippleFocus;
            break;
        case Color.warning:
            waveColor = (mode === Mode.text || mode === Mode.outlined) ? Orange.rippleWave : White.rippleFocus;
            break;
    }

    return waveColor;
}