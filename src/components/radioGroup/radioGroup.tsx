import { ChangeEvent, useEffect } from "react";

import { setCheckedByGroupValue } from "litten-hooks/dist/checkedControl";
import { useCurrentValue } from "litten-hooks/dist/contentControl";
import { ControlType } from "litten-hooks/dist/enum";

import { RadioGroupProps } from "../radio/radio.types";

export const RadioGroup = (props: RadioGroupProps) => {
  const { name, value, defaultValue, children, onChange } = props;

  const [currentValue, setCurrentValue] = useCurrentValue<
    HTMLInputElement,
    string
  >({
    value,
    defaultValue,
    controlType: ControlType.Radio,
    onChange,
  });

  useEffect(() => {
    /** istanbul ignore else */
    /** c8 ignore else */
    currentValue !== undefined &&
      name !== undefined &&
      setCheckedByGroupValue(name, ControlType.Radio, currentValue);
  }, [currentValue, name]);

  function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentValue(e.target.value);
    onChange?.({
      e,
      controlType: ControlType.RadioGroup,
      value: e.target.value,
    });
  }

  return <span onChange={handleRadioChange}>{children}</span>;
};

RadioGroup.displayName = ControlType.RadioGroup;
