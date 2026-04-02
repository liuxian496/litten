import type { ContentControlProps } from 'litten-hooks/dist/control/contentControl/contentControl.types';
import type { SelectedValue } from 'litten-hooks/dist/control/userControl/userControl.types';
import { MouseState } from 'litten-hooks/dist/enum';
import type { ReactNode } from 'react';

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
/**
 * listbox组件，支持单选和多选两种模式，受控和非受控两种使用方式
 * @param children 子组件
 * @param multiple 设置控件的选中模式，true表示多选，false表示单选，默认false。
 * @param value 选中值
 * @param defaultValue 默认选中值
 * @param onChange 选中值改变时的回调函数
 */
export interface ListboxProps extends ContentControlProps<
  HTMLUListElement,
  SelectedValue
> {
  /**
   * 子组件
   */
  children?: ReactNode;
  /**
   * 设置控件的选中模式，true表示多选，false表示单选，默认false。
   */
  multiple?: boolean;
}

/**
 * listbox组件的ref对象
 * @param value 选中值
 */
export interface ListBoxRef {
  /**
   * 选中值
   */
  value?: SelectedValue;
}
