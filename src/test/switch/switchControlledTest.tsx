import React, { useState } from "react";

import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { SwitchStory } from "../../stories/switch.stories";

import { LittenCheckedChangeEvent } from "../../components/control/littenEvent.types";

import { FormLabel } from "../../components/formLabel/formLabel";
import { Switch } from "../../components/switch/switch";
import { Button } from "../../components/button/button";
import { StackPanel } from "../../components/stackPanel/stackPanel";

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
            <FormLabel label="飞行模式">
                <Switch
                    data-testid="fly"
                    onChange={handleSwitchChange}
                    checked={checked}
                    value="fly"
                />
            </FormLabel>
            <Button onClick={handleChangeBtuClick}>Change Checked</Button>
            <div>{`飞行模式  ${checked === true ? "打开" : "关闭"}`}</div>
        </StackPanel>
    );
};

export const ControlledTest: SwitchStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const flySwitch = canvas.getByTestId("fly");
        const changeBtu = canvas.getByText("Change Checked");

        await step(
            'The "checked" initialState is true, then "飞行模式" switch is checked.',
            async () => {
                await expect(flySwitch).toBeChecked();

                await expect(
                    canvas.getByText("飞行模式 打开")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "Change Checked" button,then "飞行模式" switch is unChecked ',
            async () => {
                await userEvent.click(changeBtu);

                await expect(flySwitch).not.toBeChecked();
                await expect(
                    canvas.getByText("飞行模式 关闭")
                ).toBeInTheDocument();
            }
        );
    },
};
