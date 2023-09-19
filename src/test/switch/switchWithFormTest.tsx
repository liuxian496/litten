import React, { useState } from "react";

import { RadioStory } from "../../stories/radio.stories";

import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { FormRef } from "../../components/form/form.types";

import { useForm } from "../../components/form/useForm";
import { Button } from "../../components/button/button";
import { Switch } from "../../components/switch/switch";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Form } from "../../components/form/form";
import { FormControl } from "../../components/form/formControl";

const Test = () => {
    const [formData, setFormData] = useState<any>({});

    const myForm: FormRef = useForm();

    function handleShowFormDataBtuClick() {
        setFormData(myForm.getValues());
    }

    function handleSetFruitBtuClick() {
        myForm.setValueByPath("fruit", false);
    }

    return (
        <>
            <Form formRef={myForm}>
                <FormLabel label="Fruit:">
                    <FormControl valuePath="fruit">
                        <Switch data-testid="fruit" defaultChecked={false} />
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
            <div>{`formData.fruit is ${formData.fruit}`}</div>
        </>
    );
};

export const WithFormTest: RadioStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const fruitSwitch = canvas.getByTestId("fruit");

        const showFormDataBtu = canvas.getByTestId("showFormDataBtu");
        const setFormDataBtu = canvas.getByTestId("setFormDataBtu");

        await step(
            '"Fruit" switch defaultChecked is false, Click "Show Form Data" button. Then fruit is false',
            async () => {
                await expect(fruitSwitch).not.toBeChecked();

                await expect(
                    await canvas.findByText("formData.fruit is undefined")
                ).toBeInTheDocument();

                await userEvent.click(showFormDataBtu);

                await expect(
                    await canvas.findByText("formData.fruit is false")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "Fruit" switch, Click "Show Form Data" button. Then fruit is true',
            async () => {
                await userEvent.click(fruitSwitch);

                await expect(fruitSwitch).toBeChecked();

                await userEvent.click(showFormDataBtu);

                await expect(
                    await canvas.findByText("formData.fruit is true")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "Set Fruit False" button, Click "Show Form Data" button. Then fruit is false',
            async () => {
                await userEvent.click(setFormDataBtu);

                await userEvent.click(showFormDataBtu);

                await expect(fruitSwitch).not.toBeChecked();

                await expect(
                    await canvas.findByText("formData.fruit is false")
                ).toBeInTheDocument();
            }
        );
    },
};
