import React, { useState } from "react";

import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { UtilStory } from "../../stories/loading.stories";

import { Button } from "../../components/button/button";
import { usePopup } from "../../components/popup/popup";
import { waitFor } from "@testing-library/react";

const Test = () => {
    const [loading, setLoading] = useState(false);

    usePopup({ opened: loading, hasOverlay: loading });

    function handleShowBtuClick() {
        setLoading(true);
    }

    function handleHideBtuClick() {
        setLoading(false);
    }

    return (
        <>
            <Button loading={loading} onClick={handleShowBtuClick}>
                Show Overlay
            </Button>
            <Button onClick={handleHideBtuClick}>Hide Overlay</Button>
        </>
    );
};

export const OverLayTest: UtilStory = {
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        const showBtu = canvas.getByText("Show Overlay");
        const hideBtu = canvas.getByText("Hide Overlay");

        await step(
            'Click "Show Overlay" button, then loading is opend.',
            async () => {
                await userEvent.click(showBtu);

                await waitFor(() => expect(showBtu).toBeDisabled());

                await expect(
                    await body.findByTestId("litten-popup")
                ).toBeVisible();

                await expect(
                    await body.findByTestId("litten-overlay")
                ).toBeVisible();
            }
        );

        await step(
            'Click "Hide Overlay" button, then loading is closed.',
            async () => {
                await userEvent.click(hideBtu);

                await waitFor(() => expect(showBtu).toBeEnabled());

                await expect(
                    await body.findByTestId("litten-popup")
                ).not.toBeVisible();

                await expect(
                    await body.findByTestId("litten-overlay")
                ).not.toBeVisible();
            }
        );
    },
};
