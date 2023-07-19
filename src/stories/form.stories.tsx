
import React, { ChangeEvent, useState } from 'react';

import { Form, useForm } from '../components/form/form';
import { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/jest';
import { fireEvent } from '../global/testLib';
import { userEvent, within } from '@storybook/testing-library';

import { FormControl } from '../components/form/formControl';
import { TextField } from '../components/textField/textField';
import { Button } from '../components/button/button';
import { FormRef } from '../components/form/form.types';
import { LittenEvent } from '../components/control/control.types';

export default {
    title: 'Example/Form',
    component: Form,
    argTypes: {
        rippleColor: {
            control: false,
        },
        prefixCls: {
            control: false,
        },
        tabindex: {
            table: {
                disable: true,
            },
        },
        //在示例文档中移除children属性的显示
        children: {
            table: {
                disable: true,
            },
        }
    },

} as Meta<typeof Form>;

type Story = StoryObj<typeof Form>;

const TestDefault = () => {
    const myForm: any = useForm();

    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    function handleShowValueClick() {
        const value = myForm.getValues();

        setName(`Name:${value.name}`);
        setAge(`Age:${myForm.getValueByPath('age')}`);
    }

    return (
        <>
            <Form formRef={myForm}>
                <span>今天天气不错，挺风和日丽的</span>
                <div style={{ marginBottom: '10px' }}>
                    <FormControl valuePath='name'>
                        <TextField data-testid="name__text" />
                    </FormControl>
                </div>
                <FormControl valuePath='age'>
                    <TextField data-testid="age__text" />
                </FormControl>
            </Form>
            <Button onClick={handleShowValueClick}>Show Value</Button>
            <div style={{ marginTop: '10px' }}>
                {name}
            </div>
            <div>
                {age}
            </div>
        </>
    );
}

export const DefaultTest: Story = {
    render: () => <TestDefault />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.type(canvas.getByTestId('name__text'), 'Tom');
        await userEvent.type(canvas.getByTestId('age__text'), '6');
        await userEvent.click(canvas.getByText('Show Value'));

        await expect(
            canvas.getByText('Name:Tom')
        ).toBeInTheDocument();

        await expect(
            canvas.getByText('Age:6')
        ).toBeInTheDocument();

        await userEvent.clear(canvas.getByTestId('name__text'));
        await userEvent.clear(canvas.getByTestId('age__text'));

        await userEvent.type(canvas.getByTestId('name__text'), 'Jerry');
        await userEvent.type(canvas.getByTestId('age__text'), '5');
        await userEvent.click(canvas.getByText('Show Value'));

        await expect(
            canvas.getByText('Name:Jerry')
        ).toBeInTheDocument();
        await expect(
            canvas.getByText('Age:5')
        ).toBeInTheDocument();
    }
};

const TestDuplicateValuePath = () => {
    const myForm: any = useForm();

    function renderDuplicate() {
        return (
            <Form formRef={myForm}>
                <div style={{ marginBottom: '10px' }}>
                    <FormControl valuePath='name'>
                        <TextField />
                    </FormControl>
                </div>
                <FormControl valuePath='name'>
                    <TextField />
                </FormControl>
            </Form>
        )
    }

    return (
        <>
            {renderDuplicate()}
        </>
    );
}


function myException() {
    throw new Error(`Please check your code.`)
}

export const DuplicateValuePathTest: Story = {
    render: () => <TestDuplicateValuePath />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await expect(
            () => myException()
        ).toThrow('Please check your code.');

    }
}

const TestValue = () => {
    const salaryForm = useForm();
    const nameForm = useForm();
    const spiritForm = useForm();

    const [salary, setSalary] = useState(0);

    function handleNameChange(event: LittenEvent<ChangeEvent<HTMLInputElement>>) {
        // console.log(`name change to ${event.value}`);
    }

    function handlSetNameClick() {
        nameForm.setValueByPath('name', 'Tom');

        //测试分支
        nameForm.getValueByPath('mana');
        nameForm.setValueByPath('mana', 10000000);
        spiritForm.getValues();
        spiritForm.getValueByPath('mana');
        spiritForm.setValues({ mana: 10000000 });
        spiritForm.setValueByPath('mana', 10000000);

    }

    function handleSalaryClick() {
        salaryForm.setValues({
            salary: 1000000
        })
    }

    function handleSalaryChange(event: LittenEvent<ChangeEvent<HTMLInputElement>>) {
        setSalary(parseInt(event.value));
    }

    return (
        <>
            <Form data-testid="nameForm" formRef={nameForm}>
                <FormControl valuePath="name">
                    <TextField data-testid="name" onChange={handleNameChange} />
                </FormControl>
                <Button onClick={handlSetNameClick}>Set Name</Button>
            </Form>
            <Form data-testid="salaryForm" formRef={salaryForm} style={{ marginTop: '10px' }}>
                <FormControl valuePath="salary">
                    <TextField data-testid="salary" onChange={handleSalaryChange} />
                </FormControl>
                <Button onClick={handleSalaryClick}>Set Salary</Button>
            </Form>
            {salary >= 1000000 && <div>恭喜，达成百万年薪</div>}
        </>
    )
}

export const ValueTest: Story = {
    render: () => <TestValue />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.click(canvas.getByText('Set Name'));

        await expect(
            canvas.getByTestId('name').getAttribute('value')
        ).toEqual('Tom');

        // await userEvent.click(canvas.getByText('Set Salary'));
        await fireEvent.click(canvas.getByText('Set Salary'));

        await expect(
            canvas.getByTestId('salary').getAttribute('value')
        ).toEqual('1000000');
        
        await expect(
           canvas.getByText('恭喜，达成百万年薪')
        ).toBeInTheDocument();

        await userEvent.clear(canvas.getByTestId('salary'));
        await expect(
            canvas.queryByText('恭喜，达成百万年薪')
        ).not.toBeInTheDocument();
    }
}