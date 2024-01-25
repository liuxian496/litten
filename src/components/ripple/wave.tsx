import React, { useState } from "react";
import { isFunction } from "lodash";
import { AnimationState, ControlType, WaveMode } from "../../global/enum";
import { WaveProps } from "./ripple.types";

// 用一个足够大的圆全覆盖父定位容器
function getWaveStyle(props: WaveProps) {
    const {
        containerSpanWidth,
        containerSpanHeight,
        mouseClientX,
        mouseClientY,
        parentOffsetLeft,
        parentOffsetTop,
        color,
    } = props;

    // 包含ripple最近的定位元素的中心坐标
    const parentCenter = {
        x: parentOffsetLeft + containerSpanWidth / 2,
        y: parentOffsetTop + containerSpanHeight / 2,
    };

    let width = 0;
    let height = 0;

    if (mouseClientX < parentCenter.x) {
        //点击的横坐标在，中心点左侧
        width = containerSpanWidth - (mouseClientX - parentOffsetLeft);
    } else {
        width = mouseClientX - parentOffsetLeft;
    }

    if (mouseClientY < parentCenter.y) {
        //点击的纵坐标在，中心点上方
        height = containerSpanHeight - (mouseClientY - parentOffsetTop);
    } else {
        height = mouseClientY - parentOffsetTop;
    }

    //直径
    const diameter = 2 * Math.sqrt(width * width + height * height);
    const radius = diameter / 2;
    // console.log('left: ' + (diameter / 2 - (mouseClientX - parentOffsetLeft)));

    return {
        width: diameter,
        height: diameter,
        left: mouseClientX - parentOffsetLeft - radius,
        top: mouseClientY - parentOffsetTop - radius,
        backgroundColor: color.waveColor,
    };
}

// wave的圆心是定位容器的中心，是定位容器的内切（椭）圆
function getCenterWaveStyle(props: WaveProps) {
    const { containerSpanWidth, containerSpanHeight, color } = props;

    return {
        width: containerSpanWidth,
        height: containerSpanHeight,
        left: 0,
        top: 0,
        backgroundColor: color.waveColor,
    };
}

export const Wave = (props: WaveProps) => {
    const { prefixCls, isPressed, waveMode, onWaveAnimationEnd } = props;

    const [animationState, setAnimationState] = useState(AnimationState.none);

    function handleAnimationStart() {
        setAnimationState(AnimationState.start);
    }

    function handleAnimationEnd() {
        setAnimationState(AnimationState.end);
        const { index } = props;

        isFunction(onWaveAnimationEnd) && onWaveAnimationEnd(index);
    }

    return (
        ((isPressed === true || animationState === AnimationState.start) && (
            <span
                className={`${prefixCls}__wave`}
                data-testid="litten-ripple__wave"
                style={
                    waveMode === WaveMode.normal
                        ? getWaveStyle(props)
                        : getCenterWaveStyle(props)
                }
                onAnimationStart={handleAnimationStart}
                onAnimationEnd={handleAnimationEnd}
            ></span>
        )) ||
        null
    );
};

Wave.displayName = ControlType.Wave;
