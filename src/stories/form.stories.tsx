
import React, { ChangeEvent, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/jest';
import { userEvent, within, waitFor } from '@storybook/testing-library';

import { Mode } from '../global/enum';
import { LittenEvent } from '../components/control/control.types';
import { Form } from '../components/form/form';
import { useForm } from '../components/form/useForm';
import { FormRef } from '../components/form/form.types';
import { FormControl } from '../components/form/formControl';
import { FormLabel } from '../components/form/formLabel';
import { TextField } from '../components/textField/textField';
import { Button } from '../components/button/button';

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
    type Data = {
        name: string,
        animation: string;
    }

    const myForm: FormRef<Data> = useForm();

    const [msg, setMsg] = useState('');

    function handleShowValueClick() {
        const { name, animation } = myForm.getValues();

        setMsg(`Name: ${name}, Animation: ${animation}`);
    }

    function handleClearClick() {
        myForm.clear();
    }

    return (
        <>
            <Form formRef={myForm}>
                <span>今天天气不错，挺风和日丽的</span>
                <FormLabel label='Name:'>
                    <FormControl valuePath='name'>
                        <TextField data-testid="nameTextField" />
                    </FormControl>
                </FormLabel>
                <FormLabel label='Animation:'>
                    <FormControl valuePath='animation'>
                        <TextField data-testid="animationTextField" defaultValue="Tom & Jerry" />
                    </FormControl>
                </FormLabel>
            </Form>
            <Button mode={Mode.primary} onClick={handleShowValueClick}>Show Value</Button>
            <Button onClick={handleClearClick}>Clear</Button>
            <div style={{ marginTop: '10px' }}>
                {msg}
            </div>
        </>
    );
}

export const DefaultTest: Story = {
    render: () => <TestDefault />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const nameTextField = canvas.getByTestId('nameTextField');
        const animationTextField = canvas.getByTestId('animationTextField');

        const showValueBtu = canvas.getByText('Show Value');
        const clearBtu = canvas.getByText('Clear');

        await step('Default "Name" is "", defualt "Animation" is Tom & Jerry', async () => {
            await expect(
                nameTextField
            ).toHaveValue('');

            await expect(
                animationTextField
            ).toHaveValue('Tom & Jerry');
        });

        await step('Type "Name" Tom, "Age" 6, "Animation" 2', async () => {
            await userEvent.type(nameTextField, 'Tom');
            await userEvent.type(animationTextField, '2');

            await expect(
                nameTextField
            ).toHaveValue('Tom');

            await expect(
                animationTextField
            ).toHaveValue('Tom & Jerry2');

            await userEvent.click(showValueBtu);

            await expect(
                canvas.getByText('Name: Tom, Animation: Tom & Jerry2')
            ).toBeInTheDocument();
        });

        await step('Clear Form, then default "Name" is "", defualt "Animation" is Tom & Jerry', async () => {
            await userEvent.click(clearBtu);

            await expect(
                nameTextField
            ).toHaveValue('');

            await expect(
                animationTextField
            ).toHaveValue('Tom & Jerry');

            await userEvent.click(showValueBtu);

            await expect(
                canvas.getByText('Name: , Animation: Tom & Jerry')
            ).toBeInTheDocument();
        });
    }
};

const TestDuplicateValuePath = () => {
    type Data = {
        name: string,
    }

    const myForm = useForm<Data>();

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
    );
}


function myException() {
    throw new Error(`Please check your code.`)
}

export const DuplicateValuePathTest: Story = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <TestDuplicateValuePath />,
    play: async ({ canvasElement, step }) => {

        const canvas = within(canvasElement);

        await step('Duplicate valuePath', async () => {
            await waitFor(() => expect(
                canvas.getByText('[litten error]: The valuePath "name" is used by other FormControl, Please check your form.')
            ).toBeInTheDocument());

            await expect(
                () => myException()
            ).toThrow('Please check your code.');
        });
    }
}

const TestMultiForm = () => {
    type Name = {
        name: string,
    }

    type Salary = {
        salary: string,
    }

    const nameForm = useForm<Name>();
    const salaryForm = useForm<Salary>();

    const [salary, setSalary] = useState(0);

    function handleNameChange(event: LittenEvent<ChangeEvent<HTMLInputElement>>) {
        // console.log(`name change to ${event.value}`);
    }

    function handlSetNameClick() {
        nameForm.setValueByPath('name', 'Tom');

        //测试分支
        nameForm.getValueByPath('mana');
        nameForm.getValueByPath('name');
        nameForm.setValueByPath('mana', 10000000);

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

export const MultiFormTest: Story = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <TestMultiForm />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Tom has 1000000 salary', async () => {
            await userEvent.click(canvas.getByText('Set Name'));

            await expect(
                canvas.getByTestId('name').getAttribute('value')
            ).toEqual('Tom');

            await userEvent.click(canvas.getByText('Set Salary'));

            await expect(
                canvas.getByTestId('salary').getAttribute('value')
            ).toEqual('1000000');

            await expect(
                canvas.getByText('恭喜，达成百万年薪')
            ).toBeInTheDocument();
        });

        await step('Clear', async () => {
            await userEvent.clear(canvas.getByTestId('salary'));

            await expect(
                canvas.queryByText('恭喜，达成百万年薪')
            ).not.toBeInTheDocument();
        });
    }
}

const TestUseForm = () => {
    type Name = {
        name: string
    };

    const spiritForm = useForm<Name>();

    spiritForm.getValues();
    spiritForm.clear();
    spiritForm.getValueByPath('name');
    spiritForm.setValues({ name: 'Jerry' });
    spiritForm.setValueByPath('name', 'Jerry');

    return (
        <>Test TestUseForm</>
    )
}

export const UseFormTest: Story = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <TestUseForm />,
}