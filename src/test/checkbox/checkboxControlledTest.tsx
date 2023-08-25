import React, { useState } from 'react';

import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { CheckboxStory } from '../../stories/checkbox.stories';

import { LittenCheckedChangeEvent } from '../../components/control/control.types';
import { FormLabel } from '../../components/form/formLabel';
import { Checkbox } from '../../components/checkbox/checkbox';
import { Button } from '../../components/button/button';

const Test = () => {
    const [checked, setChecked] = useState<boolean | undefined>(true);

    function handleSwitchChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setChecked(checked);
    }

    function handleChangeBtuClick() {
        setChecked(!checked);
    }

    return (
        <>
            <FormLabel data-testid="switch" label='switch'>
                <Checkbox onChange={handleSwitchChange} checked={checked} value="switch" />
            </FormLabel>
            <Button onClick={handleChangeBtuClick}>Change Checked</Button>
            <div>{`Switch is ${checked}`}</div>
        </>
    );
};

export const ControlledTest: CheckboxStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
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