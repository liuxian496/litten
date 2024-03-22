import React from "react";

import { userEvent, within, expect } from "@storybook/test";

import { SliderStory } from "../../stories/slider.stories";

import { Color } from "../../global/enum";
import { StackPanel } from "../../components/stackPanel/stackPanel";
import { Slider } from "../../components/slider/slider";

export const ColorTest: SliderStory = {
    render: () => {
        return (
            <div>
                <StackPanel alignItems="stretch" direction="column">
                    <StackPanel style={{ width: 400 }}>
                        <Slider data-testid="default" />
                        <Slider disabled />
                    </StackPanel>
                    <StackPanel style={{ width: 400 }}>
                        <Slider
                            data-testid="success"
                            color={Color.success}
                            defaultValue={66}
                        />
                        <Slider
                            color={Color.success}
                            defaultValue={66}
                            disabled
                        />
                    </StackPanel>
                    <StackPanel style={{ width: 400 }}>
                        <Slider
                            data-testid="warning"
                            color={Color.warning}
                            defaultValue={20}
                        />
                        <Slider
                            color={Color.warning}
                            defaultValue={20}
                            disabled
                        />
                    </StackPanel>
                    <StackPanel style={{ width: 400 }}>
                        <Slider
                            data-testid="danger"
                            color={Color.danger}
                            defaultValue={15}
                        />
                        <Slider
                            color={Color.danger}
                            defaultValue={15}
                            disabled
                        />
                    </StackPanel>
                </StackPanel>
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const defaultSlider = canvas.getByTestId("default");
        const successSlider = canvas.getByTestId("success");
        const warningSlider = canvas.getByTestId("warning");
        const dangerSlider = canvas.getByTestId("danger");

        await step('Click Tab, then "default" slider has focus.', async () => {
            await userEvent.tab();

            await expect(defaultSlider).toHaveFocus();
        });

        await step('Click Tab, then "success" slider has focus.', async () => {
            await userEvent.tab();

            await expect(successSlider).toHaveFocus();
        });

        await step('Click Tab, then "warning" slider has focus.', async () => {
            await userEvent.tab();

            await expect(warningSlider).toHaveFocus();
        });

        await step('Click Tab, then "danger" slider has focus.', async () => {
            await userEvent.tab();

            await expect(dangerSlider).toHaveFocus();
        });
    },
};
