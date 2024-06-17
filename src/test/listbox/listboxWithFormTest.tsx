import React, { useState } from "react";

import { Form, FormControl, useForm } from "litten-form";

import { userEvent, within, expect } from "@storybook/test";

import { RadioStory } from "../../stories/radio.stories";

import { Button } from "../../components/button/button";
import { Checkbox } from "../../components/checkbox/checkbox";
import { FormLabel } from "../../components/formLabel/formLabel";
import { Placement } from "litten-hooks/dist/enum";
import { Listbox } from "../../components/listbox/listbox";
import { ListItem } from "../../components/listItem/listItem";

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
        myForm.setValueByPath("fruit", "apple");
    }

    return (
        <>
            <Form formRef={myForm}>
                <FormLabel label="水果:" labelPlacement={Placement.top}>
                    <FormControl valuePath="fruit">
                        <Listbox data-testid="fruit" defaultValue="pitahaya">
                            <ListItem value="apple" label="苹果" />
                            <ListItem
                                data-testid="banana"
                                value="banana"
                                label="香蕉"
                            />
                            <ListItem value="pitahaya" label="火龙果" />
                            <ListItem
                                data-testid="mangosteen"
                                value="mangosteen"
                                label="山竹"
                            />
                        </Listbox>
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
            <div>{msg}</div>
        </>
    );
};

export const ListboxWithFormTest: RadioStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const fruitListbox = canvas.getByTestId("fruit");
        const bananaListItem = canvas.getByTestId("banana");

        const showFormDataBtu = canvas.getByTestId("showFormDataBtu");
        const setFormDataBtu = canvas.getByTestId("setFormDataBtu");

        await step(
            '"Fruit" Listbox defaultValue is pitahaya, Click "Show Form Data" button. Then "fruit is: pitahaya" to be in the document.',
            async () => {
                await userEvent.click(showFormDataBtu);

                await expect(
                    canvas.getByText("fruit is: pitahaya")
                ).toBeInTheDocument();

                await expect(fruitListbox).not.toBeChecked();
            }
        );

        await step(
            'Click "香蕉" ListItem, Click "Show Form Data" button. Then "fruit is: banana" to be in the document.',
            async () => {
                await userEvent.click(bananaListItem);

                await userEvent.click(showFormDataBtu);

                await expect(
                    canvas.getByText("fruit is: banana")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "Set Fruit Apple" button, Click "Show Form Data" button. Then "fruit is: apple" to be in the document.',
            async () => {
                await userEvent.click(setFormDataBtu);

                await expect(fruitListbox).not.toBeChecked();

                await userEvent.click(showFormDataBtu);

                await expect(
                    canvas.getByText("fruit is: apple")
                ).toBeInTheDocument();
            }
        );
    },
};
