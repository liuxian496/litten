import { ChangeEvent, forwardRef, LegacyRef } from "react";
import "./textField.less";
import { TextFieldType } from "litten-hooks/dist/enum";

import { ControlType } from "litten-hooks/dist/enum";
import { useDisabled } from "litten-hooks/dist/disabledControl";
import { getStateByFocused, useFocused } from "litten-hooks/dist/focusControl";
import { useCurrentValue } from "litten-hooks/dist/contentControl";

import { handleLabelMouseStateCheck } from "../formLabel/formLabelBase";

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
        onDisabledChange,
        ...props
    }: TextFieldProps,
    ref?: LegacyRef<HTMLInputElement>
) {
    const { onChange } = props;

    const disabled = useDisabled({
        disabled: disabledProp,
        loading,
        controlType: ControlType.TextField,
        onDisabledChange,
    });

    const [currentValue, setCurrentValue, setOriginalEvent] = useCurrentValue<
        HTMLInputElement,
        TextFieldValue
    >({
        value,
        defaultValue,
        controlType: ControlType.TextField,
        onChange,
    });

    const [focused, handleFocus, handleBlur] = useFocused({
        onLabelMouseStateCheck: handleLabelMouseStateCheck,
        ...props,
    });

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

TextField.displayName = ControlType.TextField;
