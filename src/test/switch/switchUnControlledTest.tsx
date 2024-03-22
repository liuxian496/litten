import React, { useRef, useState } from "react";

import { userEvent, within, expect } from "@storybook/test";

import { SliderStory } from "../../stories/slider.stories";

import { StackPanel } from "../../components/stackPanel/stackPanel";
import { Button } from "../../components/button/button";
import { Switch } from "../../components/switch/switch";
import { Mode } from "../../global/enum";
import { LittenSwitch } from "../../components/switch/switch.types";

const Test = () => {
    const [fruit, setFruit] = useState(false);
    const ref = useRef<LittenSwitch>(null);

    function handleSetCheckedBtuClick() {
        ref.current && setFruit(ref.current.checked);
    }

    return (
        <>
            <StackPanel style={{ marginLeft: "24px", width: "200px" }}>
                <Switch data-testid="fruitSwitch" ref={ref} value="fruit" />
            </StackPanel>
            <Button mode={Mode.outlined} onClick={handleSetCheckedBtuClick}>
                Set checked by ref
            </Button>
            <p>fruit is {fruit + ""}</p>
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

        const fruitSwitch = canvas.getByTestId("fruitSwitch");
        const setValueBtu = canvas.getByText("Set checked by ref");

        await step('"fruit" switch default checked is false.', async () => {
            await expect(fruitSwitch).not.toBeChecked();

            await expect(
                await canvas.getByText("fruit is false")
            ).toBeInTheDocument();
        });

        await step(
            'Click "fruit" Switch, Click "Set Value by ref" button, then "fruit is true".',
            async () => {
                await userEvent.click(fruitSwitch);

                await expect(fruitSwitch).toBeChecked();

                await userEvent.click(setValueBtu);

                await expect(
                    await canvas.getByText("fruit is true")
                ).toBeInTheDocument();
            }
        );
    },
};
