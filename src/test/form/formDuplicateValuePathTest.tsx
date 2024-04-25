import React from "react";

import { within, expect } from "@storybook/test";

import { FormStory } from "../../stories/form.stories";

import { useForm } from "../../components/form/useForm";
import { Form } from "../../components/form/form";
import { FormControl } from "../../components/form/formControl";
import { TextField } from "../../components/textField/textField";

const Test = () => {
    type Data = {
        name: string;
    };

    const myForm = useForm<Data>();

    return (
        <Form formRef={myForm}>
            <div style={{ marginBottom: "10px" }}>
                <FormControl valuePath="name">
                    <TextField />
                </FormControl>
            </div>
            <FormControl valuePath="name">
                <TextField />
            </FormControl>
        </Form>
    );
};

// function myException() {
//     throw new Error(`Please check your code.`);
// }

export const DuplicateValuePathTest: FormStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step("Duplicate valuePath", async () => {
            await expect(
                await canvas.findByText(
                    '[litten error]: The valuePath "name" is used by other FormControl, Please check your form.'
                )
            ).toBeInTheDocument();

            // await expect(() => myException()).toThrow(
            //     "Please check your code."
            // );
        });
    },
};
