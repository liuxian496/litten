import React, { useState } from "react";

import { RadioStory } from "../../stories/radio.stories";

import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { FormRef } from "../../components/form/form.types";
import { Placement } from "../../global/enum";

import { useForm } from "../../components/form/useForm";
import { Button } from "../../components/button/button";
import { Radio } from "../../components/radio/radio";
import { RadioGroup } from "../../components/radioGroup/radioGroup";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Form } from "../../components/form/form";
import { FormControl } from "../../components/form/formControl";
import { StackPanel } from "../../components/stackPanel/stackPanel";

const Test = () => {
    const [formData, setFormData] = useState<any>({});

    const myForm: FormRef = useForm();

    function handleShowFormDataBtuClick() {
        setFormData(myForm.getValues());
    }

    function handleSetFruitBtuClick() {
        myForm.setValueByPath("fruit", "apple");
    }

    return (
        <>
            <Form formRef={myForm}>
                <FormLabel label="Fruit: " labelPlacement={Placement.top}>
                    <FormControl valuePath="fruit">
                        <RadioGroup defaultValue="banana" name="fruit">
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
                    </FormControl>
                </FormLabel>
            </Form>

            <Button
                data-testid="showFormDataBtu"
                onClick={handleShowFormDataBtuClick}
            >
                Show Form Data
            </Button>
            <Button
                data-testid="setFormDataBtu"
                onClick={handleSetFruitBtuClick}
            >
                Set Fruit Apple
            </Button>
            <div>{`formData.fruit is ${formData.fruit}`}</div>
        </>
    );
};

export const RadioWithFormTest: RadioStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const appleRadio = canvas.getByTestId("apple");
        const bananaRadio = canvas.getByTestId("banana");
        const peachRadio = canvas.getByTestId("peach");

        const showFormDataBtu = canvas.getByTestId("showFormDataBtu");

        await step(
            'Set "Fruit" radioGroup defaultValue is "banana", click "Show Form Data" button, then "Banana" radio is checked, other radios are unchecked, formData.fruit is banana',
            async () => {
                await expect(
                    await canvas.findByText("formData.fruit is undefined")
                ).toBeInTheDocument();

                await userEvent.click(showFormDataBtu);

                await expect(
                    await canvas.findByText("formData.fruit is banana")
                ).toBeInTheDocument();

                await expect(appleRadio).not.toBeChecked();

                await expect(await bananaRadio).toBeChecked();

                await expect(peachRadio).not.toBeChecked();
            }
        );

        await step(
            'Click "Set Fruit Apple" button, click "Show Form Data" button, then "Apple" radio is checked, other radios are unchecked, formData.fruit is apple',
            async () => {
                await userEvent.click(canvas.getByTestId("setFormDataBtu"));
                await userEvent.click(showFormDataBtu);

                await expect(
                    await canvas.findByText("formData.fruit is apple")
                ).toBeInTheDocument();

                await expect(appleRadio).toBeChecked();

                await expect(await bananaRadio).not.toBeChecked();

                await expect(peachRadio).not.toBeChecked();
            }
        );
    },
};
