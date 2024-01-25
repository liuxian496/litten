import React, {
    useRef,
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";

import "./ripple.less";
import {
    AnimationState,
    MouseState,
    ControlType,
    WaveMode,
} from "../../global/enum";
import { getPrefixNs } from "../control/control";

import { RippleProps } from "./ripple.types";
import { Wave } from "./wave";
import { RippleFocus } from "./rippleFocus";

function addWaveList(prevWaveList: any[]) {
    return [
        ...prevWaveList,
        {
            isPressed: true,
            animationState: AnimationState.none,
            index: prevWaveList.length,
        },
    ];
}

function checkWaveList(prevWaveList: any[]) {
    for (let i = prevWaveList.length - 1; i >= 0; i--) {
        const item = prevWaveList[i];
        if (
            item &&
            item.isPressed === false &&
            item.animationState === AnimationState.end
        ) {
            prevWaveList[i] = undefined;
        }
    }
    // console.log(printArrayItem(prevWaveList));
    return [...prevWaveList];
}

function updateWaveListPressed(list: any[]) {
    list.map((item) => {
        //找到数组中第一个isPressed值不是ture的元素，将它的值设置成false
        item && item.isPressed === true && (item.isPressed = false);

        return item;
    });
}

export const Ripple = forwardRef(function Ripple(
    { waveMode = WaveMode.normal, ...props }: RippleProps,
    ref
) {
    const {
        prefixCls: customizePrefixCls,
        focused,
        color,
        diameterOffset,
        children,
    } = props;
    const prefixCls = getPrefixNs("ripple", customizePrefixCls);

    const [waveList, setWaveList] = useState<any[]>([]);

    const [isFocusChanged, setIsFocusChanged] = useState(false);

    const containerSpan = useRef(null);
    const [containerSpanWidth, setContainerSpanWidth] = useState(0);
    const [containerSpanHeight, setContainerSpanHeight] = useState(0);
    const [parentOffsetLeft, setParentOffsetLeft] = useState(0);
    const [parentOffsetTop, setParentOffsetTop] = useState(0);

    const [mouseClientX, setMouseClientX] = useState(0);
    const [mouseClientY, setMouseClientY] = useState(0);

    const [mouseState, setMouseState] = useState(MouseState.none);

    const [isFocused, setIsFocused] = useState(false);

    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            containerSpan &&
                containerSpan.current &&
                setContainerRange(containerSpan.current);
            containerSpan &&
                containerSpan.current &&
                containerSpan.current["offsetParent"] &&
                setOffsetParentRange(containerSpan.current["offsetParent"]);
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useImperativeHandle(ref, () => {
        return {
            setMouseState: (state: MouseState) => {
                setMouseState(state);
            },
        };
    });

    useEffect(() => {
        if (focused === true) {
            //获取焦点
            setIsFocusChanged(true);
            // mouseState !== MouseState.mousedown && setIsFocused(true);
        } else {
            //失去焦点
            setMouseState(MouseState.none);
            setIsFocused(false);
            setWaveList([]);
        }
    }, [focused]);

    useEffect(() => {
        if (isFocusChanged === true) {
            mouseState !== MouseState.mousedown && setIsFocused(true);
            setIsFocusChanged(false);
        }
    }, [isFocusChanged, mouseState]);

    useEffect(() => {
        if (
            mouseState === MouseState.mouseout ||
            mouseState === MouseState.mouseup
        ) {
            setIsFocused(false);
        }

        if (mouseState === MouseState.mousedown) {
            setIsPressed(true);
            setWaveList(addWaveList);
        } else if (
            mouseState === MouseState.mouseup ||
            mouseState === MouseState.mouseout
        ) {
            //鼠标抬起时，取消Pressed状态
            setIsPressed(false);
        }
    }, [mouseState]);

    useEffect(() => {
        if (isPressed === false) {
            setWaveList((prevList) => {
                updateWaveListPressed(prevList);
                return checkWaveList(prevList);
            });
        }
    }, [isPressed]);

    function setContainerRange(current: any) {
        setContainerSpanWidth(current["offsetWidth"]);
        setContainerSpanHeight(current["offsetHeight"]);
    }

    function setOffsetParentRange(current: any) {
        setParentOffsetLeft(current["offsetLeft"]);
        setParentOffsetTop(current["offsetTop"]);
    }

    function setWaveAnimationStateByIndex(
        animationState: AnimationState,
        index: number
    ) {
        const item = waveList[index];

        item && (item.animationState = animationState);
    }

    function handleMouseUp() {
        setMouseState(MouseState.mouseup);
    }

    function handleMouseDown(event: React.MouseEvent<HTMLSpanElement>) {
        const { clientX, clientY } = event;
        setMouseClientX(clientX);
        setMouseClientY(clientY);
        setMouseState(MouseState.mousedown);
    }

    function handleMouseOver() {
        setMouseState(MouseState.mouseover);
    }

    function handleMouseOut() {
        setMouseState(MouseState.mouseout);
    }

    function handleWaveAnimationEnd(index: number) {
        setWaveAnimationStateByIndex(AnimationState.end, index);
        setWaveList(checkWaveList);
    }

    return (
        <span
            className={prefixCls}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            ref={containerSpan}
            data-testid="litten-ripple"
        >
            {
                <>
                    {waveList &&
                        waveList.map((item, index) => {
                            return (
                                item && (
                                    <Wave
                                        key={index}
                                        index={index}
                                        isPressed={isPressed}
                                        prefixCls={prefixCls}
                                        containerSpanWidth={containerSpanWidth}
                                        containerSpanHeight={
                                            containerSpanHeight
                                        }
                                        mouseClientX={mouseClientX}
                                        mouseClientY={mouseClientY}
                                        parentOffsetLeft={parentOffsetLeft}
                                        parentOffsetTop={parentOffsetTop}
                                        color={color}
                                        waveMode={waveMode}
                                        onWaveAnimationEnd={
                                            handleWaveAnimationEnd
                                        }
                                    />
                                )
                            );
                        })}
                </>
            }
            <RippleFocus
                prefixCls={prefixCls}
                isFocused={isFocused}
                containerSpanWidth={containerSpanWidth}
                containerSpanHeight={containerSpanHeight}
                color={color}
                diameterOffset={diameterOffset}
            />
            {children}
        </span>
    );
});

Ripple.displayName = ControlType.Ripple;
