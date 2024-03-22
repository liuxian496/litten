import React, { useState } from "react";

import { userEvent, within, expect } from "@storybook/test";

import { UtilStory } from "../../stories/loading.stories";

import { Button } from "../../components/button/button";
import { usePopup } from "../../components/popup/popup";
import { waitFor } from "@testing-library/react";

const Test = () => {
    const [loading, setLoading] = useState(false);

    usePopup({ opened: loading });

    function handleShowBtuClick() {
        setLoading(true);
    }

    function handleHideBtuClick() {
        setLoading(false);
    }

    return (
        <>
            <Button loading={loading} onClick={handleShowBtuClick}>
                Show Popup
            </Button>
            <Button onClick={handleHideBtuClick}>Hide Popup</Button>
        </>
    );
};

export const PopupTest: UtilStory = {
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        const showBtu = canvas.getByText("Show Popup");
        const hideBtu = canvas.getByText("Hide Popup");

        await step(
            'Click "Show Popup" button, then loading is opend.',
            async () => {
                await userEvent.click(showBtu);

                await waitFor(() => expect(showBtu).toBeDisabled());

                await expect(
                    await body.findByTestId("litten-popup")
                ).toBeVisible();

                await expect(
                    await body.findByTestId("litten-overlay")
                ).not.toBeVisible();
            }
        );

        await step(
            'Click "Hide Popup" button, then loading is closed.',
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
