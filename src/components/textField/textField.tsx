import React, {
    useState,
    FocusEvent,
    ChangeEvent,
    forwardRef,
    LegacyRef,
} from "react";
import "./textField.less";

import { UserControlType } from "../../global/enum";
import { useDisabled } from "../control/userControl";
import { useCurrentValue } from "../control/contentControl";

import { TextFieldProps, TextFieldValue } from "./textField.types";
import { getVisualStates, getInputVisualStates } from "./textFiledBase";

export const TextField = forwardRef(function TextField(
    {
        disabled: disabledProp = false,
        loading = false,
        value,
        defaultValue,
        style,
        userControlType,
        ...props
    }: TextFieldProps,
    ref?: LegacyRef<HTMLInputElement>
) {
    const { onChange, onFocus, onBlur } = props;

    const disabled = useDisabled({ disabled: disabledProp, loading });

    const [currentValue, setCurrentValue, setOriginalEvent] = useCurrentValue<
        HTMLInputElement,
        TextFieldValue
    >({
        value,
        defaultValue,
        userControlType: UserControlType.TextField,
        onChange,
    });

    const [focused, setFocused] = useState(false);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setOriginalEvent(e);
        setCurrentValue(e.target.value);
    }

    function handleFocus(e: FocusEvent<HTMLInputElement>) {
        setFocused(true);
        onFocus?.(e);
    }

    function handleBlur(e: FocusEvent<HTMLInputElement>) {
        setFocused(false);
        onBlur?.(e);
    }

    return (
        <div
            className={getVisualStates(
                {
                    disabled,
                    ...props,
                },
                { focused }
            )}
            style={style}
        >
            <input
                className={getInputVisualStates({
                    disabled,
                    ...props,
                })}
                disabled={disabled}
                {...props}
                type="text"
                ref={ref}
                value={currentValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    );
});

TextField.displayName = UserControlType.TextField;
