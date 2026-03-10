import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from "react";
import "./checkbox.less";

import { useCurrentChecked } from "litten-hooks/dist/checkedControl";
import { CheckState, ControlType } from "litten-hooks/dist/enum";
import { useFocused } from "litten-hooks/dist/focusControl";

import { useDisabled } from "litten-hooks/dist/disabledControl";

import { Color, Mode, Size } from "../../global/enum";

import { getFocusColor, getWaveColor } from "../buttonBase/buttonBase";
import { handleLabelMouseStateCheck } from "../formLabel/formLabelBase";
import { Ripple } from "../ripple/ripple";

import { CheckboxProps } from "./checkbox.types";
import {
  CheckedIcon,
  IndeterminateIcon,
  UnCheckedIcon,
  getCheckState,
  getInputVisualStates,
  getVisualStates,
} from "./checkboxBase";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
      indeterminate = false,
      onDisabledChange,
      onChange,
      ...props
    }: CheckboxProps,
    ref,
  ) => {
    const disabled = useDisabled({
      disabled: disabledProp,
      loading,
      controlType: ControlType.Checkbox,
      onDisabledChange,
    });

    const [currentChecked, setCurrentChecked] = useCurrentChecked({
      checked,
      value,
      defaultChecked,
      controlType: ControlType.Checkbox,
    });

    const [focused, handleFocus, handleBlur] = useFocused({
      onLabelMouseStateCheck: handleLabelMouseStateCheck,
      ...props,
    });

    const [checkStatus, setCheckStatus] = useState(
      getCheckState(currentChecked, indeterminate),
    );

    const isUnControlled = checked === undefined;

    useEffect(() => {
      setCheckStatus(getCheckState(currentChecked, indeterminate));
    }, [currentChecked, indeterminate]);

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
      setCurrentChecked(e.target.checked);
      onChange?.({
        e,
        value,
        controlType: ControlType.Checkbox,
        checked: e.target.checked,
      });
    }

    function renderInput() {
      const inputProps: DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      > = {
        ...props,
        type: "checkbox",
        className: getInputVisualStates(props),
        disabled: disabled,
        value: value,
        onBlur: handleBlur,
        onChange: handleInputChange,
        onFocus: handleFocus,
      };

      if (isUnControlled) {
        // 非受控时设置defaultChecked属性
        inputProps.defaultChecked = defaultChecked;
      } else {
        // 受控时设置checked属性
        inputProps.checked = currentChecked;
      }

      return <input {...inputProps} ref={ref} />;
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
        {checkStatus === CheckState.checked && <CheckedIcon />}
        {checkStatus === CheckState.unChecked && <UnCheckedIcon />}
        {checkStatus === CheckState.indeterminate && <IndeterminateIcon />}

        <Ripple focused={focused} color={rippleColor} diameterOffset={0}>
          {renderInput()}
        </Ripple>
      </span>
    );
  },
);

Checkbox.displayName = ControlType.Checkbox;
