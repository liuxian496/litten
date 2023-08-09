import React, { ChangeEvent, useState } from 'react';

import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { CheckboxStory } from '../../stories/checkbox.stories';

import { LittenEvent } from '../../components/control/control.types';
import { Placement } from '../../global/enum';
import { FormLabel } from '../../components/form/formLabel';
import { Checkbox } from '../../components/checkbox/checkbox';

const TestChecked = () => {
    const [chicken, setChicken] = useState('红烧鸡翅');
    const [egg, setEgg] = useState('?');

    function handleChickenChange(event: LittenEvent<ChangeEvent<HTMLInputElement>>) {
        const { checked } = event;
        setChicken(checked === true ? '红烧鸡翅' : '?');
    }

    function handleEggChange(event: LittenEvent<ChangeEvent<HTMLInputElement>>) {
        const { checked } = event;
        setEgg(checked === true ? '酱鸡蛋' : '?');
    }

    return (
        <>
            <FormLabel label='红烧鸡翅' labelPlacement={Placement.right}>
                <Checkbox data-testid="chicken" onChange={handleChickenChange} defaultChecked={true} />
            </FormLabel>
            <FormLabel data-testid="egg" label='酱鸡蛋' labelPlacement={Placement.right}>
                <Checkbox onChange={handleEggChange} defaultChecked={false} />
            </FormLabel>
            <div>{`Today's lunch is ${chicken} and ${egg}`}</div>
        </>
    );
};

export const CheckedTest: CheckboxStory = {
    parameters: {
        controls: {
            hideNoControlsWarning: true,
        },
    },
    render: () => <TestChecked />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step("Today's lunch is 红烧鸡翅 and ?", async () => {
            await expect(
                canvas.getByText("Today's lunch is 红烧鸡翅 and ?")
            ).toBeInTheDocument();
        });

        await step("Today's lunch is 红烧鸡翅 and 酱鸡蛋", async () => {
            await userEvent.click(canvas.getByTestId('egg'));

            await expect(
                canvas.getByText("Today's lunch is 红烧鸡翅 and 酱鸡蛋")
            ).toBeInTheDocument();
        });

        await step("Today's lunch is ? and ?", async () => {
            await userEvent.click(canvas.getByTestId('chicken'));
            await userEvent.click(canvas.getByTestId('egg'));

            await expect(
                canvas.getByText("Today's lunch is ? and ?")
            ).toBeInTheDocument();
        });
    }
};