import React, { useContext, useEffect, useState } from "react";
import "./form.less";

import {
    ContentControlProps,
    LittenContentChangeEvent,
    LittenValue,
} from "../control/control.types";
import { ControlType } from "../../global/enum";
import { getDefaultValueByDisplayName } from "../control/contentControl";

import { FormControlProps } from "./form.types";
import { FormContext } from "./form";


export const FormControl = (props: FormControlProps) => {
    const { children, valuePath } = props;

    const { type: Component, props: childrenProps } = children;

    const { displayName } = Component;

    const {
        onChange,
        defaultValue = getDefaultValueByDisplayName(displayName),
    } = childrenProps as ContentControlProps;

    const [value, setValue] = useState<LittenValue>();

    const formContext = useContext(FormContext);

    useEffect(() => {
        // 检测value path是否重复,并注册
        formContext?.checkValuePath(valuePath);
        return () => {
            formContext?.uninstall(valuePath);
        };
    }, [formContext, valuePath]);

    useEffect(() => {
        formContext?.register({
            get: () => {
                return value;
            },
            set: setValue,
            path: valuePath,
        });
    }, [formContext, value, valuePath]);

    function handleValueChange(event: LittenContentChangeEvent) {
        const { value } = event;

        onChange?.(event);
        setValue(value);
    }

    function handleCheckedChange(event: LittenContentChangeEvent) {
        const { checked } = event;

        onChange?.(event);
        setValue(checked);
    }

    function renderCheckedControl() {
        return (
            <Component
                {...childrenProps}
                checked={value}
                onChange={handleCheckedChange}
            />
        );
    }

    function renderContentControl() {
        return (
            <Component
                {...childrenProps}
                value={value}
                defaultValue={defaultValue}
                onChange={handleValueChange}
            />
        );
    }

    return (
        <>
            {displayName === ControlType.Checkbox ||
            displayName === ControlType.Switch
                ? renderCheckedControl()
                : renderContentControl()}
        </>
    );
};

FormControl.displayName = ControlType.FormControl;
