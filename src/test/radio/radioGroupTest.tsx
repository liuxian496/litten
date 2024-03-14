import React, { useState } from "react";

import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { LittenCheckedChangeEvent } from "../../components/control/littenEvent.types";
import { Button } from "../../components/button/button";
import { Radio } from "../../components/radio/radio";
import { RadioGroup } from "../../components/radioGroup/radioGroup";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Placement } from "../../global/enum";

import { RadioStory } from "../../stories/radio.stories";
import { StackPanel } from "../../components/stackPanel/stackPanel";


const Test = () => {
    const [value, setValue] = useState<string | undefined>();

    const [selectedValue, setSelectedValue] = useState<string | undefined>();

    function handleRadioGroupChange(e: LittenCheckedChangeEvent) {
        setSelectedValue(e.value);
    }

    function handleCheckAppleBtuClick() {
        setValue("apple");
    }

    function handleCheckBananaBtuClick() {
        setValue("banana");
    }

    function handleCheckPeachBtuClick() {
        setValue("peach");
    }

    return (
        <>
            <FormLabel label="Fruit: " labelPlacement={Placement.top}>
                <RadioGroup
                    defaultValue="banana"
                    name="fruit"
                    value={value}
                    onChange={handleRadioGroupChange}
                >
                    <StackPanel direction="column" alignItems="flex-start">
                        <FormLabel
                            label="Apple"
                            labelPlacement={Placement.right}
                        >
                            <Radio
                                data-testid="apple"
                                value="apple"
                                name="fruit"
                            />
                        </FormLabel>
                        <FormLabel
                            label="Banana"
                            labelPlacement={Placement.right}
                        >
                            <Radio
                                data-testid="banana"
                                value="banana"
                                name="fruit"
                            />
                        </FormLabel>
                        <FormLabel
                            label="Peach"
                            labelPlacement={Placement.right}
                        >
                            <Radio
                                data-testid="peach"
                                value="peach"
                                name="fruit"
                            />
                        </FormLabel>
                    </StackPanel>
                </RadioGroup>
            </FormLabel>
            <StackPanel>
                <Button
                    data-testid="appleBtu"
                    onClick={handleCheckAppleBtuClick}
                >
                    Check Apple
                </Button>
                <Button
                    data-testid="bananaBtu"
                    onClick={handleCheckBananaBtuClick}
                >
                    Check Banana
                </Button>
                <Button
                    data-testid="peachBtu"
                    onClick={handleCheckPeachBtuClick}
                >
                    Check Peach
                </Button>
            </StackPanel>
            <div>{`"Fruit" radioGroup value is ${selectedValue}`}</div>
        </>
    );
};

export const RadioGroupTest: RadioStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const appleRadio = canvas.getByTestId("apple");
        const bananaRadio = canvas.getByTestId("banana");
        const peachRadio = canvas.getByTestId("peach");

        const appleBtu = canvas.getByTestId("appleBtu");
        const peachBtu = canvas.getByTestId("peachBtu");

        await step(
            ' Set "Fruit" radioGroup defaultValue is "banana", then "Banana" radio is checked, other radios are unchecked',
            async () => {
                await expect(
                    await canvas.findByText(
                        '"Fruit" radioGroup value is banana'
                    )
                ).toBeInTheDocument();

                await expect(appleRadio).not.toBeChecked();

                await expect(bananaRadio).toBeChecked();

                await expect(peachRadio).not.toBeChecked();
            }
        );

        await step(
            'Click "Check Apple" button", then "Apple" radio is checked, other radios are unchecked',
            async () => {
                userEvent.click(appleBtu);

                await expect(
                    await canvas.findByText('"Fruit" radioGroup value is apple')
                ).toBeInTheDocument();

                await expect(appleRadio).toBeChecked();

                await expect(bananaRadio).not.toBeChecked();

                await expect(peachRadio).not.toBeChecked();
            }
        );

        await step(
            'Click "Check Peach" button", then "Peach" radio is checked, other radios are unchecked',
            async () => {
                userEvent.click(peachBtu);

                await expect(
                    await canvas.findByText('"Fruit" radioGroup value is peach')
                ).toBeInTheDocument();

                await expect(appleRadio).not.toBeChecked();

                await expect(bananaRadio).not.toBeChecked();

                await expect(peachRadio).toBeChecked();
            }
        );

        await step(
            'Click "Apple" radio, then "Fruit" radioGroup value is "apple"',
            async () => {
                userEvent.click(appleRadio);

                await expect(
                    await canvas.findByText('"Fruit" radioGroup value is apple')
                ).toBeInTheDocument();

                await expect(appleRadio).toBeChecked();

                await expect(bananaRadio).not.toBeChecked();

                await expect(peachRadio).not.toBeChecked();
            }
        );
    },
};
