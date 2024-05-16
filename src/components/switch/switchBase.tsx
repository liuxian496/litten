import classnames from "classnames";
import { CheckState } from "litten-hooks/dist/enum";

import { getPrefixNs } from "../../global/util";
import { Mode } from "../../global/enum";

import { getFocusColor, getWaveColor } from "../buttonBase/buttonBase";
import { SwitchProps } from "./switch.types";

export function getRippleColor(props: SwitchProps) {
    const { checked, color } = props;
    const mode = checked === true ? Mode.text : Mode.primary;

    return {
        focusColor: getFocusColor({ mode, color }),
        waveColor: getWaveColor({ mode, color }),
    };
}

export function getVisualStates(props: SwitchProps, checkStatus: CheckState) {
    const { prefixCls: customizePrefixCls, color, disabled, size } = props;

    const prefixCls = getPrefixNs("switch", customizePrefixCls);

    const visualStates = classnames(
        prefixCls,
        `${prefixCls}--${size}`,
        `${prefixCls}--${color}`,
        `${prefixCls}--${checkStatus}`,
        {
            [`${prefixCls}--disabled`]: disabled === true,
        }
    );

    return visualStates;
}

export function getInputVisualStates(props: SwitchProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs("switch", customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__input`);

    return visualStates;
}

export function getThumbContainerVisualStates(
    props: SwitchProps,
    checkStatus: CheckState
) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs("switch", customizePrefixCls);

    const visualStates = classnames(
        `${prefixCls}__thumbContainer`,
        `${prefixCls}__thumbContainer--${checkStatus}`
    );

    return visualStates;
}

export function getThumbVisualStates(props: SwitchProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs("switch", customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__thumb`);

    return visualStates;
}

export function getTrackVisualStates(props: SwitchProps) {
    const { prefixCls: customizePrefixCls } = props;

    const prefixCls = getPrefixNs("switch", customizePrefixCls);

    const visualStates = classnames(`${prefixCls}__track`);

    return visualStates;
}

/**
 *
 * @param value checked的选中值
 * @returns 转换后的CheckState
 */
export function getCheckState(value?: boolean) {
    let result = CheckState.unChecked;

    // CheckState以checked属性为准，checked为true时是CheckState.checked状态
    // 反之是未CheckState.unChecked状态
    if (value === true) {
        result = CheckState.checked;
    } else {
        result = CheckState.unChecked;
    }

    return result;
}
