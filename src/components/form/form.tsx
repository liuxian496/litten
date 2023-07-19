import React, { createContext, useState } from 'react';
import './form.less';

import classnames from 'classnames';


import { FormProps, FormContextProps, FormRegisterProps, FormRef } from './form.types';

import { getPrefixNs } from '../control/control';
import { warn } from '../../global/util';

import { ExceptionBoundary } from '../control/exceptionBoundary';


function getValues(formRegister: any) {
    const value: any = {};
    Object.keys(formRegister).forEach(key => {
        value[key] = formRegister[key].get();
    });

    return value;
}

function setValues(values: any, formRegister: any) {
    Object.keys(formRegister).forEach(key => {
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
        warn(`The valuePath "${path}" does not exist.`)
    }
}

function getVisualStates(cls?: string) {
    const prefixCls = getPrefixNs('form', cls);

    const visualStates = classnames(
        prefixCls
    );

    return visualStates;
}

export const useForm = () => {
    const [form] = useState<FormRef>({
        getValues: () => ({}),
        setValues: () => { },
        getValueByPath: () => (undefined),
        setValueByPath: () => { }
    });
    return form;
}

export const FormContext = createContext<FormContextProps | undefined>(undefined);

const valuePathduplicate = (path: string) => `The valuePath "${path}" is used by other FormControl, Please check your form.`

export const Form = ({
    children,
    formRef,
    prefixCls,
    ...props
}: FormProps) => {

    const [formRegister] = useState<any>({});

    const [errorMsg, setErrorMsg] = useState<undefined | string>();

    const context: FormContextProps = {
        register: (props: FormRegisterProps) => {
            const { path, get, set } = props;
            formRegister[path].get = get;
            formRegister[path].set = set;
        },
        uninstall: (path: string) => {
            delete formRegister[path];
        },
        checkValuePath: (path) => {
            if (formRegister.hasOwnProperty(path) === false) {
                formRegister[path] = {};
            } else {
                setErrorMsg(valuePathduplicate(path));
            }
        }
    }

    formRef.getValues = () => {
        return getValues(formRegister);
    };

    formRef.setValues = (values) => {
        return setValues(values, formRegister);
    }

    formRef.getValueByPath = (path) => {
        return getValueByPath(path, formRegister);
    };

    formRef.setValueByPath = (path, value) => {
        setValueByPath(path, value, formRegister);
    };

    return (
        <ExceptionBoundary errorMsg={errorMsg}>
            <FormContext.Provider value={context}>
                <div
                    className={getVisualStates(prefixCls)}
                    {...props}
                >
                    {children}
                </div>
            </FormContext.Provider>
        </ExceptionBoundary>

    )
};