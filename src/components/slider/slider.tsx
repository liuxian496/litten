import  {
    useState,
    ChangeEvent,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";
import "./slider.less";

import NP from "number-precision";

import {
    Color,
    FocusState,
    MouseState,
    Orientation,
    Size,
    ControlType,
} from "../../global/enum";

import { useDisabled } from "../control/disabledControl";
import { useCurrentValue } from "../control/contentControl";
import { useRelativePosition } from "../control/userControl";
import { RelativeRect } from "../control/userControl.types";

import { SliderProps } from "./slider.types";
import {
    getInputVisualStates,
    getPersentByValue,
    getRailVisualStates,
    getStepPx,
    getThumbDisplacement,
    getThumbStyle,
    getThumbVisualStates,
    getTrackStyle,
    getTrackVisualStates,
    getVisualStates,
} from "./sliderBase";

export const Slider = forwardRef(function Slider(
    {
        disabled: disabledProp = false,
        loading = false,
        color = Color.default,
        min = 0,
        max = 100,
        size = Size.medium,
        step = 1,
        marks,
        // 原生input作为range时，默认值是50
        defaultValue = 50,
        orientation = Orientation.horizontal,
        value,
        onChange,
        onDisabledChange,
        ...props
    }: SliderProps,
    ref
) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const sliderRef = useRef(null);

    const [startMeasure] = useRelativePosition(sliderRef, handleRectChange);

    const disabled = useDisabled({
        disabled: disabledProp,
        loading,
        controlType: ControlType.Slider,
        onDisabledChange,
    });

    const [thumbMouseState, setThumbMouseState] = useState(MouseState.none);
    const [thumbFocusState, setThumbFocusState] = useState(FocusState.blur);

    const [currentValue, setCurrentValue] = useCurrentValue<
        HTMLInputElement,
        number
    >({
        // value: checkExtremum(value, { min, max }),
        value,
        defaultValue,
        controlType: ControlType.Slider,
        onChange,
    });

    useImperativeHandle(ref, () => {
        return {
            value: currentValue,
        };
    });

    function handleRectChange(rect: RelativeRect) {
        const sliderLength =
            orientation === Orientation.horizontal
                ? rect.targetWidth
                : rect.targetHeight;

        // 每个step对应的实际像素值
        const stepPx = getStepPx(step, max - min, sliderLength);

        const stepMiddleRemainder = NP.divide(NP.minus(stepPx - 1), 2);

        const displacementPx = getThumbDisplacement(rect, orientation);

        const remainder = displacementPx % stepPx;

        let finalDisplacementPx = 0;

        // 计算位移补正
        if (remainder >= stepMiddleRemainder) {
            //增量补正
            finalDisplacementPx = displacementPx + (stepPx - remainder);
        } else {
            //减量补正
            finalDisplacementPx = displacementPx - remainder;
        }

        const currentStep = NP.divide(finalDisplacementPx, stepPx) * step;

        if (orientation === Orientation.horizontal) {
            setCurrentValue(min + currentStep);
        } else {
            setCurrentValue(max - currentStep);
        }
    }

    function handleSliderMouseDown() {
        disabled !== true && startMeasure();
        disabled !== true &&
            document.addEventListener("mouseup", handleDocumentMouseUpBySlider);
    }

    function handleThumbMouseDown() {
        setThumbMouseState(MouseState.mousedown);
        document.addEventListener("mouseup", handleDocumentMouseUpByThumb);
    }

    // 鼠标拖动thumb，释放后触发
    function handleDocumentMouseUpByThumb() {
        document.removeEventListener("mouseup", handleDocumentMouseUpByThumb);
        setThumbMouseState(MouseState.mouseup);
        inputRef.current?.focus();
    }

    // 点击滑轨，thumb移动后触发
    function handleDocumentMouseUpBySlider() {
        document.removeEventListener("mouseup", handleDocumentMouseUpBySlider);
        inputRef.current?.focus();
    }

    function handleInputFocus() {
        setThumbFocusState(FocusState.focus);
    }

    function handleInputBlur() {
        setThumbFocusState(FocusState.blur);
    }

    // 使用键盘，如上、下、左、右键操作更改value时触发
    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const { value: current } = e.target;

        setCurrentValue(parseFloat(current));
    }

    return (
        <span
            className={getVisualStates({
                color,
                size,
                disabled,
                orientation,
                ...props,
            })}
            ref={sliderRef}
            onMouseDown={handleSliderMouseDown}
        >
            <span
                className={getRailVisualStates({
                    color,
                    size,
                    disabled,
                    ...props,
                })}
            ></span>
            <span
                className={getTrackVisualStates(
                    {
                        color,
                        size,
                        disabled,
                        ...props,
                    },
                    {
                        mouseState: thumbMouseState,
                        focusState: thumbFocusState,
                    }
                )}
                style={getTrackStyle(
                    orientation,
                    getPersentByValue(currentValue, min)
                )}
            ></span>
            <span
                className={getThumbVisualStates(
                    {
                        color,
                        size,
                        disabled,
                        ...props,
                    },
                    {
                        mouseState: thumbMouseState,
                        focusState: thumbFocusState,
                    }
                )}
                style={getThumbStyle(
                    orientation,
                    getPersentByValue(currentValue, min)
                )}
                onMouseDown={handleThumbMouseDown}
            >
                <input
                    {...props}
                    type="range"
                    className={getInputVisualStates(props)}
                    ref={inputRef}
                    min={min}
                    max={max}
                    step={step}
                    disabled={disabled}
                    value={currentValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                />
            </span>
        </span>
    );
});

Slider.displayName = ControlType.Slider;
