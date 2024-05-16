import { LayoutControlProps } from "litten-hooks/dist/control/layoutControl/layoutControl.types";

export interface PopupProps extends LayoutControlProps {
    /**
     * 获取或设置一个值，该值表示popup是否打开
     */
    opened?: boolean;
    /**
     * 获取或设置一个值，该值表示overlay是否打开
     */
    hasOverlay?: boolean;
}
