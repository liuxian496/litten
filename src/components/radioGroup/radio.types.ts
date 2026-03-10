import { Dispatch, ReactNode } from "react";

import { ContentControlProps } from "litten-hooks/dist/control/contentControl/contentControl.types";

export enum RadioGroupAction {
  setValue = "setValue",
}

export interface RadioGroupState {
  value?: string;
}

export interface ActionProps<T> {
  type: T;
}

export interface RadioGroupActionProps
  extends ActionProps<RadioGroupAction>,
    RadioGroupState {}

export interface RadioGroupProviderProps {
  children?: ReactNode;
  state: RadioGroupState;
  dispatch: Dispatch<RadioGroupActionProps>;
}
export interface RadioGroupProps
  extends ContentControlProps<HTMLInputElement, string> {
  /**
   * 子组件
   */
  children?: ReactNode;
  /**
   * 单选按钮组的名称。当按钮组中的任一单选按钮选中时，其他单选按钮会自动取消选中状态
   */
  name?: string;
}
