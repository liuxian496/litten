import React, { useState } from "react";

import { within, userEvent, expect } from "@storybook/test";

import { CheckboxStory } from "../../stories/checkbox.stories";

import { Placement } from "litten-hooks/dist/enum";
import { LittenCheckedChangeEvent } from "litten-hooks/dist/control/event/littenEvent.types";

import { FormLabel } from "../../components/formLabel/formLabel";
import { Checkbox } from "../../components/checkbox/checkbox";
import { StackPanel } from "../../components/stackPanel/stackPanel";

const Test = () => {
    const [chicken, setChicken] = useState("红烧鸡翅");
    const [egg, setEgg] = useState("?");

    function handleChickenChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setChicken(checked === true ? "红烧鸡翅" : "?");
    }

    function handleEggChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setEgg(checked === true ? "酱鸡蛋" : "?");
    }

    return (
        <StackPanel direction="column" alignItems="flex-start">
            <FormLabel label="红烧鸡翅" labelPlacement={Placement.right}>
                <Checkbox
                    data-testid="chicken"
                    onChange={handleChickenChange}
                    defaultChecked={true}
                />
            </FormLabel>
            <FormLabel
                data-testid="egg"
                label="酱鸡蛋"
                labelPlacement={Placement.right}
            >
                <Checkbox onChange={handleEggChange} defaultChecked={false} />
            </FormLabel>
            <div>{`Today's lunch is ${chicken} and ${egg}`}</div>
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

        await step("Today's lunch is 红烧鸡翅 and ?", async () => {
            await expect(
                canvas.getByText("Today's lunch is 红烧鸡翅 and ?")
            ).toBeInTheDocument();
        });

        await step("Today's lunch is 红烧鸡翅 and 酱鸡蛋", async () => {
            await userEvent.click(canvas.getByTestId("egg"));

            await expect(
                canvas.getByText("Today's lunch is 红烧鸡翅 and 酱鸡蛋")
            ).toBeInTheDocument();
        });

        await step("Today's lunch is ? and ?", async () => {
            await userEvent.click(canvas.getByTestId("chicken"));
            await userEvent.click(canvas.getByTestId("egg"));

            await expect(
                canvas.getByText("Today's lunch is ? and ?")
            ).toBeInTheDocument();
        });
    },
};
