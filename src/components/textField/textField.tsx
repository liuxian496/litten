import React, { ChangeEvent, forwardRef, LegacyRef } from "react";
import "./textField.less";

import { useDisabled } from "../control/disabledControl";
import { getStateByFocused, useFocusd } from "../control/userControl";
import { useCurrentValue } from "../control/contentControl";
import { FocusState, TextFieldType, UserControlType } from "../../global/enum";

import { TextFieldProps, TextFieldValue } from "./textField.types";
import { getVisualStates, getInputVisualStates } from "./textFiledBase";

export const TextField = forwardRef(function TextField(
    {
        disabled: disabledProp = false,
        loading = false,
        value,
        defaultValue,
        style,
        type = TextFieldType.text,
        userControlType,
        ...props
    }: TextFieldProps,
    ref?: LegacyRef<HTMLInputElement>
) {
    const { onChange } = props;

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

    const [focused, handleFocus, handleBlur] = useFocusd(props);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setOriginalEvent(e);
        setCurrentValue(e.target.value);
    }

    return (
        <div
            className={getVisualStates(
                {
                    disabled,
                    ...props,
                },
                {
                    focusState: getStateByFocused(focused),
                }
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
                type={type}
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
