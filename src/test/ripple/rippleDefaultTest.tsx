import React, { useState } from 'react';

import { fireEvent, userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { RippleStory } from '../../stories/ripple.stories';

import { Blue } from '../../global/enum';
import { Ripple } from '../../components/ripple/ripple';

const Test = () => {
    const [focused, setFocused] = useState(false);

    function handleClick() {
        if (focused === true) {
            setFocused(false);
        } else {
            setFocused(true);
        }
    }

    return (
        <>
            <div style={{ position: 'relative', width: '100px', height: '100px', border: '1px solid #ababab' }}>
                <Ripple
                    focused={focused}
                    color={{
                        focusColor: Blue.focus,
                        waveColor: Blue.deepLight
                    }}
                />
            </div >
            <button onClick={handleClick}>Change Focused</button>
        </>
    );
}

export const DefaultTest: RippleStory = {
    args: {
        focused: false,
        color: {
            focusColor: Blue.focus,
            waveColor: Blue.deepLight
        }
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step('It "wave" in the document,when "ripple" mousedown', async () => {
            await fireEvent.mouseDown(canvas.getByTestId('litten-ripple'));

            await expect(
                await canvas.findByTestId('litten-ripple__wave')
            ).toBeInTheDocument();
        });

        await step('It "wave" not in the document,when "ripple" mouseup', async () => {
            await fireEvent.animationStart(canvas.getByTestId('litten-ripple__wave'));
            await fireEvent.animationEnd(canvas.getByTestId('litten-ripple__wave'));

            await fireEvent.mouseUp(canvas.getByTestId('litten-ripple'));


            await waitFor(() => expect(
                canvas.queryByTestId('litten-ripple__wave')
            ).not.toBeInTheDocument());
        });


        await step('Mouseover and mouseout', async () => {
            await fireEvent.mouseOver(canvas.getByTestId('litten-ripple'));
            await fireEvent.mouseOut(canvas.getByTestId('litten-ripple'));
        });

        await step('Ripple is focused', async () => {
            await userEvent.click(canvas.getByText('Change Focused'));

            await expect(
                await canvas.findByTestId('litten-ripple__focus')
            ).toBeInTheDocument();
        });

        await step('Ripple is not focused', async () => {
            await userEvent.click(canvas.getByText('Change Focused'));

            await waitFor(() => expect(
                canvas.queryByTestId('litten-ripple__focus')
            ).not.toBeInTheDocument());
        });
    }
};