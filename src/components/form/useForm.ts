import { useEffect, useState } from "react";
import { FormRef } from "./form.types";
import { warn } from "../../global/util";

function getValues<T>(formRegister: any) {
    const value: any = {};
    Object.keys(formRegister).forEach((key) => {
        value[key] = formRegister[key].get();
    });

    return value as T;
}

function setValues(values: any, formRegister: any) {
    Object.keys(formRegister).forEach((key) => {
        formRegister[key].set(values[key]);
    });
}

function getValueByPath(path: string, formRegister: any) {
    const current = formRegister[path];
    let value;
    if (current !== undefined) {
        value = current.get();
    } else {
        value = undefined;
    }

    return value;
}

function setValueByPath(path: string, value: any, formRegister: any) {
    const current = formRegister[path];
    if (current !== undefined) {
        current.set(value);
    } else {
        warn(`The valuePath "${path}" does not exist.`);
    }
}

export function useForm<T>() {
    const [formRegister, setFormRegister] = useState<any>();

    const [form, setForm] = useState<FormRef<T>>({
        getValues: () => ({} as T),
        setValues: () => {},
        clear: () => {},
        getValueByPath: () => undefined,
        setValueByPath: () => {},
        _setFormRegister: setFormRegister,
    });

    useEffect(() => {
        return () => {
            setFormRegister({});
        };
    }, []);

    useEffect(() => {
        if (formRegister !== undefined) {
            setForm({
                getValues: () => {
                    return getValues<T>(formRegister);
                },
                setValues: (values: T) => {
                    return setValues(values, formRegister);
                },

                clear: () => {
                    setValues({}, formRegister);
                },
                getValueByPath: (path: string) => {
                    return getValueByPath(path, formRegister);
                },
                setValueByPath: (path: string, value: any) => {
                    setValueByPath(path, value, formRegister);
                },
            });
        }
    }, [formRegister]);

    return form;
}
