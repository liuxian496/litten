import { LayoutControlProps } from "../control/layoutControl.types";

export interface LoadingProps extends LayoutControlProps {
    /**
     * 获取或设置一个值，该值表示Loading窗体是否打开。
     */
    opened?: boolean;
}
