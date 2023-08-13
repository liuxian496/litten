import React, { createContext, useEffect, useState } from 'react';
import './form.less';

import classnames from 'classnames';

import { FormProps, FormContextProps, FormRegisterProps } from './form.types';

import { getPrefixNs } from '../control/control';

import { ExceptionBoundary } from '../control/exceptionBoundary';


function getVisualStates(cls?: string) {
    const prefixCls = getPrefixNs('form', cls);

    const visualStates = classnames(
        prefixCls
    );

    return visualStates;
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

    useEffect(() => {
        formRef._setFormRegister?.(formRegister);
        delete formRef['_setFormRegister'];
    }, []);

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