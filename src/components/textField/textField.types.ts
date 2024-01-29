import { TextFieldType } from "../../global/enum";
import { ContentControlProps } from "../control/contentControl.types";

export type TextFieldValue =
    | string
    | ReadonlyArray<string>
    | number
    | undefined;

export interface TextFieldProps
    extends ContentControlProps<HTMLInputElement, TextFieldValue> {
    placeholder?: string;
    type?: TextFieldType;
}
