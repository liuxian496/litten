import React, { ChangeEvent } from 'react';

import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { CheckboxStory } from '../../stories/checkbox.stories';

import { LittenEvent } from '../../components/control/control.types';
import { Placement } from '../../global/enum';
import { FormLabel } from '../../components/form/formLabel';
import { Checkbox } from '../../components/checkbox/checkbox';

const TestIndeterminate = () => {
    const [checks, setChecked] = React.useState<[boolean | undefined, boolean | undefined]>([true, false]);

    function handleAllChange(event: LittenEvent<ChangeEvent<HTMLInputElement>>) {
        const { checked } = event;
        setChecked([checked, checked]);
    }

    function handleAppleChange(event: LittenEvent<ChangeEvent<HTMLInputElement>>) {
        const { checked } = event;
        setChecked([checked, checks[1]]);
    }

    function handleBananaChange(event: LittenEvent<ChangeEvent<HTMLInputElement>>) {
        const { checked } = event;
        setChecked([checks[0], checked]);
    }

    return (
        <>
            <FormLabel label='All Fruit' labelPlacement={Placement.right}>
                <Checkbox
                    data-testid="all"
                    checked={checks[0] && checks[1]}
                    indeterminate={checks[0] !== checks[1]}
                    value="all"
                    onChange={handleAllChange}
                />
            </FormLabel>
            <div style={{ marginLeft: "10px" }}>
                <FormLabel label='Apple' labelPlacement={Placement.right}>
                    <Checkbox
                        data-testid="apple"
                        checked={checks[0]}
                        value="apple"
                        onChange={handleAppleChange}
                    />
                </FormLabel>
                <FormLabel label='Banana' labelPlacement={Placement.right}>
                    <Checkbox
                        data-testid="banana"
                        checked={checks[1]}
                        value="banana"
                        onChange={handleBananaChange}
                    />
                </FormLabel>
            </div>
            {/* <div>{`Switch is ${checked}`}</div> */}
        </>
    );
};

export const IndeterminateTest: CheckboxStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <TestIndeterminate />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step("All Fruit is indeterminate", async () => {
            await expect(
                canvas.getByTestId('apple')
            ).toBeChecked();
            await expect(
                canvas.getByTestId('banana')
            ).not.toBeChecked();
            await expect(
                canvas.getByTestId('all')
            ).not.toBeChecked();
        });

        await step("Checked Banana then All Fruit is Checked", async () => {
            await userEvent.click(canvas.getByTestId('banana'));

            await expect(
                canvas.getByTestId('banana')
            ).toBeChecked();

            await expect(
                canvas.getByTestId('apple')
            ).toBeChecked();

            await expect(
                canvas.getByTestId('all')
            ).toBeChecked();
        });

        await step("Unchecked All Fruit then Apple and Banana is unchecked", async () => {
            await userEvent.click(canvas.getByTestId('all'));

            await expect(
                canvas.getByTestId('all')
            ).not.toBeChecked();

            await expect(
                canvas.getByTestId('apple')
            ).not.toBeChecked();

            await expect(
                canvas.getByTestId('banana')
            ).not.toBeChecked();
        });

        await step("checked All Fruit then Apple and Banana is checked", async () => {
            await userEvent.click(canvas.getByTestId('all'));

            await expect(
                canvas.getByTestId('all')
            ).toBeChecked();

            await expect(
                canvas.getByTestId('apple')
            ).toBeChecked();

            await expect(
                canvas.getByTestId('banana')
            ).toBeChecked();
        });
    }
};

