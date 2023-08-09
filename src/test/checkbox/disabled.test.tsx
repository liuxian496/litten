import React, { useState } from 'react';

import { within, userEvent, waitFor, fireEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { CheckboxStory } from '../../stories/checkbox.stories';

import { Mode } from '../../global/enum';
import { FormLabel } from '../../components/form/formLabel';
import { Checkbox } from '../../components/checkbox/checkbox';
import { Button } from '../../components/button/button';

const TestDisabled = () => {
    const [disabled, seDisabled] = useState(true);

    function handleChangeDisabledClick() {
        seDisabled(!disabled);
    }

    return (
        <>
            <FormLabel data-testid="switchLabel" label='Switch' disabled={disabled}>
                <Checkbox data-testid="switch" defaultChecked={true} disabled={disabled} />
            </FormLabel>
            <FormLabel label='Xbox' disabled={disabled}>
                <Checkbox data-testid="xbox" disabled={disabled} />
            </FormLabel>
            <Button mode={Mode.outlined} onClick={handleChangeDisabledClick}>Change Disabled</Button>
        </>
    );
};

export const DisabledTest: CheckboxStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <TestDisabled />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('"Switch" is disabled and checked, "Xbox" is disabled and unchecked', async () => {

            await expect(
                canvas.getByTestId('switch')
            ).toBeChecked();

            await expect(
                canvas.getByTestId('xbox')
            ).not.toBeChecked();

            await waitFor(() => expect(
                canvas.getByTestId('switch')
            ).toBeDisabled());

            await waitFor(() => expect(
                canvas.getByTestId('xbox')
            ).toBeDisabled());
        });

        await step('Click "Switch" label, it is also checked', async () => {
            await fireEvent.click(canvas.getByTestId('switchLabel'));

            await waitFor(() => expect(
                canvas.getByTestId('switch')
            ).toBeChecked());
        });

        await step('Click "Xbox", it is also unchecked', async () => {
            await userEvent.click(canvas.getByTestId('xbox'));

            await expect(
                canvas.getByTestId('xbox')
            ).not.toBeChecked();
        });

        await step('Click "Change Disabled" button, checkbox is enable', async () => {
            await userEvent.click(canvas.getByText('Change Disabled'));

            await waitFor(() => expect(
                canvas.getByTestId('switch')
            ).toBeEnabled());

            await waitFor(() => expect(
                canvas.getByTestId('xbox')
            ).toBeEnabled());
        });

        await step('Click "Switch", it is unchecked', async () => {
            await userEvent.click(canvas.getByTestId('switch'));

            await expect(
                canvas.getByTestId('switch')
            ).not.toBeChecked();
        });

        await step('Click "Xbox", it is checked', async () => {
            await userEvent.click(canvas.getByTestId('xbox'));

            await expect(
                canvas.getByTestId('xbox')
            ).toBeChecked();
        });

        await step('Click "Change Disabled" button, checkbox is disabled', async () => {
            await userEvent.click(canvas.getByText('Change Disabled'));

            await waitFor(() => expect(
                canvas.getByTestId('switch')
            ).toBeDisabled());

            await waitFor(() => expect(
                canvas.getByTestId('xbox')
            ).toBeDisabled());
        });
    }
};