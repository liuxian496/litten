
import React, { useState, forwardRef, useRef, useImperativeHandle, useEffect, createContext, useContext } from 'react';


import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../components/button/button';

export default {
    title: 'Example/Test',

} as Meta;

type Story = StoryObj;

export const Test: Story = {
    render: () => <></>
}


const useForm = () => {
    return {};
}

const Panel = forwardRef(function Panel(props: any, panelRef) {
    const { children, form } = props;


    const { type: Component, props: childrenProps, ref } = children;
    const { onChange } = childrenProps;

    const [value, setValue] = useState('');

    useImperativeHandle(panelRef, () => {
        // console.log('useImperativeHandle');
        return {
            getFieldsValue
        }
    });

    // form.getFieldsValue = getFieldsValue;

    useEffect(() => {
        // console.log('useEffect');
        form.getFieldsValue = getFieldsValue;
    });

    function getFieldsValue() {
        return value;
    }

    function handleChange(e: any) {
        onChange(e);
        setValue(e.target.value);
    }

    return (
        <div>
            <Component value={value} {...childrenProps} ref={ref} onChange={handleChange} />
        </div>
    )
});

const MyInput = forwardRef(function MyInput(props: any, ref) {
    const { label, ...otherProps } = props;

    const inputRef = useRef(null);

    useImperativeHandle(ref, () => {
        return {
            showValue: () => {
                inputRef && inputRef.current && alert(inputRef.current['value']);
            }
        }
    })

    return (
        <label>
            {props.label}
            <input {...otherProps} ref={inputRef} />
        </label>
    );
});

const TestForwardRef = () => {
    const ref: any = useRef(null);
    const panelRef: any = useRef();

    const form: any = useForm();

    function handleClick() {
        // ref && ref.current && alert(ref.current['value']);
        ref.current.showValue();
        console.log('ref:' + panelRef.current.getFieldsValue());
        console.log('form: ' + form.getFieldsValue())
    }

    function handleChange(e: any) {
        console.log(e.target.value)
    }

    return (
        <>
            <Panel ref={panelRef} form={form}>
                <MyInput label="name" ref={ref} onChange={handleChange} />
            </Panel>
            <Button onClick={handleClick}>Show Value</Button>
        </>
    )
}

const UsePreviousTest: Story = {
    render: () => <TestForwardRef />
};

interface FormState {
    register: (getValue: any) => void
}

const FormContext = createContext<FormState | undefined>(undefined);

const Form = (props: any) => {
    const { children, form = {} } = props;

    function register(getValue: any) {
        form.getValue = getValue;
    }


    return (
        <FormContext.Provider value={{ register }}>
            {children}
        </FormContext.Provider>
    );
}

const FormControl = (props: any) => {
    const { children } = props;

    const { type: Component, props: childrenProps, ref } = children;

    const { onChange } = childrenProps;

    const [value, setValue] = useState('');

    const formContext = useContext(FormContext);

    formContext && formContext.register(getValue);

    function getValue() {
        return value;
    }

    function handleChange(e: any) {
        onChange && onChange(e);
        setValue(e.target.value);
    }

    return (
        <Component value={value} {...childrenProps} ref={ref} onChange={handleChange} />
    );
};


const TestForm = () => {

    const myForm: any = useForm();
    const secondaryForm: any = useForm();

    function handleClick() {
        console.log(myForm.getValue())
    }

    function handleAgeClick() {
        console.log(secondaryForm.getValue());
    }

    return (
        <>
            <Form form={myForm}>
                <span>今天天气不错，挺风和日丽的</span>
                <div>
                    <FormControl>
                        <MyInput label="name" />
                    </FormControl>
                </div>
            </Form>
            <Button onClick={handleClick}>Show Value</Button>

            <Form form={secondaryForm}>
                <div>
                    <FormControl>
                        <MyInput label="Age" />
                    </FormControl>
                </div>
            </Form>
            <Button onClick={handleAgeClick}>Show Age Value</Button>
        </>
    )
}

const FormTest: Story = {
    render: () => <TestForm />
}

const CustomInput = (props: any) => {
    return (
        <input
            {...props}
        />
    )
}

const TestInput = () => {
    const [value, setValue] = useState<string | number>(123);

    function handleChange(e: any) {
        console.log('change');
        setValue(e.target.value);
    }

    function handleClick() {
        setValue(10000000);
    }

    return (
        <>
            <CustomInput defaultValue={value} onChange={handleChange} />
            <Button onClick={handleClick}>Set Value</Button>
        </>
    )
}

const InputTest: Story = {
    render: () => <TestInput />
}