import { ChangeEvent, useReducer } from "react";

import { useCurrentValue } from "litten-hooks/dist/contentControl";
import { ControlType } from "litten-hooks/dist/enum";

import { RadioGroupProps } from "../radio/radio.types";
import { RadioGroupProvider } from "./radioContex";
import { RadioGroupReducer } from "./radioGroupReducer";

export const RadioGroup = ({
  name,
  value,
  children,
  onChange,
}: RadioGroupProps) => {
  const [state, dispatch] = useReducer(RadioGroupReducer, {
    value: value,
  });

  const [currentValue, setCurrentValue] = useCurrentValue<
    HTMLInputElement,
    string
  >({
    value,
    controlType: ControlType.RadioGroup,
    onChange,
  });

  /**
   * 使用事件委托的方式监听RadioGroup下的Radio组件的change事件
   * @param e 事件对象
   */
  function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentValue(e.target.value);
    onChange?.({
      e,
      controlType: ControlType.RadioGroup,
      value: e.target.value,
    });
  }

  function render() {
    return (
      <RadioGroupProvider state={state} dispatch={dispatch}>
        <span onChange={handleRadioChange}>{children}</span>
      </RadioGroupProvider>
    );
  }

  return render();
};

RadioGroup.displayName = ControlType.RadioGroup;
