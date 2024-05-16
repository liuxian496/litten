import { ReactNode, MouseEvent } from "react";

import { Color, Mode, Size } from "../../global/enum";
import { FocusControlProps } from "litten-hooks/dist/control/focusControl/focusControl.types";
import { DisabledControlProps } from "litten-hooks/dist/control/disabledControl/disabledControl.types";

export interface ButtonBaseProps
    extends FocusControlProps<HTMLButtonElement>,
        DisabledControlProps {
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
