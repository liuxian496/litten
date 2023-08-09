import React, { useState } from 'react';

import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { ButtonStory } from "../../stories/button.stories";

import { Mode } from '../../global/enum';
import { Button } from '../../components/button/button';

const TestClick = () => {
    const [count, setCount] = useState(0);

    function handleClick(e: any) {
        setCount(count + 1);
    }

    return (
        <>
            <Button data-index={0} mode={Mode.primary} onClick={handleClick}>Add</Button>
            <div><span>Count: </span><span>{count}</span></div>
        </>
    )
}

export const ClickTest: ButtonStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <TestClick />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('Click Add button ,Count is 1', async () => {
            await userEvent.click(canvas.getByRole('button'));

            await expect(
                canvas.getByText("1")
            ).toBeInTheDocument();
        });
    }
}