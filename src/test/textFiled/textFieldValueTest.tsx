import React, { useState } from 'react';

import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { TextFiledStory } from '../../stories/textField.stories';

import { Mode } from '../../global/enum';
import { LittenTextChangeEvent } from '../../components/control/control.types';
import { TextField } from '../../components/textField/textField';
import { Button } from '../../components/button/button';

const TestValue = () => {
    const [msg, setMsg] = useState<string | undefined>('');

    function handleChange(event: LittenTextChangeEvent) {
        const { e } = event;
        setMsg(e?.target.value);
    }

    return (
        <>
            <TextField data-testid="text" onChange={handleChange} />
            <Button mode={Mode.primary} style={{ marginLeft: "15px" }}>Submit</Button>
            <p>
                Value:{msg}
            </p>
        </>
    )
}

export const ValueTest: TextFiledStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <TestValue />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('"Value:Tom" to be in the document', async () => {
            await userEvent.type(canvas.getByTestId('text'), 'Tom');

            await expect(
                canvas.getByText("Value:Tom")
            ).toBeInTheDocument();
        });


        await step('"Value:Tom&Jerry" to be in the document', async () => {
            await userEvent.type(canvas.getByTestId('text'), '&Jerry');

            await expect(
                canvas.getByText("Value:Tom&Jerry")
            ).toBeInTheDocument();
        });
    }
}