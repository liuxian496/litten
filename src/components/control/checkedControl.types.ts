import { Dispatch, SetStateAction } from "react";
import { ControlType } from "../../global/enum";
import { ContentControlProps } from "./contentControl.types";
import { FocusControlProps } from "./userControl.types";
import { DisabledControlProps } from "./disabledControl.types";

export interface CheckedControlProps<T>
    extends FocusControlProps<T>,
        DisabledControlProps,
        ContentControlProps<T, string> {
    /**
     * 设置一个值，该值表示是否勾选。true，代表勾选。
     */
    checked?: boolean;
    /**
     * 设置一个值，该值表示是否默认勾选，只在初始化后生效一次。true，表示默认勾选。
     */
    defaultChecked?: boolean;
    /**
     * 单选按钮组的名称。当按钮组中的任一单选按钮选中时，其他单选按钮会自动取消选中状态
     */
    name?: string;
}

export interface CheckedControlGroup {
    /**
     * 组名称
     */
    name?: string;
    /**
     * 全局唯一id
     */
    uuid: string;
    /**
     * UserControl类型
     */
    controlType?: ControlType;
    /**
     * 选中时，对应的值
     */
    value?: string;
}

export interface LittenCheckedGroups {
    [name: string]: {
        [uuid: string]: {
            setChecked: Dispatch<SetStateAction<boolean | undefined>>;
            value?: string;
        };
    };
}
