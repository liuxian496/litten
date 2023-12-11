import React, { useState } from "react";

import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { SliderStory } from "../../stories/slider.stories";

import { Placement } from "../../global/enum";
import { LittenCheckedChangeEvent } from "../../components/control/control.types";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Checkbox } from "../../components/checkbox/checkbox";
import { StackPanel } from "../../components/stackPanel/stackPanel";
import { Slider } from "../../components/slider/slider";

const Test = () => {
    const [disabled, setDisabled] = useState<boolean | undefined>(true);
    const [loading, setLoading] = useState<boolean | undefined>(true);

    function handleDisableCheckboxChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setDisabled(checked);
    }

    function handleLoadingCheckboxChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setLoading(checked);
    }

    return (
        <>
            <StackPanel style={{ marginLeft: "20px", width: "200px" }}>
                <Slider
                    data-testid="mySlider"
                    disabled={disabled}
                    loading={loading}
                    defaultValue={66}
                />
            </StackPanel>

            <StackPanel direction="column" alignItems="flex-start">
                <FormLabel label="Disabled" labelPlacement={Placement.right}>
                    <Checkbox
                        data-testid="disabled-checkbox"
                        checked={disabled}
                        onChange={handleDisableCheckboxChange}
                    />
                </FormLabel>
                <FormLabel label="Loading" labelPlacement={Placement.right}>
                    <Checkbox
                        data-testid="loading-checkbox"
                        checked={loading}
                        onChange={handleLoadingCheckboxChange}
                    />
                </FormLabel>
            </StackPanel>
        </>
    );
};

export const DisabledTest: SliderStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const mySlider = canvas.getByTestId("mySlider");
        const DisabledCheckbox = canvas.getByTestId("disabled-checkbox");
        const LoadingCheckbox = canvas.getByTestId("loading-checkbox");

        await step("Slider is disabled.", async () => {
            await waitFor(() => expect(mySlider).toBeDisabled());
        });

        await step(
            'Unchecked "Loading" checkbox, then Slider is also disabled.',
            async () => {
                await userEvent.click(LoadingCheckbox);
                await waitFor(() => expect(mySlider).toBeDisabled());
            }
        );
        await step(
            'Unchecked "Disabled" checkbox, then Slider is enable',
            async () => {
                await userEvent.click(DisabledCheckbox);
                await waitFor(() => expect(mySlider).toBeEnabled());
            }
        );
        await step(
            'Checked "Loading" checkbox, then Slider is disabled',
            async () => {
                await userEvent.click(LoadingCheckbox);
                await waitFor(() => expect(mySlider).toBeDisabled());
            }
        );
    },
};