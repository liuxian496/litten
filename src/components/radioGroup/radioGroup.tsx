import { ChangeEvent, useEffect } from "react";

import { ControlType } from "litten-hooks/dist/enum";
import { useCurrentValue } from "litten-hooks/dist/contentControl";
import { setCheckedByGroupValue } from "litten-hooks/dist/checkedControl";

import { RadioGroupProps } from "../radio/radio.types";

export const RadioGroup = (props: RadioGroupProps) => {
    const { name, value, defaultValue, children, onChange } = props;

    const [currentValue, setCurrentValue, setOriginalEvent] = useCurrentValue<
        HTMLInputElement,
        string
    >({
        value,
        defaultValue,
        controlType: ControlType.Radio,
        onChange,
    });

    useEffect(() => {
        currentValue !== undefined &&
            name !== undefined &&
            setCheckedByGroupValue(name, ControlType.Radio, currentValue);
    }, [currentValue, name]);

    function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
        setOriginalEvent(e);
        setCurrentValue(e.target.value);
    }

    return <span onChange={handleRadioChange}>{children}</span>;
};

RadioGroup.displayName = ControlType.RadioGroup;
