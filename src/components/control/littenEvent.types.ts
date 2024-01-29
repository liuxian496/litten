import { ChangeEvent } from "react";
import { ControlType } from "../../global/enum";
import { LittenValue } from "./control.types";
import { TextFieldValue } from "../textField/textField.types";

/**
 * 自定义事件参数
 */
export interface LittenEvent<E, V> {
    e?: E;
    value?: V;
    controlType?: ControlType;
    checked?: boolean;
    disabled?: boolean;
}

export type LittenContentChangeEvent = LittenEvent<
    ChangeEvent<Element>,
    LittenValue
>;
export type LittenContentChangeEventHandler<T, V> = (
    e: LittenEvent<ChangeEvent<T>, V>
) => void;

export type LittenTextChangeEvent = LittenEvent<
    ChangeEvent<HTMLInputElement>,
    TextFieldValue
>;

export type LittenCheckedChangeEvent = LittenEvent<
    ChangeEvent<HTMLInputElement>,
    string
>;

export type LittenNumberChangeEvent = LittenEvent<
    ChangeEvent<HTMLInputElement>,
    number
>;

export type LittenDisabledChangeEvent = LittenEvent<
    ChangeEvent<Element>,
    undefined
>;

export type LittenDisabledChangeEventHandler = (
    e: LittenEvent<ChangeEvent<Element>, undefined>
) => void;