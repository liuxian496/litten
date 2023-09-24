import React, { useState } from 'react';

import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { TextFiledStory } from '../../stories/textField.stories';

import { Mode } from '../../global/enum';
import { LittenTextChangeEvent } from '../../components/control/control.types';
import { TextField } from '../../components/textField/textField';
import { Button } from '../../components/button/button';
import { TextFieldValue } from '../../components/textField/textField.types';
import { FormLabel } from '../../components/formLabel/formLabel';

const Test = () => {
    const [role, setRole] = useState<TextFieldValue>();

    function handleTextFieldChange(event: LittenTextChangeEvent) {
        const { value } = event;
        setRole(value);
    }

    function handleResetBtuClick() {
        setRole("");
    }

    function handleJerryBtuClick() {
        setRole("Jerry");
    }

    return (
        <>
            <FormLabel label='Role: '>
                <TextField data-testid="text" value={role} onChange={handleTextFieldChange} />
            </FormLabel>    
            <Button mode={Mode.primary} style={{ marginLeft: "15px" }} onClick={handleResetBtuClick}>Reset</Button>
            <Button mode={Mode.outlined} style={{ marginLeft: "15px" }} onClick={handleJerryBtuClick}>Jerry</Button>
            <p>
                role is {role}
            </p>
        </>
    )
}

export const ControlledTest: TextFiledStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const textField = canvas.getByTestId('text');

        await step('"Role" textField value is "" ', async () => {
            await expect(
                textField
            ).toHaveValue("");

            await expect(
                await canvas.getByText("role is")
            ).toBeInTheDocument();
        });


        await step('Click "Jerry" button, then "Role" textField value is "Jerry"', async () => {
            await userEvent.click(canvas.getByText('Jerry'));

            await expect(
                textField
            ).toHaveValue("Jerry");

            await expect(
                await canvas.getByText("role is Jerry")
            ).toBeInTheDocument();
        });

        await step('Click "Reset" button, then "Role" textField value is ""', async () => {
            await userEvent.click(canvas.getByText('Reset'));

            await expect(
                textField
            ).toHaveValue("");

            await expect(
                await canvas.getByText("role is")
            ).toBeInTheDocument();
        });
    }
}