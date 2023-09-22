import React, { useState } from "react";

import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { CheckboxStory } from "../../stories/checkbox.stories";

import { LittenCheckedChangeEvent } from "../../components/control/control.types";
import { Placement } from "../../global/enum";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Switch } from "../../components/switch/switch";
import { StackPanel } from "../../components/stackPanel/stackPanel";

const Test = () => {
    const [pork, setPork] = useState("锅包肉");
    const [greenBean, setGreenBean] = useState("?");

    function handleChickenChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setPork(checked === true ? "锅包肉" : "?");
    }

    function handleEggChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setGreenBean(checked === true ? "干煸四季豆" : "?");
    }

    return (
        <StackPanel direction="column" alignItems="flex-start">
            <FormLabel label="锅包肉" labelPlacement={Placement.right}>
                <Switch
                    data-testid="pork"
                    onChange={handleChickenChange}
                    defaultChecked={true}
                />
            </FormLabel>
            <FormLabel
                data-testid="greenBean"
                label="干煸四季豆"
                labelPlacement={Placement.right}
            >
                <Switch onChange={handleEggChange} defaultChecked={false} />
            </FormLabel>
            <div>{`Today's lunch is ${pork} and ${greenBean}`}</div>
        </StackPanel>
    );
};

export const CheckedTest: CheckboxStory = {
    parameters: {
        controls: {
            hideNoControlsWarning: true,
        },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const pork = canvas.getByTestId("pork");
        const greenBean = canvas.getByTestId("greenBean");

        await userEvent.hover(pork);
        await userEvent.unhover(pork);

        await step("Today's lunch is 锅包肉 and ?", async () => {
            await expect(
                canvas.getByText("Today's lunch is 锅包肉 and ?")
            ).toBeInTheDocument();
        });

        await step("Today's lunch is 锅包肉 and 干煸四季豆", async () => {
            await userEvent.click(greenBean);
            await userEvent.hover(greenBean);
            await userEvent.unhover(greenBean);

            await expect(
                canvas.getByText("Today's lunch is 锅包肉 and 干煸四季豆")
            ).toBeInTheDocument();
        });

        await step("Today's lunch is ? and ?", async () => {
            await userEvent.click(pork);
            await userEvent.click(greenBean);

            await expect(
                canvas.getByText("Today's lunch is ? and ?")
            ).toBeInTheDocument();
        });
    },
};
