import { ReactNode } from "react";
import { ControlProps } from "../control/control.types";

export interface FormProps extends ControlProps {
    /**
     * 设置Form的引用对象
     */
    formRef: FormRef<any>;
    /**
     * 子组件
     */
    children?: ReactNode;
}

export interface FormControlProps extends ControlProps {
    /**
     * 设置用于获取value属性的属性路径
     */
    valuePath: string;
    /**
     * 子组件
     */
    children: JSX.Element;
}

export interface FormContextProps {
    register: (props: FormRegisterProps) => void;
    checkValuePath: (path: string) => void;
    uninstall: (path: string) => void;
}

export interface FormRegisterProps {
    path: string;
    get: any;
    set: any;
}

export interface FormRef<T = any> {
    /**
     * 获取表单当前数据
     * @returns 表单当前数据
     */
    getValues: () => T;
    /**
     * 设置表单的值
     * @returns void
     */
    setValues: (values: T) => void;
    /**
     * 设置表单数据
     * @returns void
     */
    clear: () => void;
    /**
     * 通过属性路径，获取对应控件的值
     * @returns void
     */
    getValueByPath: (path: string) => any;
    /**
     * 通过属性路径，设置FormControl对应的控件的value
     * @param path 用于获取value属性的属性路径
     * @returns void
     */
    setValueByPath: (path: string, value: any) => void;
    /**
     * 注册formRegister
     */
    _setFormRegister?: React.Dispatch<any>,
}