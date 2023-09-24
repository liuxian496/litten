import React, { useState } from 'react';

import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { TextFiledStory } from '../../stories/textField.stories';

import { Mode } from '../../global/enum';

import { TextFieldValue } from '../../components/textField/textField.types';
import { FormRef } from '../../components/form/form.types';

import { useForm } from '../../components/form/useForm';

import { TextField } from '../../components/textField/textField';
import { Button } from '../../components/button/button';
import { FormLabel } from '../../components/formLabel/formLabel';
import { Form } from '../../components/form/form';
import { FormControl } from '../../components/form/formControl';

type Data = {
    name: string
}

const Test = () => {
    const [role, setRole] = useState<TextFieldValue>();
    const myForm: FormRef<Data> = useForm();

    function handleShowValueBtuClick() {
        setRole(myForm.getValueByPath('role'));
    }

    return (
        <>
            <Form formRef={myForm}>
                <FormLabel label='Role: '>
                    <FormControl valuePath='role'>
                        <TextField data-testid="text" defaultValue="Tom" />
                    </FormControl>
                </FormLabel>
            </Form>
            <Button mode={Mode.outlined} onClick={handleShowValueBtuClick}>Set Value by useRef</Button>
            <p>
                role is {role}
            </p>
        </>
    )
}

export const WithFormTest: TextFiledStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const textField = canvas.getByTestId('text');
        const setValueBtu = canvas.getByText('Set Value by useRef');

        await step('"Role" textField default value is "Tom"', async () => {
            await expect(
                textField
            ).toHaveValue("Tom");

            await expect(
                await canvas.getByText("role is")
            ).toBeInTheDocument();
        });

        await step('Click "Set Value by useRef" button, then "role is Tom"', async () => {
            await userEvent.click(setValueBtu);

            await expect(
                await canvas.getByText("role is Tom")
            ).toBeInTheDocument();
        });

        await step('"Role" textField type "&Jerry", Click "Set Value by useRef" button, then "role is Tom&Jerry"', async () => {
            await userEvent.type(textField, "&Jerry");

            await expect(
                textField
            ).toHaveValue("Tom&Jerry");

            await userEvent.click(setValueBtu);

            await expect(
                await canvas.getByText("role is Tom&Jerry")
            ).toBeInTheDocument();
        });
    }
}