import React, { useState } from "react";

import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { LoadingStory } from "../../stories/loading.stories";

import { Button } from "../../components/button/button";
import { Loading } from "../../components/loading/loading";

const Test = () => {
    const [loading, setLoading] = useState(false);

    function handleShowBtuClick() {
        setLoading(true);
    }

    function handleHideBtuClick() {
        setLoading(false);
    }

    return (
        <>
            <Loading opened={loading} />
            <Button loading={loading} onClick={handleShowBtuClick}>
                Show Loading
            </Button>
            <Button onClick={handleHideBtuClick}>Hide Loading</Button>
        </>
    );
};

export const DefaultTest: LoadingStory = {
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const body = within(document.body);

        const showBtu = canvas.getByText("Show Loading");
        const hideBtu = canvas.getByText("Hide Loading");

        await step(
            'Click "Show Loading" button, then loading is opened.',
            async () => {
                await userEvent.click(showBtu);

                await waitFor(() => expect(showBtu).toBeDisabled());

                await expect(
                    await body.findByTestId("litten-popup")
                ).toBeVisible();

                await expect(
                    await body.findByTestId("litten-overlay")
                ).toBeVisible();

                await expect(
                    await body.findByTestId("litten-progress")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "Hide Loading" button, then loading is closed.',
            async () => {
                await userEvent.click(hideBtu);

                await waitFor(() => expect(showBtu).toBeEnabled());

                await expect(
                    await body.findByTestId("litten-popup")
                ).not.toBeVisible();

                await expect(
                    await body.findByTestId("litten-overlay")
                ).not.toBeVisible();

                await expect(
                    await body.queryByTestId("litten-progress")
                ).toBeNull();
            }
        );
    },
};
