import {
  type ChangeEvent,
  type DetailedHTMLProps,
  forwardRef,
  type InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import './switch.less';

import { useCurrentChecked } from 'litten-hooks/dist/checkedControl';
import { useDisabled } from 'litten-hooks/dist/disabledControl';
import { ControlType, MouseState } from 'litten-hooks/dist/enum';
import { useFocused } from 'litten-hooks/dist/focusControl';

import { Color, Size, WaveMode } from '../../global/enum';

import { handleLabelMouseStateCheck } from '../formLabel/formLabelBase';
import { Ripple } from '../ripple/ripple';
import type { LittenRipple } from '../ripple/ripple.types';
import type { SwitchProps } from './switch.types';

import {
  getCheckState,
  getInputVisualStates,
  getRippleColor,
  getThumbContainerVisualStates,
  getThumbVisualStates,
  getTrackVisualStates,
  getVisualStates,
} from './switchBase';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  {
    disabled: disabledProp = false,
    loading = false,
    color = Color.default,
    size = Size.medium,
    checked,
    defaultChecked = false,
    value = 'on',
    onDisabledChange,
    ...props
  }: SwitchProps,
  ref
) {
  const { onChange, name } = props;

  const rippleRef = useRef<LittenRipple | null>(null);

  const disabled = useDisabled({
    disabled: disabledProp,
    loading,
    controlType: ControlType.Switch,
    onDisabledChange,
  });

  const [currentChecked, setCurrentChecked] =
    useCurrentChecked<HTMLInputElement>({
      checked,
      defaultChecked,
      value,
      name,
      controlType: ControlType.Switch,
      onChange,
    });

  const [focused, handleFocus, handleBlur] = useFocused({
    onLabelMouseStateCheck: handleLabelMouseStateCheck,
    ...props,
  });

  const [checkStatus, setCheckStatus] = useState(getCheckState(currentChecked));

  const isUnControlled = checked === undefined;

  useEffect(() => {
    setCheckStatus(getCheckState(currentChecked));
  }, [currentChecked]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentChecked(e.target.checked);
    onChange?.({
      e,
      value,
      controlType: ControlType.Radio,
      checked: e.target.checked,
    });
  }

  function handleInputMouseOver() {
    rippleRef.current?.setMouseState(MouseState.mouseover);
  }

  function handleInputMouseOut() {
    rippleRef.current?.setMouseState(MouseState.mouseout);
  }

  function handleInputMouseDown() {
    rippleRef.current?.setMouseState(MouseState.mousedown);
  }

  function handleInputMouseUp() {
    rippleRef.current?.setMouseState(MouseState.mouseup);
  }

  function renderInput() {
    const inputProps: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > = {
      ...props,
      type: 'checkbox',
      role: 'switch',
      className: getInputVisualStates(props),
      disabled: disabled,
      value: value,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onChange: handleInputChange,
      onMouseOver: handleInputMouseOver,
      onMouseOut: handleInputMouseOut,
      onMouseDown: handleInputMouseDown,
      onMouseUp: handleInputMouseUp,
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
        checkStatus
      )}
    >
      <span className={getThumbContainerVisualStates(props, checkStatus)}>
        <span className={getThumbVisualStates(props)}></span>
        <Ripple
          ref={rippleRef}
          focused={focused}
          color={getRippleColor({ color, checked: currentChecked })}
          diameterOffset={0}
          waveMode={WaveMode.center}
        ></Ripple>
      </span>
      <span className={getTrackVisualStates(props)}></span>
      {renderInput()}
    </span>
  );
});

Switch.displayName = ControlType.Switch;
