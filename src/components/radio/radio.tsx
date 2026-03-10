import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./radio.less";

import { useCurrentChecked } from "litten-hooks/dist/checkedControl";
import { useDisabled } from "litten-hooks/dist/disabledControl";
import { CheckState, ControlType } from "litten-hooks/dist/enum";
import { useFocused } from "litten-hooks/dist/focusControl";

import { Color, Mode, Size } from "../../global/enum";

import { getFocusColor, getWaveColor } from "../buttonBase/buttonBase";
import { handleLabelMouseStateCheck } from "../formLabel/formLabelBase";
import { Ripple } from "../ripple/ripple";
import { RadioProps } from "./radio.types";
import {
  CheckedIcon,
  UnCheckedIcon,
  getCheckState,
  getIconContainerVisualStates,
  getInputVisualStates,
  getVisualStates,
} from "./radioBase";

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      disabled: disabledProp = false,
      loading = false,
      color = Color.default,
      rippleColor = {
        focusColor: getFocusColor({ mode: Mode.text, color }),
        waveColor: getWaveColor({ mode: Mode.text, color }),
      },
      size = Size.medium,
      checked,
      defaultChecked = false,
      value = "on",
      onDisabledChange,
      ...props
    }: RadioProps,
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { onChange, name } = props;

    const disabled = useDisabled({
      disabled: disabledProp,
      loading,
      controlType: ControlType.Radio,
      onDisabledChange,
    });

    const [checkStatus, setCheckStatus] = useState(CheckState.unChecked);

    const [currentChecked, setCurrentChecked] =
      useCurrentChecked<HTMLInputElement>({
        checked,
        defaultChecked,
        value,
        name,
        controlType: ControlType.Radio,
      });

    const [focused, handleFocus, handleBlur] = useFocused({
      onLabelMouseStateCheck: handleLabelMouseStateCheck,
      ...props,
    });

    const isUnControlled = checked === undefined;
    const isControlled = !isUnControlled;

    useImperativeHandle(ref, () => {
      return inputRef.current as HTMLInputElement;
    });

    useEffect(() => {
      if (isControlled) {
        setCheckStatus(getCheckState(currentChecked));
        // 受控组件时以checked为准，当checked改变时更新checkStatus状态
      }
    }, [currentChecked, isControlled]);

    useEffect(() => {
      // 非受控组件时以defaultChecked为准，当defaultChecked改变时更新checkStatus状态,defaultChecked只在组件初始化时生效，后续defaultChecked的改变不会影响checkStatus状态
      if (isUnControlled) {
        setCheckStatus(getCheckState(defaultChecked));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (isUnControlled) {
        setCheckStatus(getCheckState(inputRef.current?.checked));
        console.log("sync inputRef.current?.checked to checkStatus");
      }
    }, [inputRef.current?.checked, isUnControlled]);

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
      setCurrentChecked(e.target.checked);
      onChange?.({
        e,
        value,
        controlType: ControlType.Radio,
        checked: e.target.checked,
      });
    }

    function renderInput() {
      const inputProps: DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      > = {
        ...props,
        type: "radio",
        className: getInputVisualStates(props),
        disabled: disabled,
        value: value,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onChange: handleInputChange,
      };

      if (isUnControlled) {
        // 非受控时设置defaultChecked属性
        inputProps.defaultChecked = defaultChecked;
      } else {
        // 受控时设置checked属性
        inputProps.checked = currentChecked;
      }

      return <input {...inputProps} ref={inputRef} />;
    }

    return (
      <span
        className={getVisualStates(
          {
            color,
            size,
            disabled,
            ...props,
          },
          checkStatus,
        )}
      >
        <span className={getIconContainerVisualStates(props)}>
          {checkStatus === CheckState.checked && (
            <CheckedIcon value={value} name={name} />
          )}
          <UnCheckedIcon value={value} name={name} />
        </span>

        <Ripple focused={focused} color={rippleColor} diameterOffset={0}>
          {renderInput()}
        </Ripple>
      </span>
    );
  },
);

Radio.displayName = ControlType.Radio;
