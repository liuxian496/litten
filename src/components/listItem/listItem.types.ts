import { ReactNode } from "react";
import { DisabledControlProps } from "litten-hooks/dist/control/disabledControl/disabledControl.types";
import { SelectedValue } from "litten-hooks/dist/control/userControl/userControl.types";

export interface ListItemTemplateArgs {
    /**
     * 获取控件是否禁用false，表示控件可用。
     */
    disabled?: boolean;
    /**
     * 获取当前项是否选中
     */
    isSelected?: boolean;
    /**
     * 获取ListItem显示给用户的标签
     */
    label?: string;
    /**
     * 获取选中项对应的值
     */
    selectedValue?: SelectedValue;
    /**
     * 获取ListItem的值
     */
    value?: string;
}

export interface ListItemProps extends DisabledControlProps {
    /**
     * 设置ListItem的值
     */
    value?: string;
    /**
     * 设置一个值，该值表示显示给用户的标签
     */
    label?: string;
    /**
     * 设置ListItem的模板，通过这个模板自定义ListItem展示的内容
     * @param args 
     * @returns 
     */
    itemTemplate?: (args: ListItemTemplateArgs) => ReactNode;
    /**
     * 子组件
     */
    children?: ReactNode;
}
