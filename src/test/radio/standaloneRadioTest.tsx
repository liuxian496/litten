import React, { useState } from 'react';

import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { LittenCheckedChangeEvent } from '../../components/control/control.types';
import { Radio } from '../../components/radio/radio';
import { FormLabel } from '../../components/formLabel/formLabel';
import { Placement } from '../../global/enum';

import { RadioStory } from '../../stories/radio.stories';

const Test = () => {
    const [value, setValue] = useState<string | undefined>('Nothing');

    function handleChange(e: LittenCheckedChangeEvent) {
        const { checked, value } = e;
        if (checked === true) {
            setValue(value);
        }
    }

    return (
        <>
            <FormLabel label='Apple' labelPlacement={Placement.right}>
                <Radio data-testid="apple" value="apple" name='fruit' onChange={handleChange} />
            </FormLabel>
            <FormLabel label='Banana' labelPlacement={Placement.right}>
                <Radio data-testid="banana" value="banana" name='fruit' onChange={handleChange} defaultChecked />
            </FormLabel>
            <FormLabel label='Peach' labelPlacement={Placement.right}>
                <Radio data-testid="peach" value="peach" name='fruit' onChange={handleChange} />
            </FormLabel>
            <span>{`${value} is checked`}</span>
        </>
    )
}

export const StandaloneRadioTest: RadioStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const appleRadio = canvas.getByTestId('apple');
        const bananaRadio = canvas.getByTestId('banana');
        const peachRadio = canvas.getByTestId('peach');

        await step('Banana is default checked, other radios are unchecked', async () => {
            await expect(
                appleRadio
            ).not.toBeChecked();

            await expect(
                bananaRadio
            ).toBeChecked();

            await expect(
                peachRadio
            ).not.toBeChecked()

            await expect(
                await canvas.findByText("banana is checked")
            ).toBeInTheDocument();
        });

        await step('Click "peach" radio, except peach is checked, other radios are unchecked', async () => {
            await userEvent.click(peachRadio);

            await expect(
                appleRadio
            ).not.toBeChecked();

            await expect(
                bananaRadio
            ).not.toBeChecked();

            await expect(
                peachRadio
            ).toBeChecked()

            await expect(
                await canvas.findByText("peach is checked")
            ).toBeInTheDocument();
        });

        await step('Click "apple" radio, except apple is checked, other radios are unchecked', async () => {
            await userEvent.click(appleRadio);

            await expect(
                appleRadio
            ).toBeChecked();

            await expect(
                bananaRadio
            ).not.toBeChecked();

            await expect(
                peachRadio
            ).not.toBeChecked()

            await expect(
                await canvas.findByText("apple is checked")
            ).toBeInTheDocument();
        });
    }
};