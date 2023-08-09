import React, { ChangeEvent, useState } from 'react';

import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { CheckboxStory } from './checkbox.stories';

import { LittenEvent } from '../../components/control/control.types';
import { FormLabel } from '../../components/form/formLabel';
import { Checkbox } from '../../components/checkbox/checkbox';

const TestControlled = () => {
    const [checked, setChecked] = useState<boolean | undefined>(true);

    function handleSwitchChange(event: LittenEvent<ChangeEvent<HTMLInputElement>>) {
        const { checked } = event;
        setChecked(checked);
    }

    return (
        <>
            <FormLabel data-testid="switch" label='switch'>
                <Checkbox onChange={handleSwitchChange} checked={checked} defaultChecked={false} value="switch" />
            </FormLabel>
            <div>{`Switch is ${checked}`}</div>
        </>
    );
};

export const ControlledTest: CheckboxStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <TestControlled />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step("Switch is false", async () => {
            await userEvent.click(canvas.getByTestId('switch'));

            await expect(
                canvas.getByText("Switch is false")
            ).toBeInTheDocument();
        });
    }
};