import { CSSProperties, ReactNode, MouseEvent } from 'react';

import { Color, Mode, Size } from "../../global/enum";
import { UserControlProps } from '../control/userControl.types';
import { RippleColor } from '../ripple/ripple.types';

export interface ButtonBaseProps extends UserControlProps<HTMLButtonElement> {
    /**
     * 设置一个值，该值表示控件的使用风格
     */
    color?: Color;
    /**
     * 设置一个值，该值表示控件的使用模式
     */
    mode?: Mode;
    /**
     * 设置一个值，该值表示按钮大小
     */
    size?: Size;
    /**
     * 设置按钮内容
     */
    children?: ReactNode;
    /**
     * 
     * @returns void
     */
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

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