import { TextFieldType } from "litten-hooks/dist/enum";
import { ContentControlProps } from "litten-hooks/dist/control/contentControl/contentControl.types";
import { DisabledControlProps } from "litten-hooks/dist/control/disabledControl/disabledControl.types";
import { FocusControlProps } from "litten-hooks/dist/control/focusControl/focusControl.types";

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
