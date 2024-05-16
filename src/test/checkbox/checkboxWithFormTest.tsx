import React, { useState } from "react";

import { Form, FormControl, useForm } from "litten-form";

import { userEvent, within, expect } from "@storybook/test";

import { RadioStory } from "../../stories/radio.stories";

import { Button } from "../../components/button/button";
import { Checkbox } from "../../components/checkbox/checkbox";
import { FormLabel } from "../../components/formLabel/formLabel";

type Data = {
    fruit: boolean;
};

const Test = () => {
    const [msg, setMsg] = useState("");

    const myForm = useForm();

    function handleShowFormDataBtuClick() {
        const { fruit } = myForm.getValues() as Data;
        setMsg(`fruit is: ${fruit}`);
    }

    function handleSetFruitBtuClick() {
        myForm.setValueByPath("fruit", false);
    }

    return (
        <>
            <Form formRef={myForm}>
                <FormLabel label="Fruit:">
                    <FormControl valuePath="fruit">
                        <Checkbox data-testid="fruit" defaultChecked={false} />
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
                Set Fruit False
            </Button>
            <div>{msg}</div>
        </>
    );
};

export const CheckboxWithFormTest: RadioStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const fruitCheckbox = canvas.getByTestId("fruit");

        const showFormDataBtu = canvas.getByTestId("showFormDataBtu");
        const setFormDataBtu = canvas.getByTestId("setFormDataBtu");

        await step(
            '"Fruit" checkbox defaultChecked is false, Click "Show Form Data" button. Then "fruit is: false" to be in the document.',
            async () => {
                await userEvent.click(showFormDataBtu);
                await expect(
                    canvas.getByText("fruit is: false")
                ).toBeInTheDocument();

                await expect(fruitCheckbox).not.toBeChecked();
            }
        );

        await step(
            'Click "Fruit" checkbox, Click "Show Form Data" button. Then "fruit is: true" to be in the document.',
            async () => {
                await userEvent.click(fruitCheckbox);

                await userEvent.click(showFormDataBtu);

                await expect(
                    canvas.getByText("fruit is: true")
                ).toBeInTheDocument();

                await expect(fruitCheckbox).toBeChecked();
            }
        );

        await step(
            'Click "Set Fruit False" button, Click "Show Form Data" button. Then "fruit is: true" to be in the document.',
            async () => {
                await userEvent.click(setFormDataBtu);

                await expect(fruitCheckbox).not.toBeChecked();

                await userEvent.click(showFormDataBtu);

                await expect(
                    canvas.getByText("fruit is: false")
                ).toBeInTheDocument();
            }
        );
    },
};
