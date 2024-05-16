import max from "lodash/max";

import { RippleFocusProps } from "./ripple.types";
import { ControlType } from "litten-hooks/dist/enum";

//直径需要减少的值
const offset = 16;

/**
 * 获取focus部件的样式
 */
function getFocusStyle(props: {
    containerSpanWidth: number;
    containerSpanHeight: number;
    color: string;
    diameterOffset: number;
}) {
    const { containerSpanWidth, containerSpanHeight, color, diameterOffset } =
        props;

    const maxDiameter = max([containerSpanWidth, containerSpanHeight]) || 0;

    return {
        width: maxDiameter - diameterOffset,
        height: maxDiameter - diameterOffset,
        left: diameterOffset / 2,
        top: -(maxDiameter - diameterOffset - containerSpanHeight) / 2,
        backgroundColor: color,
    };
}

export const RippleFocus = (props: RippleFocusProps) => {
    const {
        isFocused,
        prefixCls,
        containerSpanWidth,
        containerSpanHeight,
        color,
        diameterOffset = offset,
    } = props;

    return (
        (isFocused === true && (
            <span
                className={`${prefixCls}__focus`}
                data-testid="litten-ripple__focus"
                style={getFocusStyle({
                    containerSpanWidth,
                    containerSpanHeight,
                    color: color.focusColor,
                    diameterOffset,
                })}
            ></span>
        )) ||
        null
    );
};

RippleFocus.displayName = ControlType.RippleFocus;
