import { TextFieldType } from 'litten-hooks/dist/enum';
import {
  type ChangeEvent,
  type DetailedHTMLProps,
  forwardRef,
  type InputHTMLAttributes,
  type LegacyRef,
} from 'react';
import './textField.less';

import { useCurrentValue } from 'litten-hooks/dist/contentControl';
import { useDisabled } from 'litten-hooks/dist/disabledControl';
import { ControlType } from 'litten-hooks/dist/enum';
import { getStateByFocused, useFocused } from 'litten-hooks/dist/focusControl';

import { handleLabelMouseStateCheck } from '../formLabel/formLabelBase';

import type { TextFieldProps, TextFieldValue } from './textField.types';
import { getInputVisualStates, getVisualStates } from './textFiledBase';

export const TextField = forwardRef(function TextField(
  {
    disabled: disabledProp = false,
    loading = false,
    value,
    defaultValue,
    style,
    type = TextFieldType.text,
    onDisabledChange,
    ...props
  }: TextFieldProps,
  ref?: LegacyRef<HTMLInputElement>
) {
  const { onChange } = props;

  const disabled = useDisabled({
    disabled: disabledProp,
    loading,
    controlType: ControlType.TextField,
    onDisabledChange,
  });

  const [currentValue, setCurrentValue] = useCurrentValue<
    HTMLInputElement,
    TextFieldValue
  >({
    value,
    defaultValue,
    controlType: ControlType.TextField,
    onChange,
  });

  const [focused, handleFocus, handleBlur] = useFocused({
    onLabelMouseStateCheck: handleLabelMouseStateCheck,
    ...props,
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentValue(e.target.value);
    onChange?.({
      e,
      controlType: ControlType.TextField,
      value: e.target.value,
    });
  }

  function renderInput() {
    const inputProps: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > = {
      disabled,
      ...props,
      className: getInputVisualStates({
        disabled,
        ...props,
      }),
      type,
      onChange: handleInputChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
    };

    if (value === undefined) {
      // 非受控时设置defaultValue属性
      inputProps.defaultValue = defaultValue;
    } else {
      // 受控时设置value属性
      inputProps.value = currentValue;
    }

    return <input {...inputProps} ref={ref} />;
  }

  return (
    <div
      className={getVisualStates(
        {
          disabled,
          ...props,
        },
        {
          focusState: getStateByFocused(focused),
        }
      )}
      style={style}
    >
      {renderInput()}
    </div>
  );
});

TextField.displayName = ControlType.TextField;
