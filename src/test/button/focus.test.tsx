import React from 'react';

import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { ButtonStory } from "../../stories/button.stories";

import { Mode } from '../../global/enum';
import { Button } from '../../components/button/button';


export const FocusTest: ButtonStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => {
        return (
            <>
                <Button>Text</Button>
                <Button mode={Mode.primary} style={{ marginLeft: "16px" }}>Primary</Button>
                <Button mode={Mode.outlined} style={{ marginLeft: "16px" }}>Outlined</Button>
                <button style={{ marginLeft: "16px" }}>End</button>
            </>
        )
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const textBtu = canvas.getByText('Text');
        const primaryBtu = canvas.getByText('Primary');
        const outlinedBtu = canvas.getByText('Outlined');
        const endBtu = canvas.getByText('End');

        await step('"Text" button is focused', async () => {

            await userEvent.click(textBtu);

            await expect(
                textBtu
            ).toHaveFocus();

            await expect(
                await canvas.findByTestId("litten-ripple__focus")
            ).toBeInTheDocument();

            await expect(
                textBtu
            ).toContainElement(canvas.getByTestId("litten-ripple__focus"));
        });

        await step('"Primary" button is focused', async () => {

            await userEvent.click(primaryBtu);

            await expect(
                primaryBtu
            ).toHaveFocus();

            await expect(
                await canvas.findByTestId("litten-ripple__focus")
            ).toBeInTheDocument();

            await expect(
                primaryBtu
            ).toContainElement(canvas.getByTestId("litten-ripple__focus"));
        });

        await step('"Outlined" button is focused', async () => {
            await userEvent.click(outlinedBtu);

            await expect(
                outlinedBtu
            ).toHaveFocus();

            await expect(
                await canvas.findByTestId("litten-ripple__focus")
            ).toBeInTheDocument();

            await expect(
                outlinedBtu
            ).toContainElement(canvas.getByTestId("litten-ripple__focus"));
        });

        await step('"End" button is focused', async () => {
            await userEvent.click(endBtu);

            await expect(
                endBtu
            ).toHaveFocus();

            await waitFor(() => expect(
                canvas.queryByTestId("litten-ripple__focus")
            ).not.toBeInTheDocument());
        });
    }
}