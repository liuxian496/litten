import React, { useState } from "react";

import { Form, FormControl, useForm } from "litten-form";

import { fireEvent, userEvent, within, expect } from "@storybook/test";

import { SliderStory } from "../../stories/slider.stories";

import { Mode } from "../../global/enum";

import { Button } from "../../components/button/button";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Slider } from "../../components/slider/slider";
import { StackPanel } from "../../components/stackPanel/stackPanel";

const Test = () => {
    const [volume, setVolume] = useState(50);
    const myForm = useForm();

    function handleShowValueBtuClick() {
        setVolume(myForm.getValueByPath("volume") as number);
    }

    function handleFormClear() {
        myForm.clear();
    }

    function handleFormSetClick() {
        myForm.setValueByPath("volume", 80);
    }

    return (
        <>
            <Form formRef={myForm}>
                <FormLabel label="Volume: ">
                    <StackPanel style={{ width: 200, marginLeft: 20 }}>
                        <FormControl valuePath="volume">
                            <Slider data-testid="volumeSlider" />
                        </FormControl>
                    </StackPanel>
                </FormLabel>
            </Form>
            <Button mode={Mode.outlined} onClick={handleShowValueBtuClick}>
                Get form value
            </Button>
            <Button
                mode={Mode.outlined}
                style={{ marginLeft: 12 }}
                onClick={handleFormClear}
            >
                Clear
            </Button>
            <Button
                mode={Mode.outlined}
                style={{ marginLeft: 12 }}
                onClick={handleFormSetClick}
            >
                Set volume to 80 by form
            </Button>
            <p>volume is {volume}</p>
        </>
    );
};

export const WithFormTest: SliderStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const volumeSlider = canvas.getByTestId("volumeSlider");
        const setValueBtu = canvas.getByText("Get form value");
        const clearBtu = canvas.getByText("Clear");
        const formSetBtu = canvas.getByText("Set volume to 80 by form");

        await step('"Volume" slider default value is 50.', async () => {
            await expect(volumeSlider).toHaveValue("50");

            await expect(canvas.getByText("volume is 50")).toBeInTheDocument();
        });

        await step(
            'Change "Volume" Slider value to 66, Then click "Get form value" button, then "volume is 66"',
            async () => {
                await fireEvent.change(volumeSlider, {
                    target: {
                        value: 66,
                    },
                });

                await expect(volumeSlider).toHaveValue("66");

                await userEvent.click(setValueBtu);

                await expect(
                    canvas.getByText("volume is 66")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "clear" Button, then "Volume" slider value change to 50, then click "Get form value" button, then "volume is 50".',
            async () => {
                await userEvent.click(clearBtu);

                await expect(volumeSlider).toHaveValue("50");

                await userEvent.click(setValueBtu);

                await expect(
                    await canvas.getByText("volume is 50")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "Set volume to 80 by form" Button, then "Volume" slider value change to 80 by form, then click "Get form value" button, then "volume is 80".',
            async () => {
                await userEvent.click(formSetBtu);

                await expect(volumeSlider).toHaveValue("80");

                await userEvent.click(setValueBtu);

                await expect(
                    await canvas.getByText("volume is 80")
                ).toBeInTheDocument();
            }
        );
    },
};
