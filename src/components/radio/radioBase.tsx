import classnames from 'classnames';
import { CheckState } from 'litten-hooks/dist/enum';

import { getPrefixNs } from '../../global/util';

import type { RadioIconProps, RadioProps } from './radio.types';

export const CheckedIcon = ({ value, name }: RadioIconProps) => {
  const testId = `radioCheckedIcon-${name}-${value}`;
  return (
    <svg
      className="litten-svg"
      style={{ position: 'absolute' }}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid={testId}
    >
      <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
    </svg>
  );
};

export const UnCheckedIcon = ({ value, name }: RadioIconProps) => {
  const testId = `radioUnCheckedIcon-${name}-${value}`;
  return (
    <svg
      className="litten-svg"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid={testId}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
    </svg>
  );
};

export function getVisualStates(props: RadioProps, checkStatus: CheckState) {
  const { prefixCls: customizePrefixCls, color, disabled, size } = props;

  const prefixCls = getPrefixNs('radio', customizePrefixCls);

  const visualStates = classnames(
    prefixCls,
    `${prefixCls}--${size}`,
    `${prefixCls}--${color}`,
    `${prefixCls}--${checkStatus}`,
    {
      [`${prefixCls}--disabled`]: disabled === true,
    }
  );

  return visualStates;
}

export function getInputVisualStates(props: RadioProps) {
  const { prefixCls: customizePrefixCls } = props;

  const prefixCls = getPrefixNs('radio', customizePrefixCls);

  const visualStates = classnames(`${prefixCls}__input`);

  return visualStates;
}

export function getIconContainerVisualStates(props: RadioProps) {
  const { prefixCls: customizePrefixCls } = props;

  const prefixCls = getPrefixNs('radio', customizePrefixCls);

  const visualStates = classnames(`${prefixCls}__iconContainer`);

  return visualStates;
}

/**
 * 获取CheckState状态
 * @param checked checked的选中值
 * @returns 转换后的CheckState
 */
export function getCheckState(checked?: boolean) {
  const result = checked === true ? CheckState.checked : CheckState.unChecked;
  console.log('getCheckState', { checked, result });
  return result;
}
