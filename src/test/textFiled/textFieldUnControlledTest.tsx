import React, { useRef, useState } from 'react';

import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { TextFiledStory } from '../../stories/textField.stories';

import { Mode } from '../../global/enum';

import { TextField } from '../../components/textField/textField';
import { Button } from '../../components/button/button';
import { TextFieldValue } from '../../components/textField/textField.types';
import { FormLabel } from '../../components/formLabel/formLabel';
import { StackPanel } from '../../components/stackPanel/stackPanel';

const Test = () => {
    const [role, setRole] = useState<TextFieldValue>();
    const ref = useRef<HTMLInputElement>(null);

    function handleSetValueBtuClick() {
        setRole(ref.current?.value);
    }

    return (
        <StackPanel direction="column" alignItems="flex-start">
            <FormLabel label='Role: '>
                <TextField data-testid="text" ref={ref} defaultValue="Tom" />
            </FormLabel>
            <Button mode={Mode.outlined} onClick={handleSetValueBtuClick}>Set Value by useRef</Button>
            <p>
                role is {role}
            </p>
        </StackPanel>
    )
}

export const UnControlledTest: TextFiledStory = {
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