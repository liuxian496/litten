import type { ChangeEvent } from 'react';

import { ControlType } from 'litten-hooks/dist/enum';

import type { RadioGroupProps } from './radioGroup.types';

export const RadioGroup = ({ children, onChange }: RadioGroupProps) => {
  /**
   * 使用事件委托的方式监听RadioGroup下的Radio组件的change事件
   * @param e 事件对象
   */
  function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.({
      e,
      controlType: ControlType.RadioGroup,
      value: e.target.value,
    });
  }

  function render() {
    return <span onChange={handleRadioChange}>{children}</span>;
  }

  return render();
};

RadioGroup.displayName = ControlType.RadioGroup;
