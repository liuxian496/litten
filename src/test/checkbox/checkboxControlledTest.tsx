import React, { useState } from "react";

import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { CheckboxStory } from "../../stories/checkbox.stories";

import { LittenCheckedChangeEvent } from "../../components/control/control.types";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Checkbox } from "../../components/checkbox/checkbox";
import { Button } from "../../components/button/button";
import { StackPanel } from "../../components/stackPanel/stackPanel";
import { Mode } from "../../global/enum";

const Test = () => {
    const [checked, setChecked] = useState<boolean | undefined>(true);

    function handleSwitchChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setChecked(checked);
    }

    function handleChangeBtuClick() {
        setChecked(!checked);
    }

    return (
        <StackPanel direction="column" alignItems="flex-start">
            <FormLabel data-testid="switch" label="switch">
                <Checkbox
                    onChange={handleSwitchChange}
                    checked={checked}
                    value="switch"
                />
            </FormLabel>
            <Button onClick={handleChangeBtuClick} mode={Mode.primary}>
                Change Checked
            </Button>
            <div>{`Switch is ${checked}`}</div>
        </StackPanel>
    );
};

export const ControlledTest: CheckboxStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step("Switch is false", async () => {
            await userEvent.click(canvas.getByTestId("switch"));

            await expect(
                canvas.getByText("Switch is false")
            ).toBeInTheDocument();
        });
    },
};
