import './iconButton.less';

import { useDisabled } from 'litten-hooks/dist/disabledControl';
import { ControlType } from 'litten-hooks/dist/enum';
import { useFocused } from 'litten-hooks/dist/focusControl';

import { Color, Mode, Size } from '../../global/enum';

import { handleLabelMouseStateCheck } from '../formLabel/formLabelBase';

import {
  getFocusColor,
  getVisualStates,
  getWaveColor,
} from '../buttonBase/buttonBase';
import { type IconButtonProps } from './iconButton.types';

import { Ripple } from '../ripple/ripple';

export const IconButton = ({
  color = Color.default,
  mode = Mode.text,
  size = Size.medium,
  disabled: disabledProp = false,
  loading = false,
  rippleColor = {
    focusColor: getFocusColor({ mode, color }),
    waveColor: getWaveColor({ mode, color }),
  },
  onDisabledChange,
  ...props
}: IconButtonProps) => {
  const { children } = props;

  const [focused, handleFocus, handleBlur] = useFocused({
    onLabelMouseStateCheck: handleLabelMouseStateCheck,
    ...props,
  });

  const disabled = useDisabled({
    disabled: disabledProp,
    loading,
    controlType: ControlType.IconButton,
    onDisabledChange,
  });

  return (
    <button
      className={getVisualStates(
        {
          color,
          mode,
          size,
          disabled,
          ...props,
        },
        'iconButton'
      )}
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
      {disabled !== true && (
        <Ripple focused={focused} color={rippleColor} diameterOffset={0} />
      )}
    </button>
  );
};

IconButton.displayName = ControlType.IconButton;
