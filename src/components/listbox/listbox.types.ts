import { ReactNode } from "react";
import { ContentControlProps } from "litten-hooks/dist/control/contentControl/contentControl.types";
import { SelectedValue } from "litten-hooks/dist/control/userControl/userControl.types";
import { MouseState } from "litten-hooks/dist/enum";

export interface ListContextProps {
    /**
     * 是否开启多选模式，true表示多选，false表示单选，默认false。
     */
    multiple?: boolean;
    /**
     * 选中值
     */
    selectedValue?: SelectedValue;
    /**
     * 设置itemMouseState
     */
    setItemMouseState: React.Dispatch<React.SetStateAction<MouseState>>;
    /**
     * 设置选中值
     * @param args 待更新的值
     * @returns
     */
    setSelectedValue: (args: string) => void;
    /**
     * 设置activedescendant
     */
    setActivedescendant: React.Dispatch<React.SetStateAction<string>>;
    /**
     * 获得虚拟焦点的项对应的值
     */
    focusValue?: string;
}

export interface ListboxProps
    extends ContentControlProps<HTMLUListElement, SelectedValue> {
    /**
     * 子组件
     */
    children?: ReactNode;
    /**
     * 设置控件的选中模式，true表示多选，false表示单选，默认false。
     */
    multiple?: boolean;
}
