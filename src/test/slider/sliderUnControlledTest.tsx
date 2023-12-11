import React, { useRef, useState } from "react";

import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { SliderStory } from "../../stories/slider.stories";

import { StackPanel } from "../../components/stackPanel/stackPanel";
import { Button } from "../../components/button/button";
import { Slider } from "../../components/slider/slider";
import { Mode } from "../../global/enum";
import { LittenSlider } from "../../components/slider/slider.types";

const Test = () => {
    const [volume, setVolume] = useState(50);
    const ref = useRef<LittenSlider>(null);

    function handleSetValueBtuClick() {
        ref.current && setVolume(ref.current.value);
    }

    return (
        <>
            <StackPanel style={{ marginLeft: "24px", width: "200px" }}>
                <Slider
                    data-testid="volumeSlider"
                    ref={ref}
                    defaultValue={50}
                />
            </StackPanel>
            <Button mode={Mode.outlined} onClick={handleSetValueBtuClick}>
                Set Value by ref
            </Button>
            <p>volume is {volume}</p>
        </>
    );
};

export const UnControlledTest: SliderStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const volumeSlider = canvas.getByTestId("volumeSlider");
        const setValueBtu = canvas.getByText("Set Value by ref");

        await step('"volume" slider default value is 50.', async () => {
            await expect(volumeSlider).toHaveValue("50");

            await expect(
                await canvas.getByText("volume is 50")
            ).toBeInTheDocument();
        });

        await step(
            'Click "volume" Slider, Click "Set Value by ref" button, then "volume is 0".',
            async () => {
                await userEvent.click(volumeSlider);

                await expect(volumeSlider).toHaveValue("0");

                await userEvent.click(setValueBtu);

                await expect(
                    await canvas.getByText("volume is 0")
                ).toBeInTheDocument();
            }
        );
    },
};
