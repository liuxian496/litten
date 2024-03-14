
import { ButtonBaseProps } from '../buttonBase/buttonBase.types';
import { RippleColor } from '../ripple/ripple.types';

export interface IconButtonProps extends ButtonBaseProps {
    'aria-label'?: string,
    /**
     * 设置ripple组件的颜色
     */
    rippleColor?: RippleColor;
}