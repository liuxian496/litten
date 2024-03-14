import React from "react";

import { within, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { CheckboxStory } from "../../stories/checkbox.stories";

import { Placement } from "../../global/enum";
import { LittenCheckedChangeEvent } from "../../components/control/littenEvent.types";

import { FormLabel } from "../../components/formLabel/formLabel";
import { Checkbox } from "../../components/checkbox/checkbox";
import { StackPanel } from "../../components/stackPanel/stackPanel";

const Test = () => {
    const [checks, setChecked] = React.useState<
        [boolean | undefined, boolean | undefined]
    >([true, false]);

    function handleAllChange(event: LittenCheckedChangeEvent) {
        const { e } = event;
        // 只有用户点击时，才重新设置Apple和Banana
        if (e) {
            setChecked([e.target.checked, e.target.checked]);
        }
    }

    function handleAppleChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setChecked([checked, checks[1]]);
    }

    function handleBananaChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setChecked([checks[0], checked]);
    }

    return (
        <>
            <FormLabel label="All Fruit" labelPlacement={Placement.right}>
                <Checkbox
                    data-testid="all"
                    checked={checks[0] && checks[1]}
                    indeterminate={checks[0] !== checks[1]}
                    value="all"
                    onChange={handleAllChange}
                />
            </FormLabel>

            <StackPanel
                style={{ marginLeft: "10px" }}
                direction="column"
                alignItems="flex-start"
            >
                <FormLabel label="Apple" labelPlacement={Placement.right}>
                    <Checkbox
                        data-testid="apple"
                        checked={checks[0]}
                        value="apple"
                        onChange={handleAppleChange}
                    />
                </FormLabel>
                <FormLabel label="Banana" labelPlacement={Placement.right}>
                    <Checkbox
                        data-testid="banana"
                        checked={checks[1]}
                        value="banana"
                        onChange={handleBananaChange}
                    />
                </FormLabel>
            </StackPanel>
        </>
    );
};

export const IndeterminateTest: CheckboxStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const allCheckbox = canvas.getByTestId("all");
        const bananaCheckbox = canvas.getByTestId("banana");
        const appleCheckbox = canvas.getByTestId("apple");

        await step("All Fruit is indeterminate", async () => {
            await expect(appleCheckbox).toBeChecked();
            await expect(bananaCheckbox).not.toBeChecked();
            await expect(allCheckbox).not.toBeChecked();
        });

        await step("Checked Banana then All Fruit is Checked", async () => {
            await userEvent.click(canvas.getByTestId("banana"));

            await expect(bananaCheckbox).toBeChecked();

            await expect(appleCheckbox).toBeChecked();

            await expect(allCheckbox).toBeChecked();
        });

        await step(
            "Unchecked Apple, then All Fruit is indeterminate",
            async () => {
                await userEvent.click(appleCheckbox);

                await expect(appleCheckbox).not.toBeChecked();

                await expect(bananaCheckbox).toBeChecked();

                await expect(allCheckbox).not.toBeChecked();
            }
        );

        await step(
            "Checked All Fruit, then Apple and Banana is checked",
            async () => {
                await userEvent.click(appleCheckbox);

                await expect(appleCheckbox).toBeChecked();

                await expect(bananaCheckbox).toBeChecked();

                await expect(allCheckbox).toBeChecked();
            }
        );

        await step(
            "Unchecked All Fruit, then Apple and Banana is unchecked",
            async () => {
                await userEvent.click(allCheckbox);

                await expect(allCheckbox).not.toBeChecked();

                await expect(appleCheckbox).not.toBeChecked();

                await expect(bananaCheckbox).not.toBeChecked();
            }
        );
    },
};
