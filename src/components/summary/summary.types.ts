import { LayoutControlProps } from "litten-hooks/dist/control/layoutControl/layoutControl.types";
import { Color } from "../../global/enum";

export interface SummaryProps extends LayoutControlProps {
    /**
     * 设置一个值，该值表示Summary的类型
     */
    color?: Color;
}
