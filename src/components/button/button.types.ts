import { type ReactNode } from 'react';

import type { ButtonBaseProps } from '../buttonBase/buttonBase.types';
import type { RippleColor } from '../ripple/ripple.types';

export interface ButtonProps extends ButtonBaseProps {
  /**
   * 设置ripple组件的颜色
   */
  rippleColor?: RippleColor;
  /**
   * 起始图片
   */
  startIcon?: ReactNode;
  /**
   * 结束图片
   */
  endIcon?: ReactNode;
}
