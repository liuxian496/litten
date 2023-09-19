import React, { useState } from 'react';

import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { TextFiledStory } from '../../stories/textField.stories';

import { Placement } from '../../global/enum';
import { LittenCheckedChangeEvent } from '../../components/control/control.types';
import { FormLabel } from '../../components/formLabel/formLabel';
import { Checkbox } from '../../components/checkbox/checkbox';
import { TextField } from '../../components/textField/textField';

const Test = () => {
    const [disabled, setDisabled] = useState<boolean | undefined>(true);
    const [loading, setLoading] = useState<boolean | undefined>(true);

    function handleDisableCheckboxChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setDisabled(checked);
    }

    function handleLoadingCheckboxChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setLoading(checked);
    }

    return (
        <>
            <FormLabel label='Name: '>
                <TextField data-testid="nameTextField" disabled={disabled} loading={loading} />
            </FormLabel>
            <FormLabel label='Disabled' labelPlacement={Placement.right}>
                <Checkbox data-testid="disabled-checkbox" checked={disabled} onChange={handleDisableCheckboxChange} />
            </FormLabel>
            <FormLabel label='Loading' labelPlacement={Placement.right}>
                <Checkbox data-testid="loading-checkbox" checked={loading} onChange={handleLoadingCheckboxChange} />
            </FormLabel>
        </>
    )
}

export const DisabledTest: TextFiledStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const nameTextField = canvas.getByTestId('nameTextField');
        const DisabledCheckbox = canvas.getByTestId('disabled-checkbox');
        const LoadingCheckbox = canvas.getByTestId('loading-checkbox');

        await step('"Name" textField is disabled', async () => {
            await waitFor(() => expect(
                nameTextField
            ).toBeDisabled());
        });

        await step('Unchecked "Loading" checkbox, "Name" textField is also disabled', async () => {
            await userEvent.click(LoadingCheckbox);

            await waitFor(() => expect(
                nameTextField
            ).toBeDisabled());
        });

        await step('Unchecked "Disabled" checkbox, "Name" textField is enable', async () => {
            await userEvent.click(DisabledCheckbox);

            await waitFor(() => expect(
                nameTextField
            ).toBeEnabled());
        });

        await step('Checked "Loading" checkbox, "Name" textField is disabled', async () => {
            await userEvent.click(LoadingCheckbox);

            await waitFor(() => expect(
                nameTextField
            ).toBeDisabled());
        });
    }
}