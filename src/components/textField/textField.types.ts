import type { ContentControlProps } from 'litten-hooks/dist/control/contentControl/contentControl.types';
import type { DisabledControlProps } from 'litten-hooks/dist/control/disabledControl/disabledControl.types';
import { type FocusControlProps } from 'litten-hooks/dist/control/focusControl/focusControl.types';
import { TextFieldType } from 'litten-hooks/dist/enum';

export type TextFieldValue =
  | string
  | ReadonlyArray<string>
  | number
  | undefined;

export interface TextFieldProps
  extends
    FocusControlProps<HTMLInputElement>,
    DisabledControlProps,
    ContentControlProps<HTMLInputElement, TextFieldValue> {
  placeholder?: string;
  type?: TextFieldType;
}
