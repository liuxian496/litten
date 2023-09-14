import React, { useContext, useEffect, useState } from "react";
import "./form.less";

import { FormControlProps } from "./form.types";
import { FormContext } from "./form";

import {
    ContentControlProps,
    LittenContentChangeEvent,
    LittenValue,
} from "../control/control.types";
import { UserControlType } from "../../global/enum";

export const FormControl = (props: FormControlProps) => {
    const { children, valuePath } = props;

    const { type: Component, props: childrenProps } = children;

    const { onChange, defaultValue = "" } =
        childrenProps as ContentControlProps;

    const { displayName } = Component;

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
            {displayName === UserControlType.Checkbox ||
            displayName === UserControlType.Switch
                ? renderCheckedControl()
                : renderContentControl()}
        </>
    );
};

FormControl.displayName = UserControlType.FormControl;
