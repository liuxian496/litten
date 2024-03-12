import { TextFieldType } from "../../global/enum";
import { ContentControlProps } from "../control/contentControl.types";
import { DisabledControlProps } from "../control/disabledControl.types";
import { FocusControlProps } from "../control/userControl.types";

export type TextFieldValue =
    | string
    | ReadonlyArray<string>
    | number
    | undefined;

export interface TextFieldProps
    extends FocusControlProps<HTMLInputElement>,
        DisabledControlProps,
        ContentControlProps<HTMLInputElement, TextFieldValue> {
    placeholder?: string;
    type?: TextFieldType;
}
