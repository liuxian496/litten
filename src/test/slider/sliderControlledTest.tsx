import React, { useState } from "react";

import { userEvent, within, expect } from "@storybook/test";

import { SliderStory } from "../../stories/slider.stories";

import { Mode } from "../../global/enum";
import { LittenNumberChangeEvent } from "../../components/control/littenEvent.types";

import { Button } from "../../components/button/button";
import { StackPanel } from "../../components/stackPanel/stackPanel";
import { Slider } from "../../components/slider/slider";

const Test = () => {
    const [volume, setVolume] = useState(0);

    function handleSliderChange(event: LittenNumberChangeEvent) {
        const { value } = event;
        value !== undefined && setVolume(value);
    }

    function handleResetBtuClick() {
        setVolume(0);
    }

    function handleJerryBtuClick() {
        setVolume(66);
    }

    return (
        <>
            <StackPanel style={{ marginLeft: "24px", width: "200px" }}>
                <Slider
                    data-testid="volumeSlider"
                    value={volume}
                    onChange={handleSliderChange}
                />
            </StackPanel>
            <Button
                mode={Mode.primary}
                style={{ marginLeft: "15px" }}
                onClick={handleResetBtuClick}
            >
                Reset
            </Button>
            <Button
                mode={Mode.outlined}
                style={{ marginLeft: "15px" }}
                onClick={handleJerryBtuClick}
            >
                Set volume 66
            </Button>
            <p>volume is {volume}</p>
        </>
    );
};

export const ControlledTest: SliderStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const volumeSlider = canvas.getByTestId("volumeSlider");

        await step("Slider value is 0. ", async () => {
            await expect(volumeSlider).toHaveValue("0");
            await expect(
                await canvas.getByText("volume is 0")
            ).toBeInTheDocument();
        });

        await step(
            'Click "Set volume 66" button, then Slider value is 66.',
            async () => {
                await userEvent.click(canvas.getByText("Set volume 66"));
                await expect(volumeSlider).toHaveValue("66");
                await expect(
                    await canvas.getByText("volume is 66")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "Reset" button, then Slider value is 0.',
            async () => {
                await userEvent.click(canvas.getByText("Reset"));
                await expect(volumeSlider).toHaveValue("0");
                await expect(
                    await canvas.getByText("volume is 0")
                ).toBeInTheDocument();
            }
        );
    },
};
